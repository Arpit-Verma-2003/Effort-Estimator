import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import React from 'react';
import NoPageFound from './pages/NoPageFound';

export const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NoPageFound />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
    </Router>
  );
}
