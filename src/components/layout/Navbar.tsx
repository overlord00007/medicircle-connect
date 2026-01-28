import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import medicovaLogo from '@/assets/medicova-logo.png';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={medicovaLogo} alt="MEDICOVA" className="h-12 w-auto object-contain" />
          <span className="text-xl font-bold text-primary">MEDICOVA</span>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs capitalize text-muted-foreground">{t(user.role)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">{t('logout')}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
