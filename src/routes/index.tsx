import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BrowseEventsPage from '../pages/BrowseEventsPage';
import PerformersPage from '../pages/PerformersPage';
import EventDetails from '../pages/EventDetails';
import SignInPage from '../pages/auth/SignInPage';
import SignUpPage from '../pages/auth/SignUpPage';
import SellTicketsPage from '../pages/SellTicketsPage';
import AboutPage from '../pages/static/AboutPage';
import FAQPage from '../pages/static/FAQPage';
import PrivacyPolicyPage from '../pages/static/PrivacyPolicyPage';
import TermsPage from '../pages/static/TermsPage';
import { 
  ConcertsPage,
  SportsPage,
  TheaterPage,
  ComedyPage,
  FamilyPage 
} from '../pages/categories';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<BrowseEventsPage />} />
      <Route path="/performers" element={<PerformersPage />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/sell" element={<SellTicketsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/concerts" element={<ConcertsPage />} />
      <Route path="/sports" element={<SportsPage />} />
      <Route path="/theater" element={<TheaterPage />} />
      <Route path="/comedy" element={<ComedyPage />} />
      <Route path="/family" element={<FamilyPage />} />
    </Routes>
  );
}