import { CommonFieldType, GenderFieldType, SelectFieldType } from 'types';
import React, { createRef, FormEvent, RefObject } from 'react';
import { Layout } from 'modules';
import * as S from './styled';
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
  birthdayField: CommonFieldType;
  consentField: CommonFieldType;
  genderField: GenderFieldType;
  avatarField: CommonFieldType;
  typeField: SelectFieldType;
  nameField: CommonFieldType;
};

export class Forms extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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
    if (!femaleInputRef?.current?.checked && !maleInputRef?.current?.checked && errorRef?.current) {
      errorRef.current.style.display = 'block';
    }
  };

  validateConsentField = () => {
    const { errorRef, inputRef } = this.state.consentField;
    if (!inputRef?.current?.checked && errorRef?.current) {
      errorRef.current.style.display = 'block';
    }
  };

  validateAvatarField = () => {
    const { errorRef, inputRef } = this.state.avatarField;
    if (!inputRef.current?.files?.length && errorRef?.current) {
      errorRef.current.style.display = 'block';
    }
  };

  validateCommonField = ({ errorRef, inputRef }: CommonFieldType) => {
    if (!inputRef.current?.value && errorRef.current) {
      errorRef.current.style.display = 'block';
    }
  };

  validateTypeField = () => {
    const { errorRef, selectRef } = this.state.typeField;
    if (!selectRef.current?.value && errorRef?.current) {
      errorRef.current.style.display = 'block';
    }
  };

  // !todo additional validation on click

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.validateTypeField();
    this.validateAvatarField();
    this.validateGenderField();
    this.validateConsentField();
    this.validateCommonField(this.state.nameField);
    this.validateCommonField(this.state.consentField);
    this.validateCommonField(this.state.birthdayField);
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
            <AvatarField refs={state.avatarField} onClick={this.clearError} />
            <GenderField refs={state.genderField} onClick={this.clearError} />
            <TypeField refs={state.typeField} onClick={this.clearError} />
            <BirthdayField refs={state.birthdayField} onClick={this.clearError} />
            <ShinyField inputRef={state.isShinyField.inputRef} />
            <ConsentField refs={state.consentField} onClick={this.clearError} />
            <S.SubmitButton type="submit">Submit</S.SubmitButton>
          </S.Form>
          <hr />
          <FormCard />
        </S.CommonView>
      </Layout>
    );
  }
}
