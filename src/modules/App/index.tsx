import { setAllDataAsync, setParameterizedDataAsync } from 'features/resources/resourcesSlice';
import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';
import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (!!inputValue?.trim()) {
      dispatch(setParameterizedDataAsync(inputValue));
    } else {
      dispatch(setAllDataAsync());
    }
  }, [dispatch]);

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
