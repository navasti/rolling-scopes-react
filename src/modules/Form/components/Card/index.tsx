import questionmark from 'assets/images/png/questionmark.png';
import React, { createRef, RefObject } from 'react';
import { CustomPokemon } from 'types';
import * as S from './styled';

type State = {
  avatarRef: RefObject<HTMLImageElement>;
};

type Props = {
  customPokemon: CustomPokemon;
};

export class FormCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      avatarRef: createRef(),
    };
  }

  componentDidMount() {
    const { current } = this.state.avatarRef;
    const { avatar } = this.props.customPokemon;
    if (current) {
      if (avatar) current.src = URL.createObjectURL(avatar);
      else current.src = questionmark;
    }
  }

  render() {
    const { birthday, gender, name, shiny, type } = this.props.customPokemon;
    const { avatarRef } = this.state;
    return (
      <S.Card>
        <S.ImageWrapper>
          <img ref={avatarRef} />
        </S.ImageWrapper>
        <S.Details>
          <p>
            Name: <span>{name}</span>
          </p>
          <p>
            Gender: <span>{gender}</span>
          </p>
          <p>
            Main type: <span>{type}</span>
          </p>
          <p>
            Birthday: <span>{birthday}</span>
          </p>
          <p>
            Shiny: <span>{shiny ? 'Yes' : 'No'}</span>
          </p>
        </S.Details>
      </S.Card>
    );
  }
}
