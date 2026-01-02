"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type Language = 'en' | 'es';

type Translations = {
  title: string;
  subtitle: string;
  root: string;
  scale: string;
  scaleType: {
    major: string;
    minor: string;
  };
  mode: {
    chords: string;
    fretboard: string;
  };
  headers: {
    chordsIn: string;
    scaleOnFretboard: string;
  };
  legend: {
    rootNote: string;
    scaleNote: string;
  };
  qualities: {
    Major: string;
    Minor: string;
    Diminished: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    title: "Guitar Scale Wizard",
    subtitle: "Visualize scales and chords instantly.",
    root: "Root",
    scale: "Scale",
    scaleType: {
      major: "Major",
      minor: "Minor (Natural)",
    },
    mode: {
      chords: "Chords",
      fretboard: "Fretboard",
    },
    headers: {
      chordsIn: "Chords in",
      scaleOnFretboard: "Scale on Fretboard",
    },
    legend: {
      rootNote: "Root Note",
      scaleNote: "Scale Note",
    },
    qualities: {
      Major: 'Major',
      Minor: 'Minor',
      Diminished: 'Diminished'
    }
  },
  es: {
    title: "Mago de Escalas",
    subtitle: "Visualiza escalas y acordes al instante.",
    root: "Tónica",
    scale: "Escala",
    scaleType: {
      major: "Mayor",
      minor: "Menor (Natural)",
    },
    mode: {
      chords: "Acordes",
      fretboard: "Mástil",
    },
    headers: {
      chordsIn: "Acordes en",
      scaleOnFretboard: "Escala en el Mástil",
    },
    legend: {
      rootNote: "Nota Tónica",
      scaleNote: "Nota de Escala",
    },
    qualities: {
      Major: 'Mayor',
      Minor: 'Menor',
      Diminished: 'Disminuido'
    }
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get initial language
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const savedLang = localStorage.getItem('language') as Language;
  if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
    return savedLang;
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language]
  }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}