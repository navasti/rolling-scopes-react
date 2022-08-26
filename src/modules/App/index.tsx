import { useMoveContext, usePokemonContext, useSearchContext, useTypeContext } from 'contexts';
import { fetchAndMapMoves, fetchAndMapPokemons, fetchAndMapTypes } from 'utils';
import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from 'appConstants';

const fetchInitialData = async () => {
  const allPokemons = await fetchAndMapPokemons(API.ALL_POKEMONS).then((pokemons) => pokemons);
  const currentPokemons = await fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`).then(
    (pokemons) => pokemons
  );
  const allMoves = await fetchAndMapMoves(API.ALL_MOVES).then((moves) => moves);
  const currentMoves = await fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`).then(
    (moves) => moves
  );
  const allTypes = await fetchAndMapTypes(API.ALL_TYPES).then((types) => types);
  const currentTypes = await fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`).then(
    (types) => types
  );
  return {
    allMoves,
    allTypes,
    allPokemons,
    currentMoves,
    currentTypes,
    currentPokemons,
  };
};

export const App = () => {
  const {
    setBaseData: setBasePokemons,
    setAllDataResults: setAllPokemons,
    setCurrentPageResults: setCurrentPokemons,
  } = usePokemonContext();

  const {
    setBaseData: setBaseMoves,
    setAllDataResults: setAllMoves,
    setCurrentPageResults: setCurrentMoves,
  } = useMoveContext();

  const {
    setBaseData: setBaseTypes,
    setAllDataResults: setAllTypes,
    setCurrentPageResults: setCurrentTypes,
  } = useTypeContext();

  const { setLengths, setIsLoading } = useSearchContext();

  useEffect(() => {
    setIsLoading(true);
    fetchInitialData().then(
      ({ allMoves, allPokemons, currentMoves, currentPokemons, allTypes, currentTypes }) => {
        currentMoves.base && setBaseMoves(currentMoves.base);
        currentPokemons.base && setBasePokemons(currentPokemons.base);
        currentTypes.base && setBaseTypes(currentTypes.base);
        setCurrentTypes(currentTypes.mapped);
        setAllTypes(allTypes.mapped);
        setCurrentMoves(currentMoves.mapped);
        setCurrentPokemons(currentPokemons.mapped);
        setAllMoves(allMoves.mapped);
        setAllPokemons(allPokemons.mapped);
        setLengths({
          pokemons: allPokemons.base?.count || 0,
          moves: allMoves.base?.count || 0,
          types: allTypes.base?.count || 0,
        });
        setIsLoading(false);
      }
    );
  }, [
    setLengths,
    setAllMoves,
    setAllTypes,
    setBaseTypes,
    setBaseMoves,
    setIsLoading,
    setAllPokemons,
    setCurrentTypes,
    setCurrentMoves,
    setBasePokemons,
    setCurrentPokemons,
  ]);

  return (
    <Routes>
      <Route path="/" element={<SearchPage componentName="SearchPage" location="/" />} />
      <Route path="/about" element={<About componentName="About" location="/about" />} />
      <Route path="/404" element={<NotFound componentName="NotFound" location="/404" />} />
      <Route path="/form" element={<Form componentName="Form" location="/form" />} />
      <Route path="/details">
        <Route path="" element={<Details componentName="Details" location="/details" />} />
        <Route path="*" element={<Details componentName="Details" location="/details" />} />
        <Route
          path=":resourceType/:id"
          element={<Details componentName="Details" location="/details" />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
