"use client";

import React, { memo, useMemo } from 'react';
import { getFretboardMap, ScaleType } from '@/utils/musicTheory';

interface FretboardProps {
  root: string;
  scaleType: ScaleType;
}

const Fretboard: React.FC<FretboardProps> = memo(({ root, scaleType }) => {
  // Memoize the fretboard data calculation
  const fretboardData = useMemo(() => getFretboardMap(root, scaleType), [root, scaleType]);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px] bg-[#2d2a2e] p-6 rounded-xl shadow-inner relative select-none">
        {/* Fret Markers (Dots) - purely visual decoration for standard frets */}
        <div className="absolute top-1/2 left-[28%] w-4 h-4 rounded-full bg-white/20 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-[41%] w-4 h-4 rounded-full bg-white/20 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-[53%] w-4 h-4 rounded-full bg-white/20 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-[64%] w-4 h-4 rounded-full bg-white/20 -translate-y-1/2"></div>

        {/* Strings */}
        <div className="flex flex-col gap-8 relative z-10">
          {fretboardData.map((stringNotes, stringIndex) => (
            <div key={stringIndex} className="relative h-1">
              {/* String Rendering */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-stone-400 shadow-sm"></div>

              {/* Notes Rendering */}
              <div className="flex justify-between relative -top-[14px]">
                {stringNotes.map((note, fretIndex) => (
                  <div key={fretIndex} className="w-12 flex justify-center items-center relative">
                    {/* Fret Wire (Visual) */}
                    {fretIndex > 0 && (
                      <div className="absolute left-0 top-[2px] h-8 w-1 bg-stone-500 rounded-sm"></div>
                    )}

                    {/* Note Marker */}
                    {note.isInScale && (
                      <div
                        className={`
                            z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all
                            ${note.isRoot
                            ? 'bg-secondary text-white scale-110 ring-2 ring-white/50'
                            : 'bg-primary text-white'
                          }
                        `}
                      >
                        {note.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fret Numbers (Bottom) */}
        <div className="flex justify-between px-4 mt-6 text-stone-500 font-mono text-xs">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="w-12 text-center">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

Fretboard.displayName = 'Fretboard';

export default Fretboard;
