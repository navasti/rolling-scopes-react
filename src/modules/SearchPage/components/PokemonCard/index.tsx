import { PokemonDetails } from 'types';
import { appendComma } from 'utils';
import * as S from './styled';

type Props = {
  handlePokemonSelect: (selectedPokemon: PokemonDetails) => void;
  handleOpenModal: () => void;
  pokemon: PokemonDetails;
};

export const PokemonCard = ({ pokemon, handlePokemonSelect, handleOpenModal }: Props) => {
  const onClick = () => {
    handlePokemonSelect(pokemon);
    setTimeout(() => handleOpenModal(), 0);
  };
  return (
    <S.Card onClick={onClick} data-testid="pokemon-card">
      <S.ImageWrapper>
        <S.Image src={pokemon.sprites.front_default} alt={pokemon.name} />
        <S.BaseInformation>
          <S.Title>Base:</S.Title>
          <p>Name: {pokemon.name}</p>
          <p>
            Types:{' '}
            {pokemon.types.map(({ type }, index) => (
              <span key={`${pokemon.name}-${type.name}`}>
                {appendComma(pokemon.types.length, index, type.name)}
              </span>
            ))}
          </p>
        </S.BaseInformation>
      </S.ImageWrapper>
    </S.Card>
  );
};
