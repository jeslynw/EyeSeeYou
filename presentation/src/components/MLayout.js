import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MSidebar from './MSidebar';

function MLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start with sidebar close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <MSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-[235px]' : 'ml-[65px]'
        }`}
        style={{
          filter: isSidebarOpen ? 'blur(3px)' : 'none',
          transition: 'filter 0.3s ease-in-out, margin-left 0.3s ease-in-out',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default MLayout;