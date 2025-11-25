import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import React from 'react';
import NoPageFound from './pages/NoPageFound';
import ResultPage from './pages/ResultPage';

export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
    </Router>
  );
}
