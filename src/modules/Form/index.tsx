import React, { createRef, FormEvent, RefObject } from 'react';
import { CheckFields, CustomPokemon, ErrorsObject, TextFields } from 'types';
import { Layout } from 'modules';
import * as S from './styled';
import { uuid } from 'utils';
import {
  BirthdayField,
  ErrorMessage,
  ConsentField,
  GenderField,
  AvatarField,
  ShinyField,
  TypeField,
  NameField,
  FormCard,
} from 'modules/Form/components';
import { FIELDS_VALIDATION_BY_NAME, FEMALE, MALE, ErrorMessages } from 'appConstants';

type Props = {
  componentName: string;
  location: string;
};

type State = {
  pokemons: Array<CustomPokemon & { id: string }>;
  initialEnter: boolean;
  errors: ErrorsObject;
};

export class Form extends React.Component<Props, State> {
  femaleInputRef: RefObject<HTMLInputElement>;
  successMessage: RefObject<HTMLSpanElement>;
  birthdayField: RefObject<HTMLInputElement>;
  isShinyField: RefObject<HTMLInputElement>;
  consentField: RefObject<HTMLInputElement>;
  maleInputRef: RefObject<HTMLInputElement>;
  avatarField: RefObject<HTMLInputElement>;
  typeField: RefObject<HTMLSelectElement>;
  nameField: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
      initialEnter: true,
      errors: {
        birthday: null,
        consent: null,
        gender: null,
        name: null,
        type: null,
      },
    };
    this.successMessage = createRef();
    this.femaleInputRef = createRef();
    this.birthdayField = createRef();
    this.consentField = createRef();
    this.isShinyField = createRef();
    this.maleInputRef = createRef();
    this.avatarField = createRef();
    this.typeField = createRef();
    this.nameField = createRef();
  }

  removeError = (field: TextFields | CheckFields) => {
    if (this.state.initialEnter) this.setState({ initialEnter: false });
    const errors = { ...this.state.errors };
    errors[field] = null;
    this.setState({ errors });
  };

  validate = (fields: Array<React.RefObject<HTMLInputElement | HTMLSelectElement>>) => {
    const errors = { ...this.state.errors };
    const textFields = FIELDS_VALIDATION_BY_NAME.TEXT.map((textField) =>
      fields.find((field) => field.current?.name === textField)
    );
    const checkFields = FIELDS_VALIDATION_BY_NAME.CHECK.map((checkField) =>
      fields.filter((field) => field.current?.name === checkField)
    );
    checkFields.forEach((checkField) => {
      const valid = checkField.some((field) => (field.current as HTMLInputElement)?.checked);
      const name = checkField[0]?.current?.name
        ? (checkField[0].current.name as CheckFields)
        : null;
      if (!valid && name) errors[name] = ErrorMessages[name];
    });
    textFields.forEach((textField) => {
      const name = textField?.current?.name ? (textField.current.name as TextFields) : null;
      const value = textField?.current?.value;
      const valid = value && value.trim().length >= 2;
      if (!valid && name) errors[name] = ErrorMessages[name];
    });
    return errors;
  };

  prepareCustomPokemon = () => {
    const shiny = !!this.isShinyField.current?.checked;
    const female = this.femaleInputRef?.current?.checked;
    const file = this.avatarField.current?.files?.[0] || null;
    const customPokemon: CustomPokemon & { id: string } = {
      birthday: this.birthdayField?.current?.value || '',
      type: this.typeField?.current?.value || '',
      name: this.nameField?.current?.value || '',
      gender: female ? FEMALE : MALE,
      avatar: file,
      id: uuid(),
      shiny,
    };
    return customPokemon;
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = [
      this.nameField,
      this.typeField,
      this.avatarField,
      this.isShinyField,
      this.consentField,
      this.birthdayField,
      this.maleInputRef,
      this.femaleInputRef,
    ];
    const errors = this.validate(fields);
    if (Object.values(errors).some((error) => error != null)) {
      this.setState({ errors });
    } else {
      const customPokemon = this.prepareCustomPokemon();
      this.setState({
        pokemons: [...this.state.pokemons, customPokemon],
      });
      fields.forEach((field) => {
        const current = field.current;
        if (current) {
          if (current.type === 'radio' || current.type === 'checkbox') {
            (current as HTMLInputElement).checked = false;
          } else current.value = '';
        }
      });
    }
  };

  render() {
    const { location, componentName } = this.props;
    return (
      <Layout location={location} componentName={componentName}>
        <S.CommonView>
          <S.FormHeading>Create custom pokemon!</S.FormHeading>
          <S.Form onSubmit={this.handleSubmit}>
            <NameField
              onChange={this.removeError}
              errors={this.state.errors}
              ref={this.nameField}
            />
            <TypeField
              onChange={this.removeError}
              errors={this.state.errors}
              ref={this.typeField}
            />
            <S.GenderWrapper>
              <S.RadioWrapper>
                *Gender
                <S.RadioFields>
                  <GenderField
                    name={FEMALE}
                    ref={this.femaleInputRef}
                    onChange={this.removeError}
                  />
                  <GenderField name={MALE} ref={this.maleInputRef} onChange={this.removeError} />
                </S.RadioFields>
              </S.RadioWrapper>
              <ErrorMessage
                visible={!!this.state.errors.gender}
                message={this.state.errors.gender}
              />
            </S.GenderWrapper>
            <BirthdayField
              ref={this.birthdayField}
              errors={this.state.errors}
              onChange={this.removeError}
            />
            <AvatarField ref={this.avatarField} />
            <ShinyField ref={this.isShinyField} />
            <ConsentField
              ref={this.consentField}
              errors={this.state.errors}
              onChange={this.removeError}
            />
            <S.SubmitButton
              disabled={
                this.state.initialEnter ||
                Object.values(this.state.errors).some((error) => error != null)
              }
              type="submit"
            >
              Submit
            </S.SubmitButton>
            <S.SuccessMessage ref={this.successMessage}>Pokemon added successfuly</S.SuccessMessage>
          </S.Form>
          <hr />
          <S.CardsGrid>
            {this.state.pokemons.map((pokemon) => (
              <FormCard key={pokemon.id} customPokemon={pokemon} />
            ))}
          </S.CardsGrid>
        </S.CommonView>
      </Layout>
    );
  }
}
