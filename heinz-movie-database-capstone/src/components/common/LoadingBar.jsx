import React from 'react';

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-1 w-full bg-gray-200 overflow-hidden">
        <div 
          className="bg-tazama-yellow h-full animate-loadingBar"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;