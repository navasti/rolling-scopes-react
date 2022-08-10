import { PokemonDetails } from 'types';
import * as S from './styled';

type Props = {
  handlePokemonSelect: (selectedPokemon: PokemonDetails) => void;
  handleModalOpened: (opened: boolean) => void;
  pokemon: PokemonDetails;
};

export const PokemonCard = ({ pokemon, handlePokemonSelect, handleModalOpened }: Props) => {
  const onClick = () => {
    handlePokemonSelect(pokemon);
    setTimeout(() => handleModalOpened(true), 0);
  };
  return (
    <>
      <S.Card onClick={onClick}>
        <S.ImageWrapper>
          <S.Image src={pokemon.sprites.front_default} alt={pokemon.name} role="img" />
          <S.BaseInformation>
            <S.Title>Base:</S.Title>
            <p>Name: {pokemon.name}</p>
            <p>
              Types: <span>{pokemon.types.map(({ type }) => type.name).join(', ')}</span>
            </p>
          </S.BaseInformation>
        </S.ImageWrapper>
      </S.Card>
    </>
  );
};
