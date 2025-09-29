import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    voiceAssistant: 'Voice Assistant',
    imageAnalysis: 'Image Analysis',
    cropAdvisory: 'Crop Advisory',
    weather: 'Weather',
    soilHealth: 'Soil Health',
    governmentSchemes: 'Government Schemes',
    diseaseManagement: 'Disease Management',
    cultivationGuide: 'Cultivation Guide',
    
    // Common
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    
    // Home Page
    welcomeTitle: 'AI-Based Agricultural Advisory System',
    welcomeSubtitle: 'Empowering Farmers in Tamil Nadu & Kerala',
    selectLanguage: 'Select Language',
    getStarted: 'Get Started',
    
    // Features
    voiceSupport: 'Voice Support',
    voiceSupportDesc: 'Ask questions using your voice in your preferred language',
    diseaseDetection: 'Disease Detection',
    diseaseDetectionDesc: 'Upload crop images for AI-powered disease analysis',
    expertAdvice: 'Expert Advice',
    expertAdviceDesc: 'Get personalized cultivation and crop management tips',
  },
  ta: {
    // Navigation - Tamil
    home: 'முகப்பு',
    dashboard: 'டாஷ்போர்டு',
    voiceAssistant: 'குரல் உதவியாளர்',
    imageAnalysis: 'படம் பகுப்பாய்வு',
    cropAdvisory: 'பயிர் ஆலோசனை',
    weather: 'வானிலை',
    soilHealth: 'மண் ஆரோக்கியம்',
    governmentSchemes: 'அரசு திட்டங்கள்',
    diseaseManagement: 'நோய் மேலாண்மை',
    cultivationGuide: 'சாகுபடி வழிகாட்டி',
    
    // Common
    login: 'உள்நுழை',
    register: 'பதிவு செய்',
    logout: 'வெளியேறு',
    submit: 'சமர்ப்பி',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    search: 'தேடு',
    
    // Home Page
    welcomeTitle: 'AI அடிப்படையிலான விவசாய ஆலோசனை அமைப்பு',
    welcomeSubtitle: 'தமிழ்நாடு & கேரள விவசாயிகளுக்கு அதிகாரம்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    getStarted: 'தொடங்குங்கள்',
    
    // Features
    voiceSupport: 'குரல் ஆதரவு',
    voiceSupportDesc: 'உங்கள் விரும்பிய மொழியில் குரல் மூலம் கேள்விகள் கேளுங்கள்',
    diseaseDetection: 'நோய் கண்டறிதல்',
    diseaseDetectionDesc: 'AI சக்தியால் நோய் பகுப்பாய்வுக்காக பயிர் படங்களை பதிவேற்றவும்',
    expertAdvice: 'நிபுணர் ஆலோசனை',
    expertAdviceDesc: 'தனிப்பயனாக்கப்பட்ட சாகுபடி மற்றும் பயிர் மேலாண்மை குறிப்புகளைப் பெறுங்கள்',
  },
  ml: {
    // Navigation - Malayalam
    home: 'ഹോം',
    dashboard: 'ഡാഷ്ബോർഡ്',
    voiceAssistant: 'വോയ്സ് അസിസ്റ്റന്റ്',
    imageAnalysis: 'ഇമേജ് അനാലിസിസ്',
    cropAdvisory: 'ക്രോപ് അഡ്വൈസറി',
    weather: 'കാലാവസ്ഥ',
    soilHealth: 'മണ്ണിന്റെ ആരോഗ്യം',
    governmentSchemes: 'സർക്കാർ പദ്ധതികൾ',
    diseaseManagement: 'രോഗ നിയന്ത്രണം',
    cultivationGuide: 'കൃഷി ഗൈഡ്',
    
    // Common
    login: 'ലോഗിൻ',
    register: 'രജിസ്റ്റർ',
    logout: 'ലോഗൗട്ട്',
    submit: 'സമർപ്പിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    save: 'സേവ് ചെയ്യുക',
    delete: 'ഇല്ലാതാക്കുക',
    edit: 'എഡിറ്റ് ചെയ്യുക',
    search: 'തിരയുക',
    
    // Home Page
    welcomeTitle: 'AI അധിഷ്ഠിത കാർഷിക ഉപദേശക സംവിധാനം',
    welcomeSubtitle: 'തമിഴ്നാട് & കേരള കർഷകരെ ശാക്തീകരിക്കുന്നു',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    getStarted: 'ആരംഭിക്കുക',
    
    // Features
    voiceSupport: 'വോയ്സ് പിന്തുണ',
    voiceSupportDesc: 'നിങ്ങളുടെ ഇഷ്ട ഭാഷയിൽ വോയ്സ് ഉപയോഗിച്ച് ചോദ്യങ്ങൾ ചോദിക്കുക',
    diseaseDetection: 'രോഗ നിർണ്ണയം',
    diseaseDetectionDesc: 'AI പവേർഡ് ഡിസീസ് അനാലിസിസിനായി ക്രോപ് ഇമേജുകൾ അപ്ലോഡ് ചെയ്യുക',
    expertAdvice: 'വിദഗ്ധ ഉപദേശം',
    expertAdviceDesc: 'വ്യക്തിഗതമാക്കിയ കൃഷി, ക്രോപ് മാനേജ്മെന്റ് ടിപ്സുകൾ നേടുക',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};