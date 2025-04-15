
"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import PreviewPage from './preview/page';
import NotFound from '@/pages/NotFound';

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
