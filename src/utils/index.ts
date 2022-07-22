import { DateTime } from 'luxon';
export * from './api';

export const getTodayDate = (): string => {
  const { day, month, year } = DateTime.now();
  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;
  return `${year}-${formatMonth}-${formatDay}`;
};

export const uuid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
