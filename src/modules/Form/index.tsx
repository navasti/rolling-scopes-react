import { FIELDS, FIELDS_VALIDATION_BY_NAME, ERROR_MESSAGES, FEMALE, MALE } from 'appConstants';
import { CommonFieldType, CustomPokemon, GenderFieldType, SelectFieldType } from 'types';
import React, { createRef, FormEvent, RefObject } from 'react';
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
} from './components';

type Props = {
  componentName: string;
  location: string;
};

type State = {
  pokemons: Array<CustomPokemon & { id: string }>;
  errorFields: Array<string>;
  initialEnter: boolean;
};

export class Form extends React.Component<Props, State> {
  isShinyField: Pick<CommonFieldType, 'inputRef'>;
  successMessage: RefObject<HTMLSpanElement>;
  birthdayField: CommonFieldType;
  consentField: CommonFieldType;
  genderField: GenderFieldType;
  avatarField: CommonFieldType;
  typeField: SelectFieldType;
  nameField: CommonFieldType;
  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
      errorFields: [],
      initialEnter: true,
    };
    this.successMessage = createRef();
    this.birthdayField = {
      inputRef: createRef(),
      errorRef: createRef(),
    };
    this.consentField = {
      inputRef: createRef(),
      errorRef: createRef(),
    };
    this.isShinyField = {
      inputRef: createRef(),
    };
    this.genderField = {
      femaleInputRef: createRef(),
      maleInputRef: createRef(),
      errorRef: createRef(),
    };
    this.avatarField = {
      inputRef: createRef(),
      errorRef: createRef(),
    };
    this.typeField = {
      selectRef: createRef(),
      errorRef: createRef(),
    };
    this.nameField = {
      inputRef: createRef(),
      errorRef: createRef(),
    };
  }

  removeIncorrectField = (field: string) => {
    if (this.state.initialEnter) this.setState({ initialEnter: false });
    const fields = [...this.state.errorFields];
    const index = fields.indexOf(field);
    if (index !== -1) {
      fields.splice(index, 1);
      this.setState({ errorFields: [...fields] });
    }
  };

  validate = (fields: Array<React.RefObject<HTMLInputElement | HTMLSelectElement>>) => {
    const errors: Array<string> = [];
    const textFields = FIELDS_VALIDATION_BY_NAME.TEXT.map((textField) =>
      fields.find((field) => field.current?.name === textField)
    );
    const checkFields = FIELDS_VALIDATION_BY_NAME.CHECK.map((checkField) =>
      fields.filter((field) => field.current?.name === checkField)
    );
    checkFields.forEach((checkField) => {
      const valid = checkField.some((field) => (field.current as HTMLInputElement)?.checked);
      const name = checkField[0]?.current?.name;
      if (!valid && name) errors.push(name);
    });
    textFields.forEach((textField) => {
      const name = textField?.current?.name;
      const value = textField?.current?.value;
      const valid = value && value.trim().length >= 2;
      if (!valid && name) errors.push(name);
    });
    return errors;
  };

  prepareCustomPokemon = () => {
    const shiny = !!this.isShinyField.inputRef.current?.checked;
    const female = this.genderField.femaleInputRef?.current?.checked;
    const file = this.avatarField.inputRef.current?.files?.[0] || null;
    const customPokemon: CustomPokemon & { id: string } = {
      birthday: this.birthdayField.inputRef?.current?.value || '',
      type: this.typeField.selectRef?.current?.value || '',
      name: this.nameField.inputRef?.current?.value || '',
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
      this.nameField.inputRef,
      this.typeField.selectRef,
      this.avatarField.inputRef,
      this.isShinyField.inputRef,
      this.consentField.inputRef,
      this.birthdayField.inputRef,
      this.genderField.maleInputRef,
      this.genderField.femaleInputRef,
    ];
    const errors = this.validate(fields);
    if (errors.length) {
      this.setState({ errorFields: errors });
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
            <NameField onChange={this.removeIncorrectField} ref={this.nameField.inputRef}>
              <ErrorMessage
                visible={this.state.errorFields.includes(FIELDS.NAME)}
                ref={this.nameField.errorRef}
                message={ERROR_MESSAGES.NAME}
              />
            </NameField>
            <TypeField onChange={this.removeIncorrectField} ref={this.typeField.selectRef}>
              <ErrorMessage
                visible={this.state.errorFields.includes(FIELDS.TYPE)}
                ref={this.typeField.errorRef}
                message={ERROR_MESSAGES.TYPE}
              />
            </TypeField>
            <S.GenderWrapper>
              <S.RadioWrapper>
                *Gender
                <S.RadioFields>
                  <GenderField
                    name={FEMALE}
                    ref={this.genderField.femaleInputRef}
                    onChange={this.removeIncorrectField}
                  />
                  <GenderField
                    name={MALE}
                    ref={this.genderField.maleInputRef}
                    onChange={this.removeIncorrectField}
                  />
                </S.RadioFields>
              </S.RadioWrapper>
              <ErrorMessage
                visible={this.state.errorFields.includes(FIELDS.GENDER)}
                ref={this.genderField.errorRef}
                message={ERROR_MESSAGES.GENDER}
              />
            </S.GenderWrapper>
            <BirthdayField ref={this.birthdayField.inputRef} onChange={this.removeIncorrectField}>
              <ErrorMessage
                visible={this.state.errorFields.includes(FIELDS.BIRTHDAY)}
                ref={this.birthdayField.errorRef}
                message={ERROR_MESSAGES.BIRTHDAY}
              />
            </BirthdayField>
            <AvatarField ref={this.avatarField.inputRef} />
            <ShinyField ref={this.isShinyField.inputRef} />
            <ConsentField ref={this.consentField.inputRef} onChange={this.removeIncorrectField}>
              <ErrorMessage
                visible={this.state.errorFields.includes(FIELDS.CONSENT)}
                ref={this.consentField.errorRef}
                message={ERROR_MESSAGES.CONSENT}
                center
              />
            </ConsentField>
            <S.SubmitButton
              disabled={this.state.initialEnter || this.state.errorFields.length > 0}
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
