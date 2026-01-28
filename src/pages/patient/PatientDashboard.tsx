import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HealthAssessment } from '@/types';
import { getContextualAIResponse } from '@/data/mockData';
import MedicineIdentification from '@/components/patient/MedicineIdentification';
import HealthQuestionnaire from '@/components/patient/HealthQuestionnaire';
import AIHealthAssistant from '@/components/patient/AIHealthAssistant';
import CallAssistance from '@/components/patient/CallAssistance';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Pill, ClipboardList, Bot } from 'lucide-react';

const PatientDashboard = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [medicineName, setMedicineName] = useState('');
  const [medicineImage, setMedicineImage] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [aiResponse, setAiResponse] = useState<{ response: string; isUrgent: boolean; alerts: string[] } | null>(null);

  const steps = [
    { id: 1, label: t('step1Title'), icon: Pill },
    { id: 2, label: t('step2Title'), icon: ClipboardList },
    { id: 3, label: t('step3Title'), icon: Bot },
  ];

  const handleMedicineSubmit = (name: string, image: string | null) => {
    setMedicineName(name);
    setMedicineImage(image);
    setCurrentStep(2);
  };

  const handleAssessmentComplete = (data: HealthAssessment) => {
    setAssessment(data);
    
    // Generate AI response based on assessment
    const response = getContextualAIResponse({
      medicine: medicineName,
      age: data.age,
      gender: data.gender,
      isPregnant: data.isPregnant,
      allergies: data.allergies,
      conditions: data.conditions,
      currentMedicines: data.currentMedicines,
      takenBefore: data.takenBefore,
      hadSideEffects: data.hadSideEffects,
    });
    
    setAiResponse(response);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setMedicineName('');
    setMedicineImage(null);
    setAssessment(null);
    setAiResponse(null);
  };

  const progress = ((currentStep - 1) / 2) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="medical-card">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Medicine Safety Check</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="mt-4 flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 text-sm ${
                currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep > step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <MedicineIdentification onSubmit={handleMedicineSubmit} />
          )}
          
          {currentStep === 2 && (
            <HealthQuestionnaire
              onComplete={handleAssessmentComplete}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && aiResponse && (
            <AIHealthAssistant
              medicineName={medicineName}
              medicineImage={medicineImage}
              response={aiResponse}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Medicine Info */}
          {medicineName && (
            <div className="medical-card">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <Pill className="h-5 w-5 text-primary" />
                Selected Medicine
              </h3>
              {medicineImage && (
                <img
                  src={medicineImage}
                  alt={medicineName}
                  className="mb-3 h-32 w-full rounded-lg object-cover"
                />
              )}
              <p className="font-medium text-primary">{medicineName}</p>
            </div>
          )}

          {/* Call Assistance */}
          <CallAssistance isUrgent={aiResponse?.isUrgent} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
