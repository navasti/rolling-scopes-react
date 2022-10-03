import { fetchAllData, fetchCurrentData, getCurrentDataByParam, handleCatch } from 'utils';
import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';
import { useAppContext } from 'contexts';
import { PayloadTypes } from 'types';
import { useEffect } from 'react';

export const App = () => {
  const { dispatch, setIsLoading } = useAppContext();

  useEffect(() => {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (!!inputValue?.trim()) {
      fetchAllData()
        .then((allData) => getCurrentDataByParam(inputValue, allData))
        .then((data) => {
          if (data?.allDataResults) {
            dispatch({
              type: PayloadTypes.currentParamData,
              payload: {
                currentPageResults: data.currentPageResults,
                allDataResults: data.allDataResults,
                searchResults: data.searchResults,
              },
            });
            setIsLoading(false);
          }
        })
        .catch((error) => handleCatch(error));
    } else {
      fetchAllData()
        .then((allData) => fetchCurrentData(allData))
        .then((data) => {
          if (data?.allDataResults) {
            dispatch({
              type: PayloadTypes.currentData,
              payload: {
                baseData: data.baseData,
                allDataResults: data.allDataResults,
                currentPageResults: data.currentPageResults,
              },
            });
            setIsLoading(false);
          }
        })
        .catch((error) => handleCatch(error));
    }
  }, [dispatch, setIsLoading]);

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
