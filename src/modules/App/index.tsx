import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { fetchCurrentData, getCurrentDataByParam, handleCatch } from 'utils';
import { Navigate, Route, Routes } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';
import { useGlobalContext } from 'contexts';
import { useEffect } from 'react';

export const App = () => {
  const { setAllData } = useGlobalContext();

  useEffect(() => {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (inputValue)
      getCurrentDataByParam(inputValue)
        .then((data) => setAllData({ ...data, isLoading: false }))
        .catch((error) => handleCatch(error));
    else
      fetchCurrentData()
        .then((data) => setAllData({ ...data, isLoading: false }))
        .catch((error) => handleCatch(error));
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
