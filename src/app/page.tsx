"use client";

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Controls from '@/components/Controls';
import Fretboard from '@/components/Fretboard';
import ChordCard from '@/components/ChordCard';
import LanguageSelector from '@/components/LanguageSelector';
import { generateScaleData, ScaleType } from '@/utils/musicTheory';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [root, setRoot] = useState<string>('C');
  const [scaleType, setScaleType] = useState<ScaleType>('Major');
  const [mode, setMode] = useState<'chords' | 'notes'>('chords');

  const { t, language } = useLanguage();

  // Memoize expensive calculation
  const scaleData = useMemo(() => generateScaleData(root, scaleType), [root, scaleType]);

  // Memoize callbacks to prevent child re-renders
  const handleRootChange = useCallback((newRoot: string) => setRoot(newRoot), []);
  const handleScaleTypeChange = useCallback((newType: ScaleType) => setScaleType(newType), []);
  const handleModeChange = useCallback((newMode: 'chords' | 'notes') => setMode(newMode), []);

  // Helper to format scale name localized
  const scaleTypeName = scaleType === 'Major' ? t.scaleType.major : t.scaleType.minor;

  return (
    <main className="min-h-screen p-4 md:p-8 relative">
      <LanguageSelector />

      <div className="max-w-7xl mx-auto flex flex-col items-center mt-3 gap-6">

        {/* Header */}
        <div className="text-center mt-8 glass py-3 px-6 rounded-xl ">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">
            {language === 'en' ? (
              <>Guitar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Scale</span> Wizard</>
            ) : (
              <><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Mago</span> de Escalas</>
            )}
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Controls */}
        <Controls
          selectedRoot={root}
          onRootChange={handleRootChange}
          selectedScaleType={scaleType}
          onScaleTypeChange={handleScaleTypeChange}
          mode={mode}
          onModeChange={handleModeChange}
        />

        {/* Dynamic Content */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {mode === 'chords' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                {t.headers.chordsIn} {root} {scaleTypeName}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
                {scaleData.chords.map((chord, index) => (
                  <ChordCard key={index} chord={chord} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center text-slate-800">
                {t.headers.scaleOnFretboard}: {root} {scaleTypeName}
              </h2>
              <Fretboard root={root} scaleType={scaleType} />

              {/* Legend / Info */}
              <div className="flex gap-6 mt-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-secondary ring-2 ring-white/50 shadow-sm"></span>
                  <span>{t.legend.rootNote}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary shadow-sm"></span>
                  <span>{t.legend.scaleNote}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 mb-6 text-center">
        <Link 
          href="/privacy"
          className="text-slate-500 hover:text-primary text-sm font-medium transition-colors"
        >
          {language === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
        </Link>
      </footer>
    </main>
  );
}
