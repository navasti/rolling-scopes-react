import { Navigate, Route, Routes } from 'react-router-dom';
import { SearchPage, About, NotFound } from 'modules';
import React from 'react';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage componentName="SearchPage" location="/" />} />
      <Route path="/about" element={<About componentName="About" location="/about" />} />
      <Route path="/404" element={<NotFound componentName="NotFound" location="/404" />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
