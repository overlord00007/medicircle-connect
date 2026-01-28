import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HealthAssessment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthQuestionnaireProps {
  onComplete: (data: HealthAssessment) => void;
  onBack: () => void;
}

const commonAllergies = ['Penicillin', 'Sulfa drugs', 'NSAIDs', 'Aspirin', 'Cephalosporins'];
const commonConditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease', 'Liver Disease', 'Asthma'];
const commonMedicines = ['Metformin', 'Amlodipine', 'Atenolol', 'Pantoprazole', 'Aspirin', 'Atorvastatin'];

const HealthQuestionnaire = ({ onComplete, onBack }: HealthQuestionnaireProps) => {
  const { t } = useLanguage();
  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [isPregnant, setIsPregnant] = useState(false);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [currentMedicines, setCurrentMedicines] = useState<string[]>([]);
  const [takenBefore, setTakenBefore] = useState(false);
  const [hadSideEffects, setHadSideEffects] = useState(false);

  const questions = [
    { key: 'age', label: t('whatIsYourAge') },
    { key: 'gender', label: t('whatIsYourGender') },
    ...(gender === 'female' ? [{ key: 'pregnant', label: t('areYouPregnant') }] : []),
    { key: 'allergies', label: t('knownAllergies') },
    { key: 'conditions', label: t('existingConditions') },
    { key: 'medicines', label: t('currentMedicines') },
    { key: 'takenBefore', label: t('takenBefore') },
    { key: 'sideEffects', label: t('anySideEffects') },
  ];

  const currentQuestion = questions[questionIndex];

  const toggleArrayItem = (arr: string[], item: string, setter: (arr: string[]) => void) => {
    if (arr.includes(item)) {
      setter(arr.filter(i => i !== item));
    } else {
      setter([...arr, item]);
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onComplete({
        age,
        gender,
        isPregnant,
        allergies,
        conditions,
        currentMedicines,
        takenBefore,
        hadSideEffects,
      });
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion?.key) {
      case 'age':
        return (
          <div className="space-y-4">
            <Label htmlFor="age" className="text-lg">{currentQuestion.label}</Label>
            <Input
              id="age"
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="h-14 text-center text-2xl font-bold"
            />
            <p className="text-center text-sm text-muted-foreground">
              Enter your age in years
            </p>
          </div>
        );

      case 'gender':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <RadioGroup value={gender} onValueChange={(v) => setGender(v as 'male' | 'female' | 'other')}>
              {[
                { value: 'male', label: t('male') },
                { value: 'female', label: t('female') },
                { value: 'other', label: t('other') },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all',
                    gender === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.value} />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 'pregnant':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <RadioGroup value={isPregnant ? 'yes' : 'no'} onValueChange={(v) => setIsPregnant(v === 'yes')}>
              {[
                { value: 'yes', label: t('yes') },
                { value: 'no', label: t('no') },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all',
                    (isPregnant ? 'yes' : 'no') === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.value} />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 'allergies':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {commonAllergies.map((allergy) => (
                <label
                  key={allergy}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                    allergies.includes(allergy)
                      ? 'border-destructive bg-destructive/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={allergies.includes(allergy)}
                    onCheckedChange={() => toggleArrayItem(allergies, allergy, setAllergies)}
                  />
                  <span className="text-sm">{allergy}</span>
                </label>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Select all that apply, or skip if none
            </p>
          </div>
        );

      case 'conditions':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {commonConditions.map((condition) => (
                <label
                  key={condition}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                    conditions.includes(condition)
                      ? 'border-warning bg-warning/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={conditions.includes(condition)}
                    onCheckedChange={() => toggleArrayItem(conditions, condition, setConditions)}
                  />
                  <span className="text-sm">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'medicines':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {commonMedicines.map((medicine) => (
                <label
                  key={medicine}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                    currentMedicines.includes(medicine)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <Checkbox
                    checked={currentMedicines.includes(medicine)}
                    onCheckedChange={() => toggleArrayItem(currentMedicines, medicine, setCurrentMedicines)}
                  />
                  <span className="text-sm">{medicine}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'takenBefore':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <RadioGroup value={takenBefore ? 'yes' : 'no'} onValueChange={(v) => setTakenBefore(v === 'yes')}>
              {[
                { value: 'yes', label: t('yes') },
                { value: 'no', label: t('no') },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all',
                    (takenBefore ? 'yes' : 'no') === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.value} />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 'sideEffects':
        return (
          <div className="space-y-4">
            <Label className="text-lg">{currentQuestion.label}</Label>
            <RadioGroup value={hadSideEffects ? 'yes' : 'no'} onValueChange={(v) => setHadSideEffects(v === 'yes')}>
              {[
                { value: 'yes', label: t('yes') },
                { value: 'no', label: t('no') },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all',
                    (hadSideEffects ? 'yes' : 'no') === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.value} />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="medical-card space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t('step2Title')}</h2>
          <p className="text-sm text-muted-foreground">
            Question {questionIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              idx === questionIndex
                ? 'w-6 bg-primary'
                : idx < questionIndex
                ? 'bg-primary/50'
                : 'bg-muted'
            )}
          />
        ))}
      </div>

      {/* Question Content */}
      <div className="min-h-[300px] animate-fade-in">
        {renderQuestion()}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          className="h-12 flex-1 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Button>
        <Button
          onClick={handleNext}
          className="btn-medical-primary h-12 flex-1 gap-2"
        >
          {questionIndex === questions.length - 1 ? t('submit') : t('next')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HealthQuestionnaire;
