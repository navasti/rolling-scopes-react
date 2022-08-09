import { screen } from '@testing-library/react';
import { AvailableTabs } from 'appConstants';
import { CheckFields, TextFields } from 'types';

export const testOnChange = (field: TextFields | CheckFields) => console.log(field);

export const expectByText = jest.fn((text: string) => {
  expect(screen.getByText(text)).toBeInTheDocument();
});

export const handleCloseModal = jest.fn();
export const handleCardSelect = jest.fn();
export const handleOpenModal = jest.fn();
export const onTabClick = jest.fn((availableTab: AvailableTabs) => availableTab);
