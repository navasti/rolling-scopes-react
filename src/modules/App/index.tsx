import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchCurrentData, findCurrentData } from 'utils';
import { INPUT_VALUE_KEY } from 'appConstants';
import { useGlobalContext } from 'contexts';
import { useEffect } from 'react';

export const App = () => {
  const { setAllData } = useGlobalContext();
  useEffect(() => {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (inputValue) findCurrentData(inputValue).then((data) => setAllData(data));
    else fetchCurrentData().then((data) => setAllData(data));
  }, [setAllData]);

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
          path=":resourceType/:id"
          element={<Details componentName="Details" location="/details" />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
