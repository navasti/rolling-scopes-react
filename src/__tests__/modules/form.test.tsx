import { componentName, customPokemon, location, testOnChange } from '__mocks__';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  BirthdayField,
  ConsentField,
  AvatarField,
  GenderField,
  ShinyField,
  NameField,
  TypeField,
  FormCard,
  Form,
} from 'modules';
import { createRef, RefObject } from 'react';

const errorRef: RefObject<HTMLSpanElement> = createRef();
const inputRef: RefObject<HTMLInputElement> = createRef();
const selectRef: RefObject<HTMLSelectElement> = createRef();
const maleInputRef: RefObject<HTMLInputElement> = createRef();
const femaleInputRef: RefObject<HTMLInputElement> = createRef();

const inputExpectations = (labelText: string, errorText?: string) => {
  const input = screen.getByLabelText(labelText);
  expect(input).toBeInTheDocument();
  if (errorText) {
    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle('display: none;');
  }
};

describe('Form and related componenets', () => {
  it('Form', () => {
    render(<Form componentName={componentName} location={location} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText(/I have read and accept the regulations/)).toBeInTheDocument();
    expect(screen.getByText(/Create custom pokemon!/)).toBeInTheDocument();
    expect(screen.getByText(/Main type/)).toBeInTheDocument();
    expect(screen.getByText(/Birthday/)).toBeInTheDocument();
    const shinyElements = screen.getAllByText(/Shiny/);
    shinyElements.forEach((element) => expect(element).toBeInTheDocument());
    const nameElements = screen.getAllByText(/Name/);
    nameElements.forEach((element) => expect(element).toBeInTheDocument());
    const genderElements = screen.getAllByText(/Gender/);
    genderElements.forEach((element) => expect(element).toBeInTheDocument());
    const avatarElements = screen.getAllByText(/Avatar/);
    avatarElements.forEach((element) => expect(element).toBeInTheDocument());
    const button = screen.getByText(/Submit/);
    expect(button).toHaveStyle('cursor: not-allowed;');
    expect(button).toBeInTheDocument();
  });
  it('FormCard', () => {
    render(<FormCard customPokemon={customPokemon} />);
    expect(screen.getByText(/01-01-1999/)).toBeInTheDocument();
    expect(screen.getByText(/pokemonix/)).toBeInTheDocument();
    expect(screen.getByText(/male/)).toBeInTheDocument();
    expect(screen.getByText(/fire/)).toBeInTheDocument();
  });
  it('BirthdayField', () => {
    render(<BirthdayField refs={{ inputRef, errorRef }} onChange={testOnChange} />);
    inputExpectations('*Birthdate', 'Birthday of the pokemon is required');
  });
  it('NameField', () => {
    render(<NameField refs={{ inputRef, errorRef }} onChange={testOnChange} />);
    inputExpectations('*Name', 'Name must contain at least 2 characters');
  });
  it('ConsentField', () => {
    render(<ConsentField refs={{ inputRef, errorRef }} onChange={testOnChange} />);
    inputExpectations(
      'I have read and accept the regulations',
      'Acceptation of the regulations is required'
    );
  });
  it('AvatarField', () => {
    render(<AvatarField refs={{ inputRef, errorRef }} />);
    inputExpectations('Avatar');
  });
  it('GenderField', () => {
    render(
      <GenderField refs={{ femaleInputRef, maleInputRef, errorRef }} onChange={testOnChange} />
    );
    inputExpectations('Male', 'Gender of the pokemon is required');
    inputExpectations('Female', 'Gender of the pokemon is required');
  });
  it('ShinyField', () => {
    const inputRef: RefObject<HTMLInputElement> = createRef();
    render(<ShinyField inputRef={inputRef} />);
    expect(screen.getByText(/Shiny/)).toBeInTheDocument();
  });
  it('TypeField', () => {
    const errorRef: RefObject<HTMLSpanElement> = createRef();
    render(<TypeField refs={{ selectRef, errorRef }} onChange={testOnChange} />);
    inputExpectations('*Main type', 'Type of the pokemon is required');
  });
});
