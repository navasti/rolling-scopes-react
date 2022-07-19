import { CommonFieldType, CustomPokemon, GenderFieldType, SelectFieldType } from 'types';
import React, { createRef, FormEvent, RefObject } from 'react';
import { Layout } from 'modules';
import * as S from './styled';
import { uuid } from 'utils';
import {
  BirthdayField,
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
  isShinyField: Pick<CommonFieldType, 'inputRef'>;
  pokemons: Array<CustomPokemon & { id: string }>;
  successMessage: RefObject<HTMLSpanElement>;
  birthdayField: CommonFieldType;
  consentField: CommonFieldType;
  genderField: GenderFieldType;
  avatarField: CommonFieldType;
  typeField: SelectFieldType;
  nameField: CommonFieldType;
  initialEnter: boolean;
  totalErrors: number;
};

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
      totalErrors: 0,
      initialEnter: true,
      successMessage: createRef(),
      birthdayField: {
        inputRef: createRef(),
        errorRef: createRef(),
      },
      consentField: {
        inputRef: createRef(),
        errorRef: createRef(),
      },
      isShinyField: {
        inputRef: createRef(),
      },
      genderField: {
        femaleInputRef: createRef(),
        maleInputRef: createRef(),
        errorRef: createRef(),
      },
      avatarField: {
        inputRef: createRef(),
        errorRef: createRef(),
      },
      typeField: {
        selectRef: createRef(),
        errorRef: createRef(),
      },
      nameField: {
        inputRef: createRef(),
        errorRef: createRef(),
      },
    };
  }

  clearError = (errorRef: RefObject<HTMLSpanElement>) => {
    if (this.state.initialEnter) this.setState({ initialEnter: false });
    if (errorRef.current?.style.display === 'block') {
      this.setState({ totalErrors: this.state.totalErrors - 1 });
      errorRef.current.style.display = 'none';
    }
  };

  clearFields = () => {
    const {
      birthdayField,
      isShinyField,
      consentField,
      genderField,
      avatarField,
      nameField,
      typeField,
    } = this.state;
    avatarField.inputRef.current && (avatarField.inputRef.current.value = '');
    birthdayField.inputRef.current && (birthdayField.inputRef.current.value = '');
    consentField.inputRef.current && (consentField.inputRef.current.checked = false);
    genderField.maleInputRef.current && (genderField.maleInputRef.current.checked = false);
    genderField.femaleInputRef.current && (genderField.femaleInputRef.current.checked = false);
    isShinyField.inputRef.current && (isShinyField.inputRef.current.checked = false);
    typeField.selectRef.current && (typeField.selectRef.current.value = '');
    nameField.inputRef.current && (nameField.inputRef.current.value = '');
  };

  validateGenderField = () => {
    const { errorRef, femaleInputRef, maleInputRef } = this.state.genderField;
    if (femaleInputRef.current?.checked) return 'female';
    else if (maleInputRef.current?.checked) return 'male';
    else errorRef?.current && (errorRef.current.style.display = 'block');
  };

  validateConsentField = () => {
    const { errorRef, inputRef } = this.state.consentField;
    if (inputRef?.current?.checked) return inputRef.current.checked;
    else errorRef?.current && (errorRef.current.style.display = 'block');
  };

  validateCommonField = ({ errorRef, inputRef }: CommonFieldType) => {
    if (inputRef.current?.value && inputRef.current?.value.length > 2) {
      return inputRef.current.value;
    } else errorRef?.current && (errorRef.current.style.display = 'block');
  };

  validateTypeField = () => {
    const { errorRef, selectRef } = this.state.typeField;
    if (selectRef.current?.value) return selectRef.current.value;
    else errorRef?.current && (errorRef.current.style.display = 'block');
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const type = this.validateTypeField();
    const gender = this.validateGenderField();
    const consent = this.validateConsentField();
    const name = this.validateCommonField(this.state.nameField);
    const birthday = this.validateCommonField(this.state.birthdayField);
    if (type && gender && consent && name && birthday) {
      const shiny = !!this.state.isShinyField.inputRef.current?.checked;
      const file = this.state.avatarField.inputRef.current?.files?.[0] || null;
      const customPokemon: CustomPokemon & { id: string } = {
        name,
        type,
        shiny,
        gender,
        birthday,
        id: uuid(),
        avatar: file,
      };
      this.setState({
        pokemons: [...this.state.pokemons, customPokemon],
      });
      const { current } = this.state.successMessage;
      current && (current.style.display = 'block');
      setTimeout(() => {
        current && (current.style.display = 'none');
      }, 3000);
      this.clearFields();
    } else {
      let errors = 0;
      !name && (errors += 1);
      !type && (errors += 1);
      !gender && (errors += 1);
      !consent && (errors += 1);
      !birthday && (errors += 1);
      this.setState({ totalErrors: errors });
    }
  };

  render() {
    const state = this.state;
    const { location, componentName } = this.props;
    return (
      <Layout location={location} componentName={componentName}>
        <S.CommonView>
          <S.FormHeading>Create custom pokemon!</S.FormHeading>
          <S.Form onSubmit={this.handleSubmit}>
            <NameField refs={state.nameField} onChange={this.clearError} />
            <AvatarField refs={state.avatarField} />
            <GenderField refs={state.genderField} onChange={this.clearError} />
            <TypeField refs={state.typeField} onChange={this.clearError} />
            <BirthdayField refs={state.birthdayField} onChange={this.clearError} />
            <ShinyField inputRef={state.isShinyField.inputRef} />
            <ConsentField refs={state.consentField} onChange={this.clearError} />
            <S.SubmitButton disabled={state.totalErrors > 0 || state.initialEnter} type="submit">
              Submit
            </S.SubmitButton>
            <S.SuccessMessage ref={state.successMessage}>
              Pokemon added successfuly
            </S.SuccessMessage>
          </S.Form>
          <hr />
          <S.CardsGrid>
            {state.pokemons.map((pokemon) => (
              <FormCard key={pokemon.id} customPokemon={pokemon} />
            ))}
          </S.CardsGrid>
        </S.CommonView>
      </Layout>
    );
  }
}
