import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-[65px]'}`}
        style={{
          filter: isSidebarOpen ? 'blur(8px)' : 'none',
          transition: 'filter 0.3s ease-in-out',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;