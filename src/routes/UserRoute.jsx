
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/user/Home';
import SchedulePage from '../pages/user/SchedulePage';
import Cart from '../pages/user/Cart';
import Profile from '../pages/user/Profile';
import SmartPackBuilder from "../pages/user/SmartPackBuilder";
import MyPacks from '../pages/user/MyPacks';
import EditPack from '../pages/user/EditPack';
import Payment from '../pages/user/Payment';
import Checkout from '../pages/user/Checkout';
import OrderConfirmation from '../pages/user/OrderConfirmation';
import MyOrders from '../pages/user/MyOrders';
import ContactPage from '../pages/user/ContactPage';
import AboutPage from '../pages/user/AboutPage';
import MySchedules from "../pages/user/MySchedules";
import SharedRoute from './SharedRoute';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserRoute = () => {
  const { user, guestView } = useAuth();

  if (guestView) {
    return [
      {
        path: "/",
        element: <UserLayout />,
        children: [
          { path: '', element: <Home /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'cart', element: <SharedRoute><Cart /></SharedRoute> }
        ],
      },
    ];
  }

  // if (!user) {
  //   return [
  //     {
  //       path: "/",
  //       element: <Navigate to="/login" replace />,
  //     },
  //   ];
  // }

  return [
    {
      path: '/',
      element: <UserLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'cart', element: <SharedRoute><Cart /></SharedRoute> },
        { path: 'schedule', element: <SharedRoute><SchedulePage /></SharedRoute> },
        
        { path: 'profile', element: <SharedRoute><Profile /></SharedRoute> },
        { path: 'smartpack/build', element: <SharedRoute><SmartPackBuilder /></SharedRoute> },
        { path: 'my-packs', element: <SharedRoute><MyPacks /></SharedRoute> },
        { path: 'payment', element: <SharedRoute><Payment /></SharedRoute> },
        { path: 'smartpack/edit/:id', element: <SharedRoute><EditPack /></SharedRoute> },
        { path: 'checkout', element: <SharedRoute><Checkout /></SharedRoute> },
        { path: 'order-confirmation', element: <SharedRoute><OrderConfirmation /></SharedRoute> },
        { path: 'my-orders', element: <SharedRoute><MyOrders /></SharedRoute> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'my-schedules', element: <SharedRoute><MySchedules /></SharedRoute> },
      ],
    },
  ];
};
export default UserRoute;
