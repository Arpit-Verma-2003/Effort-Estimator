import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import React from 'react';
import NoPageFound from './pages/NoPageFound';
import ResultPage from './pages/ResultPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import PricingPage from './pages/PricingPage';

export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route path="/pricing" element={<PricingPage/>} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
    </Router>
  );
}
