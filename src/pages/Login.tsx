import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Lock, LogIn, Shield, Stethoscope, Pill, UserCheck } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import medicovaLogo from '@/assets/medicova-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      login(email, password, role);
      navigate(`/${role}`);
    }
  };

  const roleInfo: Record<UserRole, { icon: typeof UserCheck; description: string }> = {
    patient: {
      icon: UserCheck,
      description: 'Report medicine feedback & get AI health guidance',
    },
    doctor: {
      icon: Stethoscope,
      description: 'Review patient cases and provide medical guidance',
    },
    pharmacist: {
      icon: Pill,
      description: 'Answer medicine queries and suggest alternatives',
    },
    admin: {
      icon: Shield,
      description: 'View analytics, manage alerts, and system settings',
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Language Switcher */}
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="medical-card p-8 shadow-xl">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
              <img
                src={medicovaLogo}
                alt="MEDICOVA"
                className="mb-4 h-24 w-auto object-contain"
              />
              <h1 className="text-2xl font-bold text-foreground">{t('welcome')}</h1>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Your intelligent medicine safety companion
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">{t('selectRole')}</Label>
                <Select onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger id="role" className="h-12">
                    <SelectValue placeholder="Choose your role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(['patient', 'doctor', 'pharmacist', 'admin'] as UserRole[]).map((r) => {
                      const Icon = roleInfo[r].icon;
                      return (
                        <SelectItem key={r} value={r}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{t(r)}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {role && (
                  <p className="animate-fade-in text-xs text-muted-foreground">
                    {roleInfo[role].description}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-medical-primary h-12 w-full gap-2 text-base"
                disabled={!role}
              >
                <LogIn className="h-5 w-5" />
                {t('login')}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              This is a demo. Any credentials will work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
