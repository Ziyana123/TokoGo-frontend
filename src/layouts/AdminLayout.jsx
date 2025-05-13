import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { guestView } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always show Header for consistency */}
      <Header />
      
      <div className="flex flex-1">
        {/* If not guest view, show Sidebar */}
        {!guestView && <Sidebar />}
        
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Render the nested route inside the Admin layout */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
