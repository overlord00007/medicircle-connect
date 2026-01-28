import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Pill, Camera, ArrowRight, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicineIdentificationProps {
  onSubmit: (name: string, image: string | null) => void;
}

const commonMedicines = [
  'Paracetamol 500mg',
  'Azithromycin 500mg',
  'Amoxicillin 500mg',
  'Metformin 500mg',
  'Amlodipine 5mg',
  'Pantoprazole 40mg',
  'Cetirizine 10mg',
  'Ibuprofen 400mg',
];

const MedicineIdentification = ({ onSubmit }: MedicineIdentificationProps) => {
  const { t } = useLanguage();
  const [medicineName, setMedicineName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMedicineName(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSubmit = () => {
    if (medicineName.trim() || imagePreview) {
      onSubmit(medicineName.trim() || 'Uploaded Medicine', imagePreview);
    }
  };

  const handleQuickSelect = (medicine: string) => {
    setMedicineName(medicine);
  };

  return (
    <div className="medical-card space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Pill className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t('step1Title')}</h2>
          <p className="text-sm text-muted-foreground">Upload an image or enter the medicine name</p>
        </div>
      </div>

      {/* Image Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50',
          imagePreview ? 'p-3' : 'p-8'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Medicine preview"
              className="mx-auto max-h-48 rounded-lg object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Camera className="h-7 w-7 text-primary" />
            </div>
            <p className="font-medium text-foreground">{t('uploadImage')}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm font-medium text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Text Input with Voice */}
      <div className="space-y-3">
        <Label htmlFor="medicine">{t('enterMedicineName')}</Label>
        <div className="flex gap-2">
          <Input
            id="medicine"
            placeholder="e.g., Paracetamol 500mg"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="h-12 flex-1 text-base"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleVoice}
            className={cn(
              'h-12 w-12 shrink-0',
              isListening && 'mic-pulse bg-destructive text-destructive-foreground'
            )}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Quick Select */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Common medicines:</Label>
        <div className="flex flex-wrap gap-2">
          {commonMedicines.slice(0, 4).map((medicine) => (
            <button
              key={medicine}
              onClick={() => handleQuickSelect(medicine)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs transition-all',
                medicineName === medicine
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50'
              )}
            >
              {medicine}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!medicineName.trim() && !imagePreview}
        className="btn-medical-primary h-12 w-full gap-2 text-base"
      >
        {t('next')}
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MedicineIdentification;
