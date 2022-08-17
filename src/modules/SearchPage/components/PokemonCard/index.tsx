import { PokemonDetails } from 'types';
import * as S from './styled';

type Props = {
  handlePokemonSelect: (selectedPokemon: PokemonDetails) => void;
  handleOpenModal: () => void;
  pokemon: PokemonDetails;
};

export const PokemonCard = ({ pokemon, handlePokemonSelect, handleOpenModal }: Props) => {
  const onClick = () => {
    handlePokemonSelect(pokemon);
    handleOpenModal();
  };
  return (
    <>
      <S.Card onClick={onClick} align="left" stretch>
        <S.ImageWrapper>
          <S.Image
            src={pokemon.sprites.front_default}
            data-testid="pokemon-card"
            alt={pokemon.name}
            height="85"
            width="85"
            role="img"
          />
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
