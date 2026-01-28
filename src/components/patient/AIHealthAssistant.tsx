import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Bot, AlertTriangle, RefreshCw, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIHealthAssistantProps {
  medicineName: string;
  medicineImage: string | null;
  response: {
    response: string;
    isUrgent: boolean;
    alerts: string[];
  };
  onReset: () => void;
}

const AIHealthAssistant = ({ medicineName, medicineImage, response, onReset }: AIHealthAssistantProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Urgent Alert */}
      {response.isUrgent && (
        <div className="animate-fade-in rounded-xl border-2 border-destructive bg-destructive/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive">
              <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-destructive">
                🚨 {t('urgentAlert')}
              </h3>
              <p className="mt-2 text-sm text-foreground">
                Based on your health profile, this medicine may pose significant risks.
              </p>
              <Button
                className="mt-4 gap-2 bg-destructive hover:bg-destructive/90"
              >
                <Phone className="h-4 w-4" />
                {t('talkToDoctor')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Response Card */}
      <div className="medical-card">
        <div className="mb-6 flex items-center gap-3">
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            response.isUrgent ? 'bg-destructive/10' : 'bg-secondary/10'
          )}>
            <Bot className={cn(
              'h-6 w-6',
              response.isUrgent ? 'text-destructive' : 'text-secondary'
            )} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t('step3Title')}</h2>
            <p className="text-sm text-muted-foreground">Personalized guidance for {medicineName}</p>
          </div>
        </div>

        {/* Medicine Info */}
        {medicineImage && (
          <div className="mb-4 flex items-center gap-4 rounded-lg bg-muted/50 p-4">
            <img
              src={medicineImage}
              alt={medicineName}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-primary">{medicineName}</p>
              <p className="text-sm text-muted-foreground">Your selected medicine</p>
            </div>
          </div>
        )}

        {/* Response Content */}
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line rounded-lg bg-muted/30 p-4 text-foreground">
            {response.response}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-lg border border-warning/50 bg-warning/5 p-4">
          <p className="text-sm text-warning">
            {t('consultDoctor')}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Check Another Medicine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
