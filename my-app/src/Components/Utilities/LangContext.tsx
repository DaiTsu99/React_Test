import React, { createContext, useContext, useState, useEffect } from 'react';

export const LangContext = createContext<LangContextType | undefined>(undefined);

interface LangContextType {
  isLang: string;
  setIsLang: React.Dispatch<React.SetStateAction<string>>;
}

export const LangProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const storedLang = localStorage.getItem('appLanguage') || 'en'; // Default to 'JP'
  const [isLang, setIsLang] = useState(storedLang);

  useEffect(() => {
    localStorage.setItem('appLanguage', isLang);
  }, [isLang]);

  return (
    <LangContext.Provider value={{ isLang, setIsLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = (): LangContextType => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
