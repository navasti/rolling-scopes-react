import { useMoveContext, usePokemonContext, useSearchContext, useTypeContext } from 'contexts';
import { fetchAndMapMoves, fetchAndMapPokemons, fetchAndMapTypes } from 'utils';
import { SearchPage, About, NotFound, Form, Details } from 'modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { API, INPUT_VALUE_KEY, Limits } from 'appConstants';
import { useEffect } from 'react';

const fetchAllData = async () => {
  const allPokemons = await fetchAndMapPokemons(API.ALL_POKEMONS).then((pokemons) => pokemons);
  const allMoves = await fetchAndMapMoves(API.ALL_MOVES).then((moves) => moves);
  const allTypes = await fetchAndMapTypes(API.ALL_TYPES).then((types) => types);
  return { allPokemons, allMoves, allTypes };
};

const findCurrentData = async (value: string) => {
  const { allMoves, allPokemons, allTypes } = await fetchAllData();
  const currentTypes = allTypes.mapped.filter((item) => item.name.includes(value));
  const currentMoves = allMoves.mapped.filter((item) => item.name.includes(value));
  const currentPokemons = allPokemons.mapped.filter((item) => item.name.includes(value));
  return { allMoves, allPokemons, allTypes, currentMoves, currentTypes, currentPokemons };
};

const fetchCurrentData = async () => {
  const { allMoves, allPokemons, allTypes } = await fetchAllData();
  const currentPokemons = await fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`).then(
    (pokemons) => pokemons
  );
  const currentMoves = await fetchAndMapMoves(`${API.MOVE}${API.MOVE_LIMIT}`).then(
    (moves) => moves
  );
  const currentTypes = await fetchAndMapTypes(`${API.TYPE}${API.TYPE_LIMIT}`).then(
    (types) => types
  );
  return { allMoves, allPokemons, allTypes, currentMoves, currentTypes, currentPokemons };
};

export const App = () => {
  const {
    setBaseData: setBasePokemons,
    setAllDataResults: setAllPokemons,
    setSearchResults: setPokemonResults,
    setCurrentPageResults: setCurrentPokemons,
  } = usePokemonContext();

  const {
    setBaseData: setBaseMoves,
    setAllDataResults: setAllMoves,
    setSearchResults: setMoveResults,
    setCurrentPageResults: setCurrentMoves,
  } = useMoveContext();

  const {
    setBaseData: setBaseTypes,
    setAllDataResults: setAllTypes,
    setSearchResults: setTypeResults,
    setCurrentPageResults: setCurrentTypes,
  } = useTypeContext();
  setCurrentTypes;
  const { setIsLoading } = useSearchContext();

  useEffect(() => {
    setIsLoading(true);
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (inputValue) {
      findCurrentData(inputValue).then((data) => {
        setCurrentPokemons(data.currentPokemons.slice(0, Limits.pokemon));
        setCurrentMoves(data.currentMoves.slice(0, Limits.move));
        setCurrentTypes(data.currentTypes.slice(0, Limits.type));
        setAllMoves(data.allMoves.mapped);
        setAllPokemons(data.allPokemons.mapped);
        setAllTypes(data.allTypes.mapped);
        setPokemonResults(data.currentPokemons);
        setTypeResults(data.currentTypes);
        setMoveResults(data.currentMoves);
        setIsLoading(false);
      });
    } else {
      fetchCurrentData().then((data) => {
        data.currentTypes.base && setBaseTypes(data.currentTypes.base);
        data.currentMoves.base && setBaseMoves(data.currentMoves.base);
        data.currentPokemons.base && setBasePokemons(data.currentPokemons.base);
        setCurrentTypes(data.currentTypes.mapped);
        setCurrentMoves(data.currentMoves.mapped);
        setCurrentPokemons(data.currentPokemons.mapped);
        setAllMoves(data.allMoves.mapped);
        setAllTypes(data.allTypes.mapped);
        setAllPokemons(data.allPokemons.mapped);
        setIsLoading(false);
      });
    }
  }, [
    setAllMoves,
    setAllTypes,
    setBaseTypes,
    setBaseMoves,
    setIsLoading,
    setTypeResults,
    setMoveResults,
    setAllPokemons,
    setCurrentTypes,
    setCurrentMoves,
    setBasePokemons,
    setPokemonResults,
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
