
"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import PreviewPage from './preview/page';

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}
