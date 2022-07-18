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
  birthdayField: CommonFieldType;
  consentField: CommonFieldType;
  genderField: GenderFieldType;
  avatarField: CommonFieldType;
  typeField: SelectFieldType;
  nameField: CommonFieldType;
};

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
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
    if (errorRef?.current) {
      errorRef.current.style.display = 'none';
    }
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
    if (inputRef.current?.value) return inputRef.current.value;
    else errorRef?.current && (errorRef.current.style.display = 'block');
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
            <NameField refs={state.nameField} onClick={this.clearError} />
            <AvatarField refs={state.avatarField} />
            <GenderField refs={state.genderField} onClick={this.clearError} />
            <TypeField refs={state.typeField} onClick={this.clearError} />
            <BirthdayField refs={state.birthdayField} onClick={this.clearError} />
            <ShinyField inputRef={state.isShinyField.inputRef} />
            <ConsentField refs={state.consentField} onClick={this.clearError} />
            <S.SubmitButton type="submit">Submit</S.SubmitButton>
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
