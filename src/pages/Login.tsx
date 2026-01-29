import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import medicovaLogo from '@/assets/medicova-logo.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginTab from '@/components/auth/LoginTab';
import SignupWizard from '@/components/auth/SignupWizard';

const Login = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Language Switcher */}
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="medical-card p-8 shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="mb-6 flex flex-col items-center">
              <img
                src={medicovaLogo}
                alt="MEDICOVA"
                className="mb-4 h-20 w-auto object-contain"
              />
              <p className="text-center text-sm text-muted-foreground font-medium">
                Your Intelligent Pharmacovigilance Platform
              </p>
            </div>

            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginTab />
              </TabsContent>

              <TabsContent value="signup">
                <SignupWizard />
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Medicova © 2025. Secure & Private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
