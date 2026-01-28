import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Phone, Stethoscope, Pill, X, Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallAssistanceProps {
  isUrgent?: boolean;
}

const CallAssistance = ({ isUrgent }: CallAssistanceProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callType, setCallType] = useState<'doctor' | 'pharmacist' | null>(null);

  const handleCall = (type: 'doctor' | 'pharmacist') => {
    setCallType(type);
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCallType(null);
    setIsConnecting(false);
  };

  return (
    <div className="medical-card">
      <h3 className="mb-4 flex items-center gap-2 font-semibold">
        <Phone className="h-5 w-5 text-primary" />
        Need Help?
      </h3>

      <div className="space-y-3">
        <Button
          onClick={() => {
            setIsOpen(true);
            if (isUrgent) handleCall('doctor');
          }}
          className={cn(
            'w-full gap-2',
            isUrgent
              ? 'bg-destructive hover:bg-destructive/90'
              : 'btn-medical-primary'
          )}
        >
          {isUrgent && <AlertTriangle className="h-4 w-4" />}
          <Stethoscope className="h-4 w-4" />
          {t('callDoctorUrgent')}
        </Button>

        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full gap-2"
        >
          <Pill className="h-4 w-4" />
          {t('callPharmacist')}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Call Assistance
            </DialogTitle>
            <DialogDescription>
              Connect with a healthcare professional for support
            </DialogDescription>
          </DialogHeader>

          {!callType ? (
            <div className="grid gap-4 py-4">
              <Button
                variant="outline"
                className="flex h-auto flex-col items-start gap-2 p-4 text-left"
                onClick={() => handleCall('doctor')}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Call a Doctor</p>
                    <p className="text-sm text-muted-foreground">
                      For urgent medical advice
                    </p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex h-auto flex-col items-start gap-2 p-4 text-left"
                onClick={() => handleCall('pharmacist')}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                    <Pill className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Call a Pharmacist</p>
                    <p className="text-sm text-muted-foreground">
                      For medicine-related questions
                    </p>
                  </div>
                </div>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              {isConnecting ? (
                <>
                  <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                  <p className="text-lg font-medium">Connecting...</p>
                  <p className="text-sm text-muted-foreground">
                    Reaching {callType === 'doctor' ? 'Dr. Sharma' : 'Pharmacist Patel'}
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                    <Phone className="h-8 w-8 text-secondary" />
                  </div>
                  <p className="text-lg font-medium">Connected!</p>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Connecting you to support<br />
                    <span className="font-medium">(Demo only)</span>
                  </p>
                  <Button
                    variant="destructive"
                    className="mt-6 gap-2"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                    End Call
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallAssistance;
