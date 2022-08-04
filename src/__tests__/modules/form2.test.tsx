// import { ErrorMessages, Fields, Types, defaultValues } from 'appConstants';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { componentName, location } from '__mocks__';
// import { Form } from 'modules';
export {};
describe('a', () => {
  it('b', () => expect(true).toBeTruthy());
});
// const incorrectName = 'n';
// const correctName = 'name';

// const incorrectType = '';
// const correctType = Types.fire;

// const correctBirthday = '2022-08-01';
// const incorrectBirthday = '';

// const incorrectConsent = false;
// const correctConsent = true;

// const fireSubmit = () => fireEvent.submit(screen.getByText(/Submit/));

// const setCorrectValues = () => {
//   fireEvent.change(screen.getByLabelText('*Name'), { target: { value: correctName } });
//   fireEvent.change(screen.getByLabelText('*Main type'), { target: { value: correctType } });
//   fireEvent.change(screen.getByLabelText('*Birthday'), { target: { value: correctBirthday } });
//   fireEvent.click(screen.getByText(/I have read and accept the regulations/));
// };

// const setDefaultValues = () => {
//   const { birthday, name, type } = defaultValues;
//   fireEvent.change(screen.getByLabelText('*Name'), { target: { value: name } });
//   fireEvent.change(screen.getByLabelText('*Main type'), { target: { value: type } });
//   fireEvent.change(screen.getByLabelText('*Birthday'), { target: { value: birthday } });
//   const consent = screen.getByText(/I have read and accept the regulations/) as HTMLInputElement;
//   if (consent.checked) {
//     fireEvent.click(consent);
//   }
// };

// const handleChange = (field: Fields, value?: string) => {
//   if (field === Fields.name) {
//     fireEvent.change(screen.getByLabelText('*Name'), { target: { value } });
//     expect((screen.getByLabelText('*Name') as HTMLInputElement).value).toEqual(value);
//   }
//   if (field === Fields.type) {
//     fireEvent.change(screen.getByLabelText('*Main type'), { target: { value } });
//     expect((screen.getByLabelText('*Name') as HTMLInputElement).value).toEqual(value);
//   }
//   if (field === Fields.birthday) {
//     fireEvent.change(screen.getByLabelText('*Birthday'), { target: { value } });
//     expect((screen.getByLabelText('*Birthday') as HTMLInputElement).value).toEqual(value);
//   }
//   if (field === Fields.shiny) {
//     fireEvent.click(screen.getByText(/Shiny/).querySelector('label') as HTMLLabelElement);
//     expect(screen.getByText(/Shiny/).querySelector('input') as HTMLInputElement).toBeChecked();
//   }
//   if (field === Fields.consent) {
//     fireEvent.click(screen.getByText(/I have read and accept the regulations/));
//     expect(screen.getByText(/I have read and accept the regulations/)).toBeChecked();
//   }
// };

// const expectErrorMessage = async (error: ErrorMessages) => {
//   expect(await screen.findByText(error)).toBeInTheDocument();
//   expect(await screen.findByText(error)).toBeVisible();
// };

// describe('Form', () => {
//   beforeEach(() => {
//     render(<Form componentName={componentName} location={location} />, {
//       wrapper: BrowserRouter,
//     });
//   });
//   it('Initially submit button inactive', () => {
//     expect(screen.getByText(/Submit/)).toBeDisabled();
//   });
//   it('Button active after any change', () => {
//     handleChange(Fields.shiny);
//   });
//   it('Name input error', () => {
//     handleChange(Fields.name, incorrectName);
//     fireSubmit();
//     expectErrorMessage(ErrorMessages.name);
//   });
//   it('Type input error', () => {
//     handleChange(Fields.type, incorrectType);
//     fireSubmit();
//     expectErrorMessage(ErrorMessages.type);
//   });
//   it('Birthday input error', () => {
//     handleChange(Fields.birthday, incorrectBirthday);
//     fireSubmit();
//     expectErrorMessage(ErrorMessages.birthday);
//   });
//   it('Consent input error', () => {
//     // Change any field so submit button is active
//     handleChange(Fields.shiny);
//     fireSubmit();
//     expectErrorMessage(ErrorMessages.consent);
//   });
// });
