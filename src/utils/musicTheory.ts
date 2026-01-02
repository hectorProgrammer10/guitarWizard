
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export type Note = typeof NOTES[number];

export type ScaleType = 'Major' | 'Minor';

export const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  Minor: [0, 2, 3, 5, 7, 8, 10], // Natural Minor
};

export interface Chord {
  root: string;
  quality: 'Major' | 'Minor' | 'Diminished';
  notes: string[];
}

export interface ScaleData {
  root: string;
  type: ScaleType;
  notes: string[];
  chords: Chord[];
}

export function getNoteIndex(note: string): number {
  return NOTES.indexOf(note);
}

export function getScaleNotes(root: string, scaleType: ScaleType): string[] {
  const rootIndex = getNoteIndex(root);
  if (rootIndex === -1) return [];

  return SCALE_INTERVALS[scaleType].map((interval) => {
    return NOTES[(rootIndex + interval) % 12];
  });
}

export function getChordQuality(scaleType: ScaleType, degreeIndex: number): 'Major' | 'Minor' | 'Diminished' {
  // Degree Index is 0-based (0 = I, 1 = ii, etc.)
  if (scaleType === 'Major') {
    // Major: I(Maj), ii(min), iii(min), IV(Maj), V(Maj), vi(min), vii(dim)
    const qualities = ['Major', 'Minor', 'Minor', 'Major', 'Major', 'Minor', 'Diminished'] as const;
    return qualities[degreeIndex];
  } else {
    // Minor: i(min), ii(dim), III(Maj), iv(min), v(min), VI(Maj), VII(Maj)
    const qualities = ['Minor', 'Diminished', 'Major', 'Minor', 'Minor', 'Major', 'Major'] as const;
    return qualities[degreeIndex];
  }
}

export interface ChordShape {
  frets: number[]; // 6 numbers. -1 for mute, 0 for open.
  baseFret: number; // The fret number that corresponding to the top of the diagram (usually 1, unless barre)
  fingers?: number[]; // Optional: 0 for no finger, 1-4 for index-pinky
}

// Basic Open Shapes (Relative to standard tuning)
// frets: [E, A, D, G, B, e]
const OPEN_CHORDS: Record<string, Record<string, ChordShape>> = {
  'C': { 'Major': { frets: [-1, 3, 2, 0, 1, 0], baseFret: 1 } },
  'A': {
    'Major': { frets: [-1, 0, 2, 2, 2, 0], baseFret: 1 },
    'Minor': { frets: [-1, 0, 2, 2, 1, 0], baseFret: 1 }
  },
  'G': { 'Major': { frets: [3, 2, 0, 0, 0, 3], baseFret: 1 } },
  'E': {
    'Major': { frets: [0, 2, 2, 1, 0, 0], baseFret: 1 },
    'Minor': { frets: [0, 2, 2, 0, 0, 0], baseFret: 1 }
  },
  'D': {
    'Major': { frets: [-1, -1, 0, 2, 3, 2], baseFret: 1 },
    'Minor': { frets: [-1, -1, 0, 2, 3, 1], baseFret: 1 }
  },
};

// Offsets for Barre Chords (Root on String 6 - E String)
// E=0, F=1, F#=2, G=3...
const ROOT_ON_E_OFFSETS: Record<string, number> = {
  'E': 0, 'F': 1, 'F#': 2, 'G': 3, 'G#': 4, 'A': 5, 'A#': 6, 'B': 7, 'C': 8, 'C#': 9, 'D': 10, 'D#': 11
};

// Offsets for Barre Chords (Root on String 5 - A String)
// A=0, A#=1, B=2, C=3...
const ROOT_ON_A_OFFSETS: Record<string, number> = {
  'A': 0, 'A#': 1, 'B': 2, 'C': 3, 'C#': 4, 'D': 5, 'D#': 6, 'E': 7, 'F': 8, 'F#': 9, 'G': 10, 'G#': 11
};

