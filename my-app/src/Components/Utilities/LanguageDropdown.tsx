import React, { useState, useEffect, useRef } from 'react';
import { useLang } from './LangContext';
import { CSSTransition } from 'react-transition-group';

import languageContent from './LanguageContent';

type LanguageContent = {
    ja: string;
    en: string;
    // ... other language options
  };
  const language: LanguageContent = {
    "ja" : "日本語",
    "en" : "English"
  }

const LanguageDropdown: React.FC = () => {
  
  const { isLang, setIsLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const content = languageContent[isLang as keyof typeof languageContent];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeLanguage = (value:string) => {
    setIsLang(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setText(language[isLang as keyof LanguageContent]);
    
  }, [isLang]);  

  return (
        
        <div className="flex items-center justify-center relative">
          <button
            className="relative bg-white p-4 rounded-md border-2 border-zinc-200"
            onClick={toggleDropdown}
          >
            <span className="absolute left-2 -top-3 bg-[#AFE1B9] font-semibold text-base rounded-md flex items-center justify-center">
              {content.langOutline}
            </span>
            {text}
          </button>
          <div
            ref={dropdownRef}
          className={`absolute language-dropdown top-full border-2 border-zinc-200 rounded-md transition-opacity duration-700 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          >
            <CSSTransition
            nodeRef={dropdownRef}
            in={isOpen}
            timeout={700}
            classNames="fade"
            unmountOnExit
            >
            
              <div className="bg-white flex flex-col divide-y-2 divide-sky-300">
                  <button className="hover:bg-zinc-200 p-4" onClick={() => handleChangeLanguage('ja')}>日本語</button>
                  <button className="hover:bg-zinc-200 p-4" onClick={() => handleChangeLanguage('en')}>English</button>
                  {/* Add more options for other languages */}
              </div>
            
            </CSSTransition>
          </div>
      
        </div>
      
    
  );
};

export default LanguageDropdown;
