import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { Card } from '../Card';
import * as S from './styled';

type Props = {
  pokemons?: Array<PokemonDetails>;
  moves?: Array<PokemonMoveDetails>;
  types?: Array<PokemonTypeDetails>;
  isLoading: boolean;
};

export const Cards = ({ moves, pokemons, isLoading, types }: Props) => {
  return (
    <S.CardsWrapper isLoading={isLoading}>
      {pokemons && (
        <>
          {!pokemons.length ? (
            <p>no pokemons found</p>
          ) : (
            pokemons.map((pokemon) => <Card pokemon={pokemon} key={pokemon.id} />)
          )}
        </>
      )}
      {moves && (
        <>
          {!moves.length ? (
            <p>no moves found</p>
          ) : (
            moves.map((move) => <p key={move.id}>{move.name}</p>)
          )}
        </>
      )}
      {types && (
        <>
          {!types.length ? (
            <p>no types found</p>
          ) : (
            types.map((type) => <p key={type.id}>{type.name}</p>)
          )}
        </>
      )}
    </S.CardsWrapper>
  );
};
