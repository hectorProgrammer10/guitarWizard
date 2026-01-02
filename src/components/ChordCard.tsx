import React, { memo, useMemo } from 'react';
import { Chord, getChordShape } from '@/utils/musicTheory';
import { useLanguage } from '@/context/LanguageContext';

interface ChordCardProps {
  chord: Chord;
}

const ChordCard: React.FC<ChordCardProps> = memo(({ chord }) => {
  const { t } = useLanguage();

  // Memoize expensive calculations
  const { shape, baseFret } = useMemo(() => {
    const s = getChordShape(chord.root, chord.quality);
    const activeFrets = s.frets.filter(f => f > 0);
    const minFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 1;
    const base = minFret > 2 ? minFret - 1 : 1;
    return { shape: s, baseFret: base };
  }, [chord.root, chord.quality]);

  return (
    <div className="glass flex flex-col items-center p-4 rounded-xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
        {chord.root} <span className="text-muted-foreground text-sm font-medium">{t.qualities[chord.quality]}</span>
      </h3>

      <div className="w-32 h-40 relative my-2 bg-white">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Grid */}
          {/* 6 Vertical Strings */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={`v-${i}`}
              x1={15 + i * 14}
              y1={20}
              x2={15 + i * 14}
              y2={110}
              stroke="#94a3b8"
              strokeWidth={i > 2 ? 0.5 : 1} // Thicker low strings
            />
          ))}

          {/* 5 Horizontal Frets */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={`h-${i}`}
              x1={15}
              y1={20 + i * 18}
              x2={85}
              y2={20 + i * 18}
              stroke={i === 0 && baseFret === 1 ? "#0f172a" : "#94a3b8"} // Nut is thicker
              strokeWidth={i === 0 && baseFret === 1 ? 3 : 1}
            />
          ))}

          {/* Base Fret Number */}
          {baseFret > 1 && (
            <text x="5" y="40" fontSize="10" fontWeight="bold" fill="#000">{baseFret}</text>
          )}

          {/* Dots and Indicators */}
          {shape.frets.map((fret, stringIndex) => {
            const isMute = fret === -1;
            const isOpen = fret === 0;

            // Calculate detailed position relative to baseFret
            // If baseFret is 3, and fret is 3, it should be at visual index 1 (between line 0 and 1)
            // Let's explicitly map visual rows 0..4 (representing spaces between frets)
            const relativeFret = fret - baseFret + 1; // 1-based visual fret

            const x = 15 + stringIndex * 14;

            // Mute/Open High Indicators (above nut)
            if (isMute || (isOpen && baseFret === 1)) {
              return (
                <text
                  key={`top-${stringIndex}`}
                  x={x}
                  y="12"
                  textAnchor="middle"
                  fontSize="10"
                  fill={isMute ? "#ef4444" : "#0f172a"}
                >
                  {isMute ? "x" : "o"}
                </text>
              );
            }

            // If isOpen but we are shifted up (e.g. capo logic, unlikely here but possible), ignore
            if (fret < baseFret) return null;

            // Fret DOTS
            const y = 20 + (relativeFret * 18) - 9; // Center of the fret box

            return (
              <circle
                key={`dot-${stringIndex}`}
                cx={x}
                cy={y}
                r="6"
                fill="#0f172a"
              />
            );
          })}
        </svg>
      </div>

      <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {chord.notes.join(' - ')}
      </div>
    </div>
  );
});

ChordCard.displayName = 'ChordCard';

export default ChordCard;
