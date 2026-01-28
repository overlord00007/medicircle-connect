import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className={isAuthenticated ? 'ml-64 flex-1' : 'flex-1'}>
          <div className="container px-6 py-6">{children}</div>
        </main>
      </div>
      <div className={isAuthenticated ? 'ml-64' : ''}>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
