import { createBrowserRouter } from 'react-router';
import { MobileShell } from './components/MobileShell';
import EntryScreen from './screens/EntryScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import AppLayout from './screens/AppLayout';
import HomeScreen from './screens/HomeScreen';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import AddressSelectionScreen from './screens/AddressSelectionScreen';
import BookingTrackingScreen from './screens/BookingTrackingScreen';
import PaymentInvoiceScreen from './screens/PaymentInvoiceScreen';
import ReviewDisputeScreen from './screens/ReviewDisputeScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MobileShell,
    children: [
      { index: true, Component: EntryScreen },
      { path: 'login', Component: LoginScreen },
      {
        path: 'app',
        Component: AppLayout,
        children: [
          { index: true, Component: HomeScreen },
          { path: 'history', Component: BookingHistoryScreen },
          { path: 'notifications', Component: NotificationsScreen },
          { path: 'profile', Component: ProfileSettingsScreen },
        ],
      },
      { path: 'service', Component: ServiceDetailScreen },
      { path: 'address', Component: AddressSelectionScreen },
      { path: 'tracking', Component: BookingTrackingScreen },
      { path: 'payment', Component: PaymentInvoiceScreen },
      { path: 'review', Component: ReviewDisputeScreen },
      { path: 'help', Component: HelpSupportScreen },
    ],
  },
]);
