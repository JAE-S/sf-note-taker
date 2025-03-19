/**
 * MainLayout Component
 *
 * A page layout wrapper that provides consistent structure for the application.
 * Features:
 * - Displays the Header component at the top
 * - Renders children content in a responsive container
 * - Ensures full viewport height with flex column layout
 * - Applies consistent padding and background styling
 */

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
      <main className="container mx-auto h-full flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  );
};

export default MainLayout;
