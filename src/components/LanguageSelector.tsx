"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="glass flex p-1 rounded-full">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xs font-bold glass-btn ${language === 'en' ? 'active' : 'opacity-70 hover:opacity-100'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 rounded-full text-xs font-bold glass-btn ${language === 'es' ? 'active' : 'opacity-70 hover:opacity-100'}`}
        >
          ES
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
