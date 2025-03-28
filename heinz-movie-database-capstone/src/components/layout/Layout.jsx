// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigation from './SideNavigation';

const Layout = ({ children, sideNavColor = 'yellow' }) => {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  // Don't show navigation on landing page
  const isLandingPage = location.pathname === '/';
  
  if (isLandingPage) {
    return <>{children}</>;
  }
  
  // Handle sidebar expansion state
  const handleSidebarStateChange = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <SideNavigation 
        backgroundColor={sideNavColor} 
        onStateChange={handleSidebarStateChange}
      />
      
      {/* Main Content - margin transitions with sidebar */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarExpanded ? 'ml-56' : 'ml-16'
        }`}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;