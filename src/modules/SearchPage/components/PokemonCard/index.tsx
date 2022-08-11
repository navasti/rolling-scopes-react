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
    <S.Card onClick={onClick} data-testid="pokemon-card">
      <S.ImageWrapper>
        <S.Image src={pokemon.sprites.front_default} alt={pokemon.name} />
        <S.BaseInformation>
          <S.Title>Base:</S.Title>
          <p>Name: {pokemon.name}</p>
          <p>
            Types: <span>{pokemon.types.map(({ type }) => type.name).join(', ')}</span>
          </p>
        </S.BaseInformation>
      </S.ImageWrapper>
    </S.Card>
  );
};
