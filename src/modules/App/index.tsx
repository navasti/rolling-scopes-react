import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage componentName="SearchPage" location="/" />} />
      <Route path="/about" element={<About componentName="About" location="/about" />} />
      <Route path="/404" element={<NotFound componentName="NotFound" location="/404" />} />
      <Route path="/form" element={<Form componentName="Form" location="/form" />} />
      <Route path="/details">
        <Route path="" element={<Details componentName="Details" location="/details" />} />
        <Route path="*" element={<Details componentName="Details" location="/details" />} />
        <Route
          path=":cardType/:id"
          element={<Details componentName="Details" location="/details" />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
