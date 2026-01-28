import { PatientCase, MedicineQuery, DashboardStats } from '@/types';
import { Language } from '@/context/LanguageContext';

export const mockPatientProfile = {
  age: 34,
  gender: 'male' as const,
  isPregnant: false,
  allergies: ['Penicillin', 'Sulfa drugs'],
  conditions: ['Type 2 Diabetes', 'Hypertension'],
  currentMedicines: ['Metformin 500mg', 'Amlodipine 5mg'],
};

// Indian patient cases with risk levels
export const mockPatientCases: PatientCase[] = [
  {
    id: '1',
    patientName: 'Yuvraj S.',
    medicineName: 'Amoxicillin 500mg',
    allergies: ['Penicillin'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
    status: 'pending',
    query: 'Is this safe with my penicillin allergy?',
    timestamp: new Date(Date.now() - 1800000),
    riskLevel: 'high',
    region: 'Maharashtra',
  },
  {
    id: '2',
    patientName: 'Priya M.',
    medicineName: 'Ibuprofen 400mg',
    allergies: ['NSAIDs'],
    status: 'pending',
    query: 'Experiencing stomach pain after taking this medicine',
    timestamp: new Date(Date.now() - 3600000),
    riskLevel: 'high',
    region: 'Tamil Nadu',
  },
  {
    id: '3',
    patientName: 'Vikas R.',
    medicineName: 'Metformin 500mg',
    allergies: [],
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200',
    status: 'pending',
    query: 'Can I take this with my blood pressure medication?',
    timestamp: new Date(Date.now() - 7200000),
    riskLevel: 'medium',
    region: 'Uttar Pradesh',
  },
  {
    id: '4',
    patientName: 'Raju J.',
    medicineName: 'Omeprazole 20mg',
    allergies: [],
    status: 'reviewed',
    query: 'What are the long-term effects of this medication?',
    timestamp: new Date(Date.now() - 86400000),
    riskLevel: 'low',
    region: 'Karnataka',
  },
  {
    id: '5',
    patientName: 'Anita K.',
    medicineName: 'Ciprofloxacin 500mg',
    allergies: ['Sulfa drugs'],
    status: 'pending',
    query: 'Pregnancy - Is this antibiotic safe?',
    timestamp: new Date(Date.now() - 900000),
    riskLevel: 'high',
    region: 'West Bengal',
    isPregnant: true,
  },
  {
    id: '6',
    patientName: 'Piyush K.',
    medicineName: 'Azithromycin 250mg',
    allergies: [],
    status: 'escalated',
    query: 'Experiencing severe rash and itching',
    timestamp: new Date(Date.now() - 600000),
    riskLevel: 'high',
    region: 'Maharashtra',
  },
];

export const mockMedicineQueries: MedicineQuery[] = [
  {
    id: '1',
    medicineName: 'Metformin 500mg',
    question: 'What is the maximum daily dosage for Type 2 Diabetes?',
    patientInfo: 'Male, 45 years, no kidney issues',
    status: 'open',
    timestamp: new Date(Date.now() - 1800000),
    queryType: 'dosage',
  },
  {
    id: '2',
    medicineName: 'Amlodipine 5mg + Atenolol 50mg',
    question: 'Can these two BP medicines be taken together?',
    patientInfo: 'Female, 52 years, hypertension',
    status: 'open',
    timestamp: new Date(Date.now() - 3600000),
    queryType: 'interaction',
  },
  {
    id: '3',
    medicineName: 'Azithromycin 500mg',
    question: 'Is there a suitable alternative for penicillin-allergic patient?',
    patientInfo: 'Male, 28 years, penicillin allergy',
    status: 'open',
    timestamp: new Date(Date.now() - 7200000),
    queryType: 'alternative',
  },
  {
    id: '4',
    medicineName: 'Pantoprazole 40mg',
    question: 'Best time to take for optimal absorption?',
    patientInfo: 'Female, 38 years, GERD',
    status: 'answered',
    timestamp: new Date(Date.now() - 14400000),
    queryType: 'dosage',
  },
  {
    id: '5',
    medicineName: 'Cetirizine 10mg + Montelukast 10mg',
    question: 'Drug interaction concern for allergy treatment',
    patientInfo: 'Male, 35 years, seasonal allergies',
    status: 'open',
    timestamp: new Date(Date.now() - 5400000),
    queryType: 'interaction',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalPatients: 4523,
  activeQueries: 127,
  totalDoctors: 45,
  totalPharmacists: 32,
  urgentCasesToday: 23,
  highRiskMedicines: 8,
  regionsWithAlerts: 5,
  mostQueriedMedicines: ['Paracetamol', 'Azithromycin', 'Metformin', 'Amoxicillin'],
};

// India-centric medicine statistics
export const medicineStats = [
  { name: 'Paracetamol 500mg', queries: 892, alerts: 12, allergyConflicts: 2 },
  { name: 'Azithromycin 500mg', queries: 654, alerts: 45, allergyConflicts: 18 },
  { name: 'Metformin 500mg', queries: 521, alerts: 8, allergyConflicts: 3 },
  { name: 'Amoxicillin 500mg', queries: 478, alerts: 89, allergyConflicts: 67 },
  { name: 'Pantoprazole 40mg', queries: 412, alerts: 5, allergyConflicts: 1 },
  { name: 'Amlodipine 5mg', queries: 389, alerts: 15, allergyConflicts: 4 },
  { name: 'Cetirizine 10mg', queries: 356, alerts: 3, allergyConflicts: 2 },
  { name: 'Ciprofloxacin 500mg', queries: 298, alerts: 52, allergyConflicts: 23 },
];

// Region-wise statistics (India)
export const regionStats = [
  { name: 'Uttar Pradesh', users: 1245, urgentCases: 34, language: 'hi', hindiUsage: 78, englishUsage: 22 },
  { name: 'Maharashtra', users: 1089, urgentCases: 28, language: 'hi', hindiUsage: 45, englishUsage: 55 },
  { name: 'Tamil Nadu', users: 892, urgentCases: 19, language: 'ta', tamilUsage: 82, englishUsage: 18 },
  { name: 'West Bengal', users: 756, urgentCases: 22, language: 'bn', bengaliUsage: 75, englishUsage: 25 },
  { name: 'Karnataka', users: 645, urgentCases: 15, language: 'en', kannadaUsage: 60, englishUsage: 40 },
  { name: 'Andhra Pradesh', users: 534, urgentCases: 18, language: 'te', teluguUsage: 70, englishUsage: 30 },
];

// Allergy trends
export const allergyTrends = [
  { name: 'Penicillin', cases: 234, percentage: 32 },
  { name: 'Sulfa drugs', cases: 189, percentage: 26 },
  { name: 'NSAIDs', cases: 145, percentage: 20 },
  { name: 'Aspirin', cases: 87, percentage: 12 },
  { name: 'Cephalosporins', cases: 72, percentage: 10 },
];

export const mockRecentActivity = [
  { id: '1', action: 'Urgent case flagged', user: 'Yuvraj S.', time: '2 mins ago', type: 'urgent' },
  { id: '2', action: 'Query answered', user: 'Dr. Sharma', time: '15 mins ago', type: 'normal' },
  { id: '3', action: 'Medicine alert triggered', user: 'Priya M.', time: '32 mins ago', type: 'warning' },
  { id: '4', action: 'Case escalated', user: 'Dr. Patel', time: '1 hour ago', type: 'urgent' },
  { id: '5', action: 'New patient registered', user: 'Anita K.', time: '2 hours ago', type: 'normal' },
];

// High-risk medicine combinations
export const riskyMedicineCombinations = [
  { medicine: 'Amoxicillin', condition: 'Penicillin Allergy', risk: 'Severe allergic reaction' },
  { medicine: 'Ciprofloxacin', condition: 'Pregnancy', risk: 'Birth defects risk' },
  { medicine: 'Ibuprofen', condition: 'NSAID Allergy', risk: 'Anaphylaxis risk' },
  { medicine: 'Metformin', condition: 'Kidney Disease', risk: 'Lactic acidosis' },
  { medicine: 'Warfarin', condition: 'Multiple drugs', risk: 'Bleeding risk' },
];

// AI Response generator based on patient context
interface PatientContext {
  medicine: string;
  age: number;
  gender: string;
  isPregnant: boolean;
  allergies: string[];
  conditions: string[];
  currentMedicines: string[];
  takenBefore: boolean;
  hadSideEffects: boolean;
}

export const getContextualAIResponse = (context: PatientContext, lang: Language = 'en'): { response: string; isUrgent: boolean; alerts: string[] } => {
  const alerts: string[] = [];
  let isUrgent = false;

  // Check for dangerous combinations
  const medicineUpper = context.medicine.toUpperCase();
  
  // Penicillin allergy check
  if (context.allergies.some(a => a.toLowerCase().includes('penicillin')) && 
      (medicineUpper.includes('AMOXICILLIN') || medicineUpper.includes('AMPICILLIN'))) {
    alerts.push('⚠️ DANGER: This medicine belongs to penicillin family. You have reported penicillin allergy.');
    isUrgent = true;
  }

  // NSAID allergy check
  if (context.allergies.some(a => a.toLowerCase().includes('nsaid')) && 
      (medicineUpper.includes('IBUPROFEN') || medicineUpper.includes('DICLOFENAC') || medicineUpper.includes('ASPIRIN'))) {
    alerts.push('⚠️ DANGER: This is an NSAID medication. You have reported NSAID allergy.');
    isUrgent = true;
  }

  // Pregnancy check
  if (context.isPregnant && 
      (medicineUpper.includes('CIPROFLOXACIN') || medicineUpper.includes('TETRACYCLINE') || 
       medicineUpper.includes('IBUPROFEN') || medicineUpper.includes('WARFARIN'))) {
    alerts.push('⚠️ WARNING: This medicine may not be safe during pregnancy.');
    isUrgent = true;
  }

  // Drug interactions
  if (context.currentMedicines.some(m => m.toLowerCase().includes('metformin')) && 
      medicineUpper.includes('ALCOHOL')) {
    alerts.push('⚠️ WARNING: Avoid alcohol while taking Metformin.');
  }

  const responses: Record<Language, string> = {
    en: generateEnglishResponse(context, alerts),
    hi: generateHindiResponse(context, alerts),
    ta: generateTamilResponse(context, alerts),
    te: generateTeluguResponse(context, alerts),
    bn: generateBengaliResponse(context, alerts),
  };

  return {
    response: responses[lang],
    isUrgent,
    alerts,
  };
};

function generateEnglishResponse(context: PatientContext, alerts: string[]): string {
  let response = `**Medicine Analysis: ${context.medicine}**\n\n`;
  
  if (alerts.length > 0) {
    response += `${alerts.join('\n')}\n\n`;
  }

  response += `**Dosage Information:**\n`;
  response += `• Standard adult dose varies by condition\n`;
  response += `• Always follow prescription dosage\n\n`;

  response += `**Timing:**\n`;
  if (context.medicine.toLowerCase().includes('metformin')) {
    response += `• Take with meals to reduce stomach upset\n`;
  } else if (context.medicine.toLowerCase().includes('pantoprazole') || context.medicine.toLowerCase().includes('omeprazole')) {
    response += `• Take 30-60 minutes before meals\n`;
  } else {
    response += `• Check medicine label for food timing\n`;
  }

  response += `\n**Based on your profile:**\n`;
  response += `• Age ${context.age}: ${context.age > 60 ? 'May need dose adjustment' : 'Standard dosing applies'}\n`;
  
  if (context.allergies.length > 0) {
    response += `• Your allergies (${context.allergies.join(', ')}) have been considered\n`;
  }

  if (context.hadSideEffects && context.takenBefore) {
    response += `• Since you experienced side effects before, consult your doctor\n`;
  }

  response += `\n⚠️ **Consult a doctor for confirmation.**`;

  return response;
}

function generateHindiResponse(context: PatientContext, alerts: string[]): string {
  let response = `**दवा विश्लेषण: ${context.medicine}**\n\n`;
  
  if (alerts.length > 0) {
    response += `${alerts.join('\n')}\n\n`;
  }

  response += `**खुराक जानकारी:**\n`;
  response += `• मानक वयस्क खुराक स्थिति के अनुसार भिन्न होती है\n`;
  response += `• हमेशा निर्धारित खुराक का पालन करें\n\n`;

  response += `**समय:**\n`;
  response += `• भोजन के साथ या बिना - लेबल देखें\n`;

  response += `\n**आपकी प्रोफ़ाइल के आधार पर:**\n`;
  response += `• उम्र ${context.age}: ${context.age > 60 ? 'खुराक समायोजन की आवश्यकता हो सकती है' : 'मानक खुराक लागू'}\n`;

  response += `\n⚠️ **पुष्टि के लिए डॉक्टर से परामर्श करें।**`;

  return response;
}

function generateTamilResponse(context: PatientContext, alerts: string[]): string {
  let response = `**மருந்து பகுப்பாய்வு: ${context.medicine}**\n\n`;
  
  if (alerts.length > 0) {
    response += `${alerts.join('\n')}\n\n`;
  }

  response += `**அளவு தகவல்:**\n`;
  response += `• நிலையான வயது வந்தோர் அளவு நிலைமையைப் பொறுத்து மாறுபடும்\n\n`;

  response += `\n⚠️ **உறுதிப்படுத்த மருத்துவரை கலந்தாலோசிக்கவும்.**`;

  return response;
}

function generateTeluguResponse(context: PatientContext, alerts: string[]): string {
  let response = `**మందు విశ్లేషణ: ${context.medicine}**\n\n`;
  
  if (alerts.length > 0) {
    response += `${alerts.join('\n')}\n\n`;
  }

  response += `**మోతాదు సమాచారం:**\n`;
  response += `• ప్రామాణిక పెద్దల మోతాదు పరిస్థితిని బట్టి మారుతుంది\n\n`;

  response += `\n⚠️ **నిర్ధారణ కోసం వైద్యుడిని సంప్రదించండి.**`;

  return response;
}

function generateBengaliResponse(context: PatientContext, alerts: string[]): string {
  let response = `**ওষুধ বিশ্লেষণ: ${context.medicine}**\n\n`;
  
  if (alerts.length > 0) {
    response += `${alerts.join('\n')}\n\n`;
  }

  response += `**ডোজ তথ্য:**\n`;
  response += `• প্রমিত প্রাপ্তবয়স্ক ডোজ অবস্থার উপর নির্ভর করে পরিবর্তিত হয়\n\n`;

  response += `\n⚠️ **নিশ্চিতকরণের জন্য ডাক্তারের পরামর্শ নিন।**`;

  return response;
}

// Legacy function for backward compatibility
export const getAIResponse = (query: string): string => {
  const mockContext: PatientContext = {
    medicine: query,
    age: 34,
    gender: 'male',
    isPregnant: false,
    allergies: [],
    conditions: [],
    currentMedicines: [],
    takenBefore: false,
    hadSideEffects: false,
  };
  
  return getContextualAIResponse(mockContext).response;
};