export function getChordShape(root: string, quality: 'Major' | 'Minor' | 'Diminished'): ChordShape {
  // 1. Try generic Open Chord match first (Exact match)
  if (OPEN_CHORDS[root]?.[quality]) {
    return OPEN_CHORDS[root][quality];
  }

  // 2. Barre Chords Logic

  // Diminished uses a specific shape usually rooted on A or E string, let's use A string root for simplicity
  if (quality === 'Diminished') {
    // x-1-3-4-x-x shape (half-diminished/dim like) or simplified triad x-0-1-x-x (diminished 7th is complex)
    // Let's use a simple triad shape movable on A string: x-Root-b3-b5. 
    // Shape for A dim: x-0-1-2-1-x (Adim7) -> Let's use: x-Root-4-5-4-x relative to root? No.
    // Let's stick to Major/Minor barre chords first.
    // Fallback for diminished: return a placeholder or handle specifically.
    // Using "A Min7b5" shape as proxy or simple triad.

    // Simpler: Map to specific generic shape offset from A string root
    // A dim shape: x(0)-1-2-1(3)-x
    const offset = ROOT_ON_A_OFFSETS[root] || 0;
    return {
      frets: [-1, offset, offset + 1, offset + 2, offset + 1, -1].map(f => f === -1 ? -1 : f), // A dim shape shifted
      baseFret: 1 // We handle offset in frets directly for now, or use baseFret concept
    };
    // Optimization: if offset > 0, we can use baseFret notation to keep numbers low, 
    // but for SVG simplicity, let's use absolute fret numbers first and normalize later? 
    // Actually, SVG usually wants relative frets (1-4).
    // Let's normalize:
    // We will output absolute frets here, and view component can calculate baseFret.
  }

  // Major / Minor Barre Shapes
  if (quality === 'Major') {
    // Prefer E-shape if root is low enough (E..G#), else A-shape?
    // Let's just default to E-shape barre for everything achievable, wrapping around?
    // Roots on E string: E, F, F#, G, G#, A, A#, B
    // Roots on A string: C, C#, D, D# 

    if (['E', 'F', 'F#', 'G', 'G#', 'A', 'A#'].includes(root)) {
      // E Shape Major: 0-2-2-1-0-0
      const offset = ROOT_ON_E_OFFSETS[root];
      return {
        frets: [0, 2, 2, 1, 0, 0].map(f => f + offset),
        baseFret: 1
      };
    } else {
      // A Shape Major: x-0-2-2-2-0 (actually usually x-0-2-2-2-x or x-0-2-2-2-5)
      // Simple A Major: x-0-2-2-2-0
      const offset = ROOT_ON_A_OFFSETS[root] || 0;
      return {
        frets: [-1, 0, 2, 2, 2, 0].map(f => f === -1 ? -1 : f + offset),
        baseFret: 1
      };
    }
  }

  if (quality === 'Minor') {
    // E Shape Minor: 0-2-2-0-0-0
    if (['E', 'F', 'F#', 'G', 'G#', 'A'].includes(root)) {
      const offset = ROOT_ON_E_OFFSETS[root];
      return {
        frets: [0, 2, 2, 0, 0, 0].map(f => f + offset),
        baseFret: 1
      };
    } else {
      // A Shape Minor: x-0-2-2-1-0
      const offset = ROOT_ON_A_OFFSETS[root] || 0;
      return {
        frets: [-1, 0, 2, 2, 1, 0].map(f => f === -1 ? -1 : f + offset),
        baseFret: 1
      };
    }
  }

  return { frets: [-1, -1, -1, -1, -1, -1], baseFret: 1 };
}

export function getChordNotes(root: string, quality: 'Major' | 'Minor' | 'Diminished'): string[] {
  const rootIndex = getNoteIndex(root);
  let intervals: number[] = [];

  switch (quality) {
    case 'Major':
      intervals = [0, 4, 7];
      break;
    case 'Minor':
      intervals = [0, 3, 7];
      break;
    case 'Diminished':
      intervals = [0, 3, 6];
      break;
  }

  return intervals.map((interval) => NOTES[(rootIndex + interval) % 12]);
}

export function getScaleChords(scaleNotes: string[], scaleType: ScaleType): Chord[] {
  return scaleNotes.map((note, index) => {
    const quality = getChordQuality(scaleType, index);
    return {
      root: note,
      quality,
      notes: getChordNotes(note, quality),
    };
  });
}

export function generateScaleData(root: string, type: ScaleType): ScaleData {
  const notes = getScaleNotes(root, type);
  const chords = getScaleChords(notes, type);
  return {
    root,
    type,
    notes,
    chords,
  };
}

// Guitar Fretboard Logic
export const GUITAR_STRINGS = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E

export interface FretboardNote {
  note: string;
  octave?: number; // Optional, can be calculated if needed
  interval: number; // 0-based semitone relative to open string
  isRoot: boolean;
  isInScale: boolean;
  scaleDegree?: number; // 1-based degree (1, 2, 3...)
}

export function getFretboardMap(scaleRoot: string, scaleType: ScaleType, fretCount: number = 13): FretboardNote[][] {
  const scaleNotes = getScaleNotes(scaleRoot, scaleType);

  return GUITAR_STRINGS.map((openStringNote) => {
    const stringNotes: FretboardNote[] = [];
    let currentNoteIndex = getNoteIndex(openStringNote);

    for (let fret = 0; fret <= fretCount; fret++) {
      const noteName = NOTES[currentNoteIndex % 12];
      const isInScale = scaleNotes.includes(noteName);
      const isRoot = noteName === scaleRoot;
      const scaleDegree = isInScale ? scaleNotes.indexOf(noteName) + 1 : undefined;

      stringNotes.push({
        note: noteName,
        interval: fret,
        isRoot,
        isInScale,
        scaleDegree,
      });

      currentNoteIndex++;
    }
    return stringNotes;
  });
}
