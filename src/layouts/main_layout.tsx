// React Core Imports
import React from 'react';
// Local - Component Imports
import Header from '@/components/header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-seaweed-100">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  );
};

export default MainLayout;
