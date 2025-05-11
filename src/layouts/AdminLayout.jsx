// // src/layouts/AdminLayout.jsx
// import React from 'react';
// import { Outlet } from "react-router-dom";
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header'; 

// const AdminLayout = ({ children }) => {
//   return (
//       <div className="flex flex-col min-h-screen">
//         {/* <Header /> */}
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 p-6 overflow-y-auto">
//             <Outlet />
//           </main>
//         </div>
//        </div>
//     );
// };

// export default AdminLayout;



// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { guestView } = useAuth();

 
  return (
    <div className="flex flex-col min-h-screen">
      {guestView && <Header />}  {/* Always show Header for consistency */}
      <div className="flex flex-1">
        {!guestView && <Sidebar />}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
