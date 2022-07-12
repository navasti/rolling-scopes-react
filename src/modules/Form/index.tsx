import React, { createRef, FormEvent, RefObject } from 'react';
import { FormCard } from './components';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

type State = {
  birthdayField: RefObject<HTMLInputElement>;
  isShinyField: RefObject<HTMLInputElement>;
  consentField: RefObject<HTMLInputElement>;
  femaleField: RefObject<HTMLInputElement>;
  avatarField: RefObject<HTMLInputElement>;
  typeField: RefObject<HTMLSelectElement>;
  nameField: RefObject<HTMLInputElement>;
  maleField: RefObject<HTMLInputElement>;
};

export class Forms extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      birthdayField: createRef(),
      consentField: createRef(),
      isShinyField: createRef(),
      femaleField: createRef(),
      avatarField: createRef(),
      maleField: createRef(),
      typeField: createRef(),
      nameField: createRef(),
    };
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const state = this.state;
    const { location, componentName } = this.props;
    return (
      <Layout location={location} componentName={componentName}>
        <S.CommonView>
          <S.FormHeading>Create custom pokemon!</S.FormHeading>
          <S.Form onSubmit={this.handleSubmit}>
            <S.CommonLabel htmlFor="name">
              Name
              <input id="name" ref={state.nameField} type="text" placeholder="name" />
            </S.CommonLabel>

            <S.FileField htmlFor="avatar">
              Avatar
              <input id="avatar" ref={state.avatarField} type="file" />
            </S.FileField>

            <S.RadioWrapper>
              Gender
              <div>
                <S.RadioField htmlFor="male">
                  <input type="radio" ref={state.maleField} id="male" name="gender" value="male" />
                  Male
                </S.RadioField>
                <S.RadioField htmlFor="female">
                  <input
                    type="radio"
                    ref={state.femaleField}
                    id="female"
                    name="gender"
                    value="female"
                  />
                  Female
                </S.RadioField>
              </div>
            </S.RadioWrapper>

            <S.CommonLabel htmlFor="type">
              Main type
              <select id="type" ref={state.typeField}>
                <option value=""></option>
                <option value="fire">fire</option>
                <option value="grass">grass</option>
                <option value="poison">poison</option>
                <option value="flying">flying</option>
                <option value="ground">ground</option>
                <option value="psycho">psycho</option>
                <option value="water">water</option>
                <option value="ice">ice</option>
              </select>
            </S.CommonLabel>

            <S.SwitchWrapper>
              Shiny
              <S.SwitchField htmlFor="shiny">
                <input id="shiny" ref={state.isShinyField} type="checkbox" />
                <span></span>
              </S.SwitchField>
            </S.SwitchWrapper>

            <S.CommonLabel htmlFor="birthdate">
              Birthdate
              <input id="birthdate" ref={state.birthdayField} type="date" />
            </S.CommonLabel>

            <S.CheckboxField htmlFor="consent">
              <input id="consent" ref={state.consentField} type="checkbox" /> I have read and accept
              the regulations
            </S.CheckboxField>

            <S.SubmitButton type="submit">Submit</S.SubmitButton>
          </S.Form>
          <hr />
          <FormCard />
        </S.CommonView>
      </Layout>
    );
  }
}
