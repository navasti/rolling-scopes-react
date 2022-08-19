import { useSearchContext } from 'contexts';
import { Link } from 'react-router-dom';
import { API } from 'appConstants';
import * as S from './styled';
import {
  fetchPokemonDetails,
  fetchMoveDetails,
  fetchPokemonBase,
  fetchTypeDetails,
  fetchTypeBase,
  fetchMoveBase,
} from 'utils';

type Props = {
  children: JSX.Element;
  returnButton: boolean;
  fetchButton: boolean;
};

export const NoDataMessage = ({ children, fetchButton, returnButton }: Props) => {
  const { setMoves, setLengths, setPokemons, setIsLoading, setTypes } = useSearchContext();

  const fetchAllData = async () => {
    setIsLoading(true);
    const pokemonBase = (await fetchPokemonBase(`${API.POKEMON}${API.POKEMON_LIMIT}`)) || [];
    const moveBase = (await fetchMoveBase(`${API.MOVE}${API.MOVE_LIMIT}`)) || [];
    const typeBase = (await fetchTypeBase(`${API.TYPE}${API.TYPE_LIMIT}`)) || [];
    const pokemons = [...((await fetchPokemonDetails(pokemonBase)) || [])];
    const types = [...((await fetchTypeDetails(typeBase)) || [])];
    const moves = [...((await fetchMoveDetails(moveBase)) || [])];
    setPokemons(pokemons);
    setMoves(moves);
    setTypes(types);
    setLengths({
      pokemons: pokemons.length,
      types: types.length,
      moves: moves.length,
    });
    setIsLoading(false);
  };

  return (
    <S.MessageWrapper>
      <div>{children}</div>
      <S.Buttons>
        {returnButton && (
          <S.ReturnButton>
            <Link to="/">Go to search page</Link>
          </S.ReturnButton>
        )}
        {fetchButton && (
          <S.FetchButton onClick={fetchAllData}>Try to fetch data and search again</S.FetchButton>
        )}
      </S.Buttons>
    </S.MessageWrapper>
  );
};
