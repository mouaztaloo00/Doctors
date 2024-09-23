import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en'); 
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const toggleLanguage = async () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';

    try {
     
      await axios.post(`${apiBaseUrl}/api/profile/language`, { language: newLanguage });

      setLanguage(newLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <Button onClick={toggleLanguage}>
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
};

export default LanguageSwitcher;
