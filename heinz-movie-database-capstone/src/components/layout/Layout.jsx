// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';

const Layout = ({ children, sideNavColor = 'yellow', onSearch }) => {
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
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarExpanded ? 'ml-56' : 'ml-16'
        }`}
      >
        {/* Top Navigation */}
        <TopNavigation onSearch={onSearch} />
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;