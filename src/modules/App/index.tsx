import { Navigate, Route, Routes } from 'react-router-dom';
import { SearchPage, About, NotFound } from 'modules';
import { Modal } from 'components';
import { Form } from 'modules';
import React from 'react';

export const App = () => {
  return (
    <>
      <Modal>
        <span>Pokemon details</span>
        <span>kontent 2312328374897</span>
      </Modal>
      <Routes>
        <Route path="/" element={<SearchPage componentName="SearchPage" location="/" />} />
        <Route path="/about" element={<About componentName="About" location="/about" />} />
        <Route path="/form" element={<Form componentName="Form" location="/form" />} />
        <Route path="/404" element={<NotFound componentName="NotFound" location="/404" />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};
