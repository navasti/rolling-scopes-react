import { DateTime } from 'luxon';
export * from './api';

export const getTodayDate = (): string => {
  const { day, month, year } = DateTime.now();
  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;
  return `${year}-${formatMonth}-${formatDay}`;
};

export const uuid = () => Date.now().toString(36) + Math.random().toString(36);

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const appendComma = (length: number, index: number, label: string) => {
  return `${label}${length === index + 1 ? '' : ', '}`;
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const prepareBaseData = <T>(details?: T | undefined) => {
  const result = details ? [details] : [];
  return {
    currentPageResults: result,
    count: result.length,
    previous: null,
    results: [],
    next: null,
  };
};

export const prepareBaseSortingData = <T>(details?: T | undefined) => {
  const result = details ? [details] : [];
  return {
    currentPageResults: result,
    count: result.length,
    results: [],
  };
};
