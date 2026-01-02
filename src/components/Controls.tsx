import React, { memo } from 'react';
import { NOTES, ScaleType } from '@/utils/musicTheory';
import { Music, Grid3X3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ControlsProps {
  selectedRoot: string;
  onRootChange: (root: string) => void;
  selectedScaleType: ScaleType;
  onScaleTypeChange: (type: ScaleType) => void;
  mode: 'chords' | 'notes';
  onModeChange: (mode: 'chords' | 'notes') => void;
}

const Controls: React.FC<ControlsProps> = memo(({
  selectedRoot,
  onRootChange,
  selectedScaleType,
  onScaleTypeChange,
  mode,
  onModeChange,
}) => {
  const { t } = useLanguage();

  return (
    <div className="glass flex flex-col md:flex-row gap-6 p-6 rounded-2xl items-center justify-between w-full max-w-4xl mx-auto my-8">

      {/* Scale Selection */}
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t.root}</label>
          <select
            value={selectedRoot}
            onChange={(e) => onRootChange(e.target.value)}
            className="glass-input rounded-md px-3 py-2 text-sm font-medium shadow-sm cursor-pointer"
          >
            {NOTES.map(note => (
              <option key={note} value={note} className="bg-white/90 text-foreground">{note}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{t.scale}</label>
          <select
            value={selectedScaleType}
            onChange={(e) => onScaleTypeChange(e.target.value as ScaleType)}
            className="glass-input rounded-md px-3 py-2 text-sm font-medium shadow-sm cursor-pointer"
          >
            <option value="Major" className="bg-white/90 text-foreground">{t.scaleType.major}</option>
            <option value="Minor" className="bg-white/90 text-foreground">{t.scaleType.minor}</option>
          </select>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-black/5 p-1 rounded-lg border border-white/10">
        <button
          onClick={() => onModeChange('chords')}
          className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                glass-btn ${mode === 'chords' ? 'active' : 'opacity-70 hover:opacity-100 border-transparent'}
            `}
        >
          <Grid3X3 size={16} />
          {t.mode.chords}
        </button>
        <button
          onClick={() => onModeChange('notes')}
          className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                glass-btn ${mode === 'notes' ? 'active' : 'opacity-70 hover:opacity-100 border-transparent'}
            `}
        >
          <Music size={16} />
          {t.mode.fretboard}
        </button>
      </div>

    </div>
  );
});

Controls.displayName = 'Controls';

export default Controls;
