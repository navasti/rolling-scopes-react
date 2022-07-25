import { TimesIcon } from 'assets/images/svg';
import * as S from './styled';
import React from 'react';

type Props = {
  children: [JSX.Element, JSX.Element];
};

type State = {
  opened: boolean;
};

export class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      opened: false,
    };
  }
  closeModal = () => {
    this.setState({ opened: false });
  };
  // handleTypeChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const data = await fetchPokemonByParameter<PokemonTypeDetails>(API.TYPE, target.value);
  //   console.log(data);
  // };
  // handleMoveChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const data = await fetchPokemonByParameter<PokemonTypeDetails>(API.MOVE, target.value);
  //   console.log(data);
  // };
  // handleNameChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const data = await fetchPokemonByParameter<PokemonTypeDetails>(API.NAME, target.value);
  //   console.log(data);
  // };

  render() {
    const { opened } = this.state;
    const { children } = this.props;
    return (
      opened && (
        <S.ModalWrapper>
          <S.ModalWindow>
            <S.Header>
              <p>{children[0]}</p>
              <S.CloseButton onClick={this.closeModal}>
                <TimesIcon />
              </S.CloseButton>
            </S.Header>
            <S.Content>
              {children[1]}
              {/* <input type="text" placeholder="type" onChange={(e) => this.handleTypeChange(e)} />
              <input type="text" placeholder="move" onChange={(e) => this.handleMoveChange(e)} />
              <input type="text" placeholder="name" onChange={(e) => this.handleNameChange(e)} /> */}
            </S.Content>
          </S.ModalWindow>
        </S.ModalWrapper>
      )
    );
  }
}
