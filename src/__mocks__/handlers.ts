import { CheckFields, TextFields } from 'types';

export const testOnChange = (field: TextFields | CheckFields) => console.log(field);

export const handleCloseModal = jest.fn();
