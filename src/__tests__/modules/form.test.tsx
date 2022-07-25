import { ERROR_MESSAGES, FEMALE, FIELDS, MALE } from 'appConstants';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { capitalize } from 'utils';
import {
  testEmptyErrors,
  componentName,
  customPokemon,
  testOnChange,
  testErrors,
  invisible,
  location,
  inputRef,
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
  if (!visible && errorText) {
    const error = screen.getByText(errorText);
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle(`opacity: ${visible ? '1' : '0'};`);
  }
};

describe('NameField', () => {
  it('With invisible error message', () => {
    render(<NameField errors={testEmptyErrors} onChange={testOnChange} />);
    inputExpectations(`*${capitalize(FIELDS.name)}`, invisible);
  });
  it('With visible error message', () => {
    render(<NameField errors={testErrors} onChange={testOnChange} />);
    inputExpectations(`*${capitalize(FIELDS.name)}`, visible, ERROR_MESSAGES.name);
  });
});

describe('BirthdayField', () => {
  it('With invisible error message', () => {
    render(<BirthdayField errors={testEmptyErrors} onChange={testOnChange} />);
    inputExpectations(`*${capitalize(FIELDS.birthday)}`, invisible);
  });
  it('With visible error message', () => {
    render(<BirthdayField errors={testErrors} onChange={testOnChange} />);
    inputExpectations(`*${capitalize(FIELDS.birthday)}`, visible, ERROR_MESSAGES.birthday);
  });
});

describe('ConsentField', () => {
  it('With invisible error message', () => {
    render(<ConsentField errors={testEmptyErrors} onChange={testOnChange} />);
    inputExpectations('I have read and accept the regulations', invisible);
  });
  it('With visible error message', () => {
    render(<ConsentField errors={testErrors} onChange={testOnChange} />);
    inputExpectations('I have read and accept the regulations', visible, ERROR_MESSAGES.consent);
  });
});

describe('GenderField', () => {
  it('With invisible error message', () => {
    render(
      <div>
        <GenderField name={MALE} onChange={testOnChange} />;
        <GenderField name={FEMALE} onChange={testOnChange} />
        <ErrorMessage message={testEmptyErrors.gender} visible={invisible} />
      </div>
    );
    inputExpectations(`${capitalize(MALE)}`, invisible);
    inputExpectations(`${capitalize(MALE)}`, invisible);
  });
  it('With visible error message', () => {
    render(
      <div>
        <GenderField name={MALE} onChange={testOnChange} />;
        <GenderField name={FEMALE} onChange={testOnChange} />
        <ErrorMessage message={testErrors.gender} visible={visible} />
      </div>
    );
    inputExpectations(`${capitalize(MALE)}`, visible, ERROR_MESSAGES.gender);
    inputExpectations(`${capitalize(MALE)}`, visible, ERROR_MESSAGES.gender);
  });
});

describe('TypeField', () => {
  it('With invisible error message', () => {
    render(<TypeField errors={testEmptyErrors} onChange={testOnChange} />);
    inputExpectations(`*Main ${FIELDS.type}`, invisible);
  });
  it('With visible error message', () => {
    render(<TypeField errors={testErrors} onChange={testOnChange} />);
    inputExpectations(`*Main ${FIELDS.type}`, visible, ERROR_MESSAGES.type);
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
