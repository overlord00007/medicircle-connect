import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Common
  welcome: {
    en: 'Welcome to MEDICOVA',
    hi: 'मेडिकोवा में आपका स्वागत है',
    ta: 'MEDICOVA-க்கு வரவேற்கிறோம்',
    te: 'MEDICOVA కు స్వాగతం',
    bn: 'MEDICOVA তে স্বাগতম',
  },
  login: {
    en: 'Login',
    hi: 'लॉगिन',
    ta: 'உள்நுழைக',
    te: 'లాగిన్',
    bn: 'লগইন',
  },
  logout: {
    en: 'Logout',
    hi: 'लॉगआउट',
    ta: 'வெளியேறு',
    te: 'లాగ్అవుట్',
    bn: 'লগআউট',
  },
  selectRole: {
    en: 'Select Role',
    hi: 'भूमिका चुनें',
    ta: 'பங்கைத் தேர்ந்தெடுக்கவும்',
    te: 'పాత్రను ఎంచుకోండి',
    bn: 'ভূমিকা নির্বাচন করুন',
  },
  email: {
    en: 'Email',
    hi: 'ईमेल',
    ta: 'மின்னஞ்சல்',
    te: 'ఇమెయిల్',
    bn: 'ইমেইল',
  },
  password: {
    en: 'Password',
    hi: 'पासवर्ड',
    ta: 'கடவுச்சொல்',
    te: 'పాస్‌వర్డ్',
    bn: 'পাসওয়ার্ড',
  },
  patient: {
    en: 'Patient',
    hi: 'मरीज़',
    ta: 'நோயாளி',
    te: 'రోగి',
    bn: 'রোগী',
  },
  doctor: {
    en: 'Doctor',
    hi: 'डॉक्टर',
    ta: 'மருத்துவர்',
    te: 'డాక్టర్',
    bn: 'ডাক্তার',
  },
  pharmacist: {
    en: 'Pharmacist',
    hi: 'फार्मासिस्ट',
    ta: 'மருந்தாளர்',
    te: 'ఫార్మసిస్ట్',
    bn: 'ফার্মাসিস্ট',
  },
  admin: {
    en: 'Administrator',
    hi: 'प्रशासक',
    ta: 'நிர்வாகி',
    te: 'నిర్వాహకుడు',
    bn: 'প্রশাসক',
  },
  
  // Patient Flow
  step1Title: {
    en: 'Medicine Identification',
    hi: 'दवा की पहचान',
    ta: 'மருந்து அடையாளம்',
    te: 'మందు గుర్తింపు',
    bn: 'ওষুধ সনাক্তকরণ',
  },
  step2Title: {
    en: 'Health Assessment',
    hi: 'स्वास्थ्य मूल्यांकन',
    ta: 'உடல்நல மதிப்பீடு',
    te: 'ఆరోగ్య అంచనా',
    bn: 'স্বাস্থ্য মূল্যায়ন',
  },
  step3Title: {
    en: 'AI Health Assistant',
    hi: 'AI स्वास्थ्य सहायक',
    ta: 'AI உடல்நல உதவியாளர்',
    te: 'AI ఆరోగ్య సహాయకుడు',
    bn: 'AI স্বাস্থ্য সহায়ক',
  },
  uploadImage: {
    en: 'Upload medicine image',
    hi: 'दवा की तस्वीर अपलोड करें',
    ta: 'மருந்து படத்தை பதிவேற்றவும்',
    te: 'మందు చిత్రాన్ని అప్‌లోడ్ చేయండి',
    bn: 'ওষুধের ছবি আপলোড করুন',
  },
  enterMedicineName: {
    en: 'Enter medicine name',
    hi: 'दवा का नाम दर्ज करें',
    ta: 'மருந்து பெயரை உள்ளிடவும்',
    te: 'మందు పేరు నమోదు చేయండి',
    bn: 'ওষুধের নাম লিখুন',
  },
  next: {
    en: 'Next',
    hi: 'आगे',
    ta: 'அடுத்து',
    te: 'తదుపరి',
    bn: 'পরবর্তী',
  },
  back: {
    en: 'Back',
    hi: 'पीछे',
    ta: 'பின்',
    te: 'వెనుక',
    bn: 'পিছনে',
  },
  submit: {
    en: 'Submit',
    hi: 'जमा करें',
    ta: 'சமர்ப்பி',
    te: 'సమర్పించు',
    bn: 'জমা দিন',
  },
  
  // Health Questions
  whatIsYourAge: {
    en: 'What is your age?',
    hi: 'आपकी उम्र क्या है?',
    ta: 'உங்கள் வயது என்ன?',
    te: 'మీ వయస్సు ఎంత?',
    bn: 'আপনার বয়স কত?',
  },
  whatIsYourGender: {
    en: 'What is your gender?',
    hi: 'आपका लिंग क्या है?',
    ta: 'உங்கள் பாலினம் என்ன?',
    te: 'మీ లింగం ఏమిటి?',
    bn: 'আপনার লিঙ্গ কী?',
  },
  male: {
    en: 'Male',
    hi: 'पुरुष',
    ta: 'ஆண்',
    te: 'పురుషుడు',
    bn: 'পুরুষ',
  },
  female: {
    en: 'Female',
    hi: 'महिला',
    ta: 'பெண்',
    te: 'స్త్రీ',
    bn: 'মহিলা',
  },
  other: {
    en: 'Other',
    hi: 'अन्य',
    ta: 'மற்றவை',
    te: 'ఇతర',
    bn: 'অন্যান্য',
  },
  areYouPregnant: {
    en: 'Are you pregnant?',
    hi: 'क्या आप गर्भवती हैं?',
    ta: 'நீங்கள் கர்ப்பமாக இருக்கிறீர்களா?',
    te: 'మీరు గర్భవతా?',
    bn: 'আপনি কি গর্ভবতী?',
  },
  yes: {
    en: 'Yes',
    hi: 'हाँ',
    ta: 'ஆம்',
    te: 'అవును',
    bn: 'হ্যাঁ',
  },
  no: {
    en: 'No',
    hi: 'नहीं',
    ta: 'இல்லை',
    te: 'లేదు',
    bn: 'না',
  },
  knownAllergies: {
    en: 'Do you have any known allergies?',
    hi: 'क्या आपको कोई ज्ञात एलर्जी है?',
    ta: 'உங்களுக்கு ஏதேனும் அலர்ஜி உள்ளதா?',
    te: 'మీకు ఏవైనా అలెర్జీలు ఉన్నాయా?',
    bn: 'আপনার কোনো এলার্জি আছে কি?',
  },
  existingConditions: {
    en: 'Do you have any existing medical conditions?',
    hi: 'क्या आपको कोई मौजूदा चिकित्सा स्थिति है?',
    ta: 'உங்களுக்கு ஏதேனும் மருத்துவ நிலைகள் உள்ளதா?',
    te: 'మీకు ఏవైనా వైద్య పరిస్థితులు ఉన్నాయా?',
    bn: 'আপনার কোনো বিদ্যমান চিকিৎসা অবস্থা আছে?',
  },
  currentMedicines: {
    en: 'Are you taking any other medicines currently?',
    hi: 'क्या आप वर्तमान में कोई अन्य दवाएं ले रहे हैं?',
    ta: 'நீங்கள் தற்போது வேறு மருந்துகள் எடுத்துக்கொள்கிறீர்களா?',
    te: 'మీరు ప్రస్తుతం ఏవైనా ఇతర మందులు తీసుకుంటున్నారా?',
    bn: 'আপনি কি বর্তমানে অন্য কোনো ওষুধ খাচ্ছেন?',
  },
  takenBefore: {
    en: 'Have you taken this medicine before?',
    hi: 'क्या आपने यह दवा पहले ली है?',
    ta: 'இந்த மருந்தை நீங்கள் முன்பு எடுத்திருக்கிறீர்களா?',
    te: 'మీరు ఈ మందును ముందు తీసుకున్నారా?',
    bn: 'আপনি কি এই ওষুধটি আগে খেয়েছেন?',
  },
  anySideEffects: {
    en: 'Did you experience any side effects earlier?',
    hi: 'क्या आपने पहले कोई दुष्प्रभाव अनुभव किया?',
    ta: 'முன்பு ஏதேனும் பக்கவிளைவுகளை அனுபவித்தீர்களா?',
    te: 'మీరు ముందు ఏవైనా దుష్ప్రభావాలను అనుభవించారా?',
    bn: 'আপনি আগে কোনো পার্শ্বপ্রতিক্রিয়া অনুভব করেছেন?',
  },
  
  // Alerts
  urgentAlert: {
    en: 'This case requires immediate medical attention.',
    hi: 'इस मामले में तुरंत चिकित्सा ध्यान देने की आवश्यकता है।',
    ta: 'இந்த வழக்கு உடனடி மருத்துவ கவனிப்பு தேவை.',
    te: 'ఈ కేసుకు తక్షణ వైద్య శ్రద్ధ అవసరం.',
    bn: 'এই ক্ষেত্রে অবিলম্বে চিকিৎসা মনোযোগ প্রয়োজন।',
  },
  talkToDoctor: {
    en: 'Talk to Doctor Now',
    hi: 'अभी डॉक्टर से बात करें',
    ta: 'இப்போது மருத்துவரிடம் பேசுங்கள்',
    te: 'ఇప్పుడు డాక్టర్‌తో మాట్లాడండి',
    bn: 'এখনই ডাক্তারের সাথে কথা বলুন',
  },
  callDoctorUrgent: {
    en: 'Call Doctor (Urgent)',
    hi: 'डॉक्टर को कॉल करें (अत्यावश्यक)',
    ta: 'மருத்துவரை அழைக்கவும் (அவசரம்)',
    te: 'డాక్టర్‌కు కాల్ చేయండి (అత్యవసరం)',
    bn: 'ডাক্তারকে কল করুন (জরুরি)',
  },
  callPharmacist: {
    en: 'Call Pharmacist (General)',
    hi: 'फार्मासिस्ट को कॉल करें (सामान्य)',
    ta: 'மருந்தாளரை அழைக்கவும் (பொது)',
    te: 'ఫార్మసిస్ట్‌కు కాల్ చేయండి (సాధారణ)',
    bn: 'ফার্মাসিস্টকে কল করুন (সাধারণ)',
  },
  consultDoctor: {
    en: '⚠️ Consult a doctor for confirmation.',
    hi: '⚠️ पुष्टि के लिए डॉक्टर से परामर्श करें।',
    ta: '⚠️ உறுதிப்படுத்த மருத்துவரை கலந்தாலோசிக்கவும்.',
    te: '⚠️ నిర్ధారణ కోసం వైద్యుడిని సంప్రదించండి.',
    bn: '⚠️ নিশ্চিতকরণের জন্য ডাক্তারের পরামর্শ নিন।',
  },
  
  // Disclaimer
  disclaimer: {
    en: 'MEDICOVA is a demo prototype and does not provide medical advice.',
    hi: 'मेडिकोवा एक डेमो प्रोटोटाइप है और चिकित्सा सलाह प्रदान नहीं करता है।',
    ta: 'MEDICOVA ஒரு டெமோ முன்மாதிரி, மருத்துவ ஆலோசனை வழங்காது.',
    te: 'MEDICOVA ఒక డెమో ప్రోటోటైప్, వైద్య సలహా అందించదు.',
    bn: 'MEDICOVA একটি ডেমো প্রোটোটাইপ এবং চিকিৎসা পরামর্শ দেয় না।',
  },
};

const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
