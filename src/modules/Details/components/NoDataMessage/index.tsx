import { useSearchContext } from 'contexts';
import { Link } from 'react-router-dom';
import { fetchAndMap } from 'utils';
import { API } from 'appConstants';
import * as S from './styled';

type Props = {
  children: JSX.Element;
  returnButton: boolean;
  fetchButton: boolean;
};

export const NoDataMessage = ({ children, fetchButton, returnButton }: Props) => {
  const { setMoves, setLengths, setPokemons, setIsLoading, setTypes } = useSearchContext();

  const fetchAllData = async () => {
    setIsLoading(true);
    const pokemons = await fetchAndMap.pokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`);
    const moves = await fetchAndMap.moves(`${API.MOVE}${API.MOVE_LIMIT}`);
    const types = await fetchAndMap.types(`${API.TYPE}${API.TYPE_LIMIT}`);
    pokemons && setPokemons(pokemons);
    moves && setMoves(moves);
    types && setTypes(types);
    setLengths({
      pokemons: pokemons?.count || 0,
      moves: moves?.count || 0,
      types: types?.count || 0,
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
