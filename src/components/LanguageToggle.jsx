import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const LanguageToggle = () => {
  const { trackEvent } = useAnalytics();
  const [language, setLanguage] = React.useState(
    sessionStorage.getItem('language') || 'ml'
  );

  const handleLanguageChange = () => {
    const newLanguage = language === 'ml' ? 'en' : 'ml';
    sessionStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    
    // Track language change event
    trackEvent('language_change', {
      from_language: language,
      to_language: newLanguage,
      method: 'button_click'
    });

    // Dispatch custom event instead of page reload
    window.dispatchEvent(new Event('languageChange'));
  };

  const LANGUAGE_LABEL = {
    ml: 'മലയാളം',
    en: 'English',
    ar: 'عربي'
  }

  return (
    <button 
      className="language-toggle-btn"
      onClick={handleLanguageChange}
      aria-label="Toggle language"
      style={{
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}
    >
      {LANGUAGE_LABEL[language]}
    </button>
  );
};

export default LanguageToggle;
