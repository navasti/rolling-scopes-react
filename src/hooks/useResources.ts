import { MoveSorting, PokemonSorting, Status, TypeSorting } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { MouseEvent } from 'react';
import {
  pokemonResultsAmountAsync,
  pokemonResultsAmountSync,
  pokemonPreviousPageAsync,
  pokemonSpecificPageAsync,
  pokemonPreviousPageSync,
  pokemonSpecificPageSync,
  moveResultsAmountAsync,
  typeResultsAmountAsync,
  typeResultsAmountSync,
  moveResultsAmountSync,
  movePreviousPageAsync,
  moveSpecificPageAsync,
  typeSpecificPageAsync,
  typePreviousPageAsync,
  typePreviousPageSync,
  typeSpecificPageSync,
  moveSpecificPageSync,
  movePreviousPageSync,
  pokemonNextPageAsync,
  pokemonNextPageSync,
  pokemonSortingAsync,
  pokemonSortingSync,
  moveNextPageAsync,
  typeNextPageAsync,
  typeSortingAsync,
  typeNextPageSync,
  moveNextPageSync,
  moveSortingAsync,
  moveSortingSync,
  typeSortingSync,
} from 'features/resources/resourcesSlice';

export const useResources = () => {
  const {
    status,
    allTypes,
    allMoves,
    baseMoves,
    baseTypes,
    typeSorting,
    moveSorting,
    allPokemons,
    basePokemons,
    pokemonSorting,
    typeResultsAmount,
    moveResultsAmount,
    searchTypeResults,
    searchMoveResults,
    searchPokemonResults,
    pokemonResultsAmount,
  } = useAppSelector((state) => state.resources);
  const dispatch = useAppDispatch();

  const isLoading = status === Status.loading;

  const totalMovePages = Math.ceil(
    (searchMoveResults?.length || allMoves.length) / moveResultsAmount
  );
  const totalTypePages = Math.ceil(
    (searchTypeResults?.length || allTypes.length) / typeResultsAmount
  );
  const totalPokemonPages = Math.ceil(
    (searchPokemonResults?.length || allPokemons.length) / pokemonResultsAmount
  );

  const pokemons = [...(searchPokemonResults?.length ? searchPokemonResults : allPokemons)];
  const moves = [...(searchMoveResults?.length ? searchMoveResults : allMoves)];
  const types = [...(searchTypeResults?.length ? searchTypeResults : allTypes)];

  const totalMoveResults = searchMoveResults ? searchMoveResults.length : allMoves.length;
  const totalTypeResults = searchTypeResults ? searchTypeResults.length : allTypes.length;
  const totalPokemonResults = searchPokemonResults
    ? searchPokemonResults.length
    : allPokemons.length;

  const handleMoveSorting = (sorting: string) => {
    if (sorting === MoveSorting.none && !searchMoveResults?.length) {
      dispatch(moveSortingAsync(moveResultsAmount));
    } else {
      dispatch(moveSortingSync({ moves, sorting: sorting as MoveSorting }));
    }
  };

  const handleMoveResultsAmount = (resultsAmount: number) => {
    if (moveSorting === MoveSorting.none && !searchMoveResults?.length) {
      dispatch(moveResultsAmountAsync(resultsAmount));
    } else {
      dispatch(moveResultsAmountSync({ resultsAmount, moves }));
    }
  };

  const handleNextMovePage = () => {
    if (moveSorting === MoveSorting.none && baseMoves?.next && !searchMoveResults?.length) {
      dispatch(moveNextPageAsync(baseMoves.next));
    } else {
      dispatch(moveNextPageSync(moves));
    }
  };

  const handlePreviousMovePage = () => {
    if (moveSorting === MoveSorting.none && baseMoves?.previous && !searchMoveResults?.length) {
      dispatch(movePreviousPageAsync(baseMoves.previous));
    } else {
      dispatch(movePreviousPageSync(moves));
    }
  };

  const handleSpecificMovePage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (moveSorting === MoveSorting.none && !searchMoveResults?.length) {
        dispatch(moveSpecificPageAsync({ resultsAmount: moveResultsAmount, page }));
      } else {
        dispatch(moveSpecificPageSync({ moves, page }));
      }
    }
  };

  const handlePokemonSorting = (sorting: string) => {
    if (sorting === PokemonSorting.none && !searchPokemonResults?.length) {
      dispatch(pokemonSortingAsync(pokemonResultsAmount));
    } else {
      dispatch(pokemonSortingSync({ pokemons, sorting: sorting as PokemonSorting }));
    }
  };

  const handlePokemonResultsAmount = (resultsAmount: number) => {
    if (pokemonSorting === PokemonSorting.none && !searchPokemonResults?.length) {
      dispatch(pokemonResultsAmountAsync(resultsAmount));
    } else {
      dispatch(pokemonResultsAmountSync({ pokemons, resultsAmount }));
    }
  };

  const handleNextPokemonPage = () => {
    if (
      pokemonSorting === PokemonSorting.none &&
      !searchPokemonResults?.length &&
      basePokemons?.next
    ) {
      dispatch(pokemonNextPageAsync(basePokemons.next));
    } else {
      dispatch(pokemonNextPageSync(pokemons));
    }
  };

  const handlePreviousPokemonPage = () => {
    if (
      pokemonSorting === PokemonSorting.none &&
      basePokemons?.previous &&
      !searchPokemonResults?.length
    ) {
      dispatch(pokemonPreviousPageAsync(basePokemons.previous));
    } else {
      dispatch(pokemonPreviousPageSync(pokemons));
    }
  };

  const handleSpecificPokemonPage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (pokemonSorting === PokemonSorting.none && !searchPokemonResults?.length) {
        dispatch(pokemonSpecificPageAsync({ resultsAmount: pokemonResultsAmount, page }));
      } else {
        dispatch(pokemonSpecificPageSync({ pokemons, page }));
      }
    }
  };

  const handleTypeSorting = (sorting: string) => {
    if (sorting === TypeSorting.none && !searchTypeResults?.length) {
      dispatch(typeSortingAsync(typeResultsAmount));
    } else {
      dispatch(typeSortingSync({ types, sorting: sorting as TypeSorting }));
    }
  };

  const handleTypesResultsAmount = (resultsAmount: number) => {
    if (typeSorting === TypeSorting.none && !searchTypeResults?.length) {
      dispatch(typeResultsAmountAsync(resultsAmount));
    } else {
      dispatch(typeResultsAmountSync({ types, resultsAmount }));
    }
  };

  const handleNextTypePage = () => {
    if (typeSorting === TypeSorting.none && baseTypes?.next && !searchTypeResults?.length) {
      dispatch(typeNextPageAsync(baseTypes.next));
    } else {
      dispatch(typeNextPageSync(types));
    }
  };

  const handlePreviousTypePage = () => {
    if (typeSorting === TypeSorting.none && baseTypes?.previous && !searchTypeResults?.length) {
      dispatch(typePreviousPageAsync(baseTypes.previous));
    } else {
      dispatch(typePreviousPageSync(types));
    }
  };

  const handleSpecificTypePage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (typeSorting === TypeSorting.none && !searchTypeResults?.length) {
        dispatch(typeSpecificPageAsync({ resultsAmount: typeResultsAmount, page }));
      } else {
        dispatch(typeSpecificPageSync({ types, page }));
      }
    }
  };

  return {
    handlePokemonResultsAmount,
    handleSpecificPokemonPage,
    handlePreviousPokemonPage,
    handleTypesResultsAmount,
    handleMoveResultsAmount,
    handlePreviousMovePage,
    handleSpecificMovePage,
    handlePreviousTypePage,
    handleSpecificTypePage,
    handleNextPokemonPage,
    handlePokemonSorting,
    totalPokemonResults,
    handleNextTypePage,
    handleTypeSorting,
    handleNextMovePage,
    handleMoveSorting,
    totalPokemonPages,
    totalMoveResults,
    totalTypeResults,
    totalMovePages,
    totalTypePages,
    isLoading,
  };
};
