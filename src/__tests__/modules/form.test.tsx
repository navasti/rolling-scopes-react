import { ERROR_MESSAGES, FEMALE, FIELDS, MALE } from 'appConstants';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { capitalize } from 'utils';
import {
  componentName,
  customPokemon,
  testOnChange,
  invisible,
  selectRef,
  location,
  inputRef,
  errorRef,
  visible,
} from '__mocks__';
import {
  BirthdayField,
  ErrorMessage,
  ConsentField,
  AvatarField,
  GenderField,
  ShinyField,
  NameField,
  TypeField,
  FormCard,
  Form,
} from 'modules';

const inputExpectations = (labelText: string, visible?: boolean, errorText?: string) => {
  const input = screen.getByLabelText(labelText);
  expect(input).toBeInTheDocument();
  if (errorText) {
    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle(`opacity: ${visible ? '1' : '0'};`);
  }
};

describe('NameField', () => {
  it('With invisible error message', () => {
    render(
      <NameField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={invisible} ref={errorRef} message={ERROR_MESSAGES.NAME} />
      </NameField>
    );
    inputExpectations(`*${capitalize(FIELDS.NAME)}`, invisible, ERROR_MESSAGES.NAME);
  });
  it('With visible error message', () => {
    render(
      <NameField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={visible} ref={errorRef} message={ERROR_MESSAGES.NAME} />
      </NameField>
    );
    inputExpectations(`*${capitalize(FIELDS.NAME)}`, visible, ERROR_MESSAGES.NAME);
  });
});

describe('BirthdayField', () => {
  it('With invisible error message', () => {
    render(
      <BirthdayField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={invisible} ref={errorRef} message={ERROR_MESSAGES.BIRTHDAY} />
      </BirthdayField>
    );
    inputExpectations(`*${capitalize(FIELDS.BIRTHDAY)}`, invisible, ERROR_MESSAGES.BIRTHDAY);
  });
  it('With visible error message', () => {
    render(
      <BirthdayField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={visible} ref={errorRef} message={ERROR_MESSAGES.BIRTHDAY} />
      </BirthdayField>
    );
    inputExpectations(`*${capitalize(FIELDS.BIRTHDAY)}`, visible, ERROR_MESSAGES.BIRTHDAY);
  });
});

describe('ConsentField', () => {
  it('With invisible error message', () => {
    render(
      <ConsentField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={invisible} ref={errorRef} message={ERROR_MESSAGES.CONSENT} />
      </ConsentField>
    );
    inputExpectations('I have read and accept the regulations', invisible, ERROR_MESSAGES.CONSENT);
  });
  it('With visible error message', () => {
    render(
      <ConsentField onChange={testOnChange} ref={inputRef}>
        <ErrorMessage visible={visible} ref={errorRef} message={ERROR_MESSAGES.CONSENT} />
      </ConsentField>
    );
    inputExpectations('I have read and accept the regulations', visible, ERROR_MESSAGES.CONSENT);
  });
});

describe('GenderField', () => {
  it('With invisible error message', () => {
    render(
      <div>
        <GenderField name={MALE} ref={inputRef} onChange={testOnChange} />
        <GenderField name={FEMALE} ref={inputRef} onChange={testOnChange} />
        <ErrorMessage visible={invisible} ref={errorRef} message={ERROR_MESSAGES.GENDER} />
      </div>
    );
    inputExpectations(`${capitalize(FEMALE)}`, invisible, ERROR_MESSAGES.GENDER);
    inputExpectations(`${capitalize(MALE)}`, invisible, ERROR_MESSAGES.GENDER);
  });
  it('With visible error message', () => {
    render(
      <div>
        <GenderField name={MALE} ref={inputRef} onChange={testOnChange} />
        <GenderField name={FEMALE} ref={inputRef} onChange={testOnChange} />
        <ErrorMessage visible={visible} ref={errorRef} message={ERROR_MESSAGES.GENDER} />
      </div>
    );
    inputExpectations(`${capitalize(FEMALE)}`, visible, ERROR_MESSAGES.GENDER);
    inputExpectations(`${capitalize(MALE)}`, visible, ERROR_MESSAGES.GENDER);
  });
});

describe('TypeField', () => {
  it('With invisible error message', () => {
    render(
      <TypeField ref={selectRef} onChange={testOnChange}>
        <ErrorMessage visible={invisible} ref={errorRef} message={ERROR_MESSAGES.TYPE} />
      </TypeField>
    );
    inputExpectations(`*Main ${FIELDS.TYPE}`, invisible, ERROR_MESSAGES.TYPE);
  });
  it('With visible error message', () => {
    render(
      <TypeField ref={selectRef} onChange={testOnChange}>
        <ErrorMessage visible={visible} ref={errorRef} message={ERROR_MESSAGES.TYPE} />
      </TypeField>
    );
    inputExpectations(`*Main ${FIELDS.TYPE}`, visible, ERROR_MESSAGES.TYPE);
  });
});

describe('Form, FormCard, AvatarField and ShinyField', () => {
  it('AvatarField', () => {
    render(<AvatarField ref={inputRef} />);
    inputExpectations('Avatar');
  });
  it('ShinyField', () => {
    render(<ShinyField ref={inputRef} />);
    expect(screen.getByText(/Shiny/)).toBeInTheDocument();
  });
  it('FormCard', () => {
    render(<FormCard customPokemon={customPokemon} />);
    expect(screen.getByText(/01-01-1999/)).toBeInTheDocument();
    expect(screen.getByText(/Pokemonix/)).toBeInTheDocument();
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/Fire/)).toBeInTheDocument();
  });
  it('Form', () => {
    render(<Form componentName={componentName} location={location} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText(/I have read and accept the regulations/)).toBeInTheDocument();
    expect(screen.getByText(/Create custom pokemon!/)).toBeInTheDocument();
    const birthdayElements = screen.getAllByText(/Birthday/);
    birthdayElements.forEach((element) => expect(element).toBeInTheDocument());
    const typeElements = screen.getAllByText(/Main type/);
    typeElements.forEach((element) => expect(element).toBeInTheDocument());
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
});
