import { MoveSorting, PokemonSorting, Status, TypeSorting } from 'types';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MouseEvent } from 'react';
import {
  resultsAmountAsync,
  previousPageAsync,
  resultsAmountSync,
  specificPageAsync,
  previousPageSync,
  specificPageSync,
  nextPageAsync,
  nextPageSync,
  sortingAsync,
  sortingSync,
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

  const totalMoveResults = searchMoveResults ? searchMoveResults.length : allMoves.length;
  const totalTypeResults = searchTypeResults ? searchTypeResults.length : allTypes.length;
  const totalPokemonResults = searchPokemonResults
    ? searchPokemonResults.length
    : allPokemons.length;

  const handleMoveSorting = (sorting: MoveSorting | TypeSorting | PokemonSorting) => {
    if (sorting === MoveSorting.none && !searchMoveResults?.length) {
      dispatch(sortingAsync({ resourceType: 'moves', resultsAmount: moveResultsAmount }));
    } else {
      dispatch(sortingSync({ resourceType: 'moves', sorting: sorting }));
    }
  };

  const handleMoveResultsAmount = (resultsAmount: number) => {
    if (moveSorting === MoveSorting.none && !searchMoveResults?.length) {
      dispatch(resultsAmountAsync({ resourceType: 'moves', resultsAmount }));
    } else {
      dispatch(resultsAmountSync({ resourceType: 'moves', resultsAmount }));
    }
  };

  const handleNextMovePage = () => {
    if (moveSorting === MoveSorting.none && baseMoves?.next && !searchMoveResults?.length) {
      dispatch(nextPageAsync({ resourceType: 'moves', next: baseMoves.next }));
    } else {
      dispatch(nextPageSync({ resourceType: 'moves' }));
    }
  };

  const handlePreviousMovePage = () => {
    if (moveSorting === MoveSorting.none && baseMoves?.previous && !searchMoveResults?.length) {
      dispatch(previousPageAsync({ resourceType: 'moves', previous: baseMoves.previous }));
    } else {
      dispatch(previousPageSync({ resourceType: 'moves' }));
    }
  };

  const handleSpecificMovePage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (moveSorting === MoveSorting.none && !searchMoveResults?.length) {
        dispatch(
          specificPageAsync({ resourceType: 'moves', resultsAmount: moveResultsAmount, page })
        );
      } else {
        dispatch(specificPageSync({ resourceType: 'moves', page }));
      }
    }
  };

  const handlePokemonSorting = (sorting: MoveSorting | TypeSorting | PokemonSorting) => {
    if (sorting === MoveSorting.none && !searchPokemonResults?.length) {
      dispatch(sortingAsync({ resourceType: 'pokemons', resultsAmount: pokemonResultsAmount }));
    } else {
      dispatch(sortingSync({ sorting, resourceType: 'pokemons' }));
    }
  };

  const handlePokemonResultsAmount = (resultsAmount: number) => {
    if (pokemonSorting === PokemonSorting.none && !searchPokemonResults?.length) {
      dispatch(resultsAmountAsync({ resourceType: 'pokemons', resultsAmount }));
    } else {
      dispatch(resultsAmountSync({ resourceType: 'pokemons', resultsAmount }));
    }
  };

  const handleNextPokemonPage = () => {
    if (
      pokemonSorting === PokemonSorting.none &&
      basePokemons?.next &&
      !searchPokemonResults?.length
    ) {
      dispatch(nextPageAsync({ resourceType: 'pokemons', next: basePokemons.next }));
    } else {
      dispatch(nextPageSync({ resourceType: 'pokemons' }));
    }
  };

  const handlePreviousPokemonPage = () => {
    if (
      pokemonSorting === PokemonSorting.none &&
      basePokemons?.previous &&
      !searchPokemonResults?.length
    ) {
      dispatch(previousPageAsync({ resourceType: 'pokemons', previous: basePokemons.previous }));
    } else {
      dispatch(previousPageSync({ resourceType: 'pokemons' }));
    }
  };

  const handleSpecificPokemonPage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (pokemonSorting === PokemonSorting.none && !searchPokemonResults?.length) {
        dispatch(
          specificPageAsync({ resourceType: 'pokemons', resultsAmount: pokemonResultsAmount, page })
        );
      } else {
        dispatch(specificPageSync({ resourceType: 'pokemons', page }));
      }
    }
  };

  const handleTypeSorting = (sorting: MoveSorting | TypeSorting | PokemonSorting) => {
    if (sorting === TypeSorting.none && !searchTypeResults?.length) {
      dispatch(sortingAsync({ resourceType: 'types', resultsAmount: typeResultsAmount }));
    } else {
      dispatch(sortingSync({ resourceType: 'types', sorting: sorting }));
    }
  };

  const handleTypesResultsAmount = (resultsAmount: number) => {
    if (typeSorting === TypeSorting.none && !searchTypeResults?.length) {
      dispatch(resultsAmountAsync({ resourceType: 'types', resultsAmount }));
    } else {
      dispatch(resultsAmountSync({ resourceType: 'types', resultsAmount }));
    }
  };

  const handleNextTypePage = () => {
    if (typeSorting === TypeSorting.none && baseTypes?.next && !searchTypeResults?.length) {
      dispatch(nextPageAsync({ resourceType: 'types', next: baseTypes.next }));
    } else {
      dispatch(nextPageSync({ resourceType: 'types' }));
    }
  };

  const handlePreviousTypePage = () => {
    if (typeSorting === TypeSorting.none && baseTypes?.previous && !searchTypeResults?.length) {
      dispatch(previousPageAsync({ resourceType: 'types', previous: baseTypes.previous }));
    } else {
      dispatch(previousPageSync({ resourceType: 'types' }));
    }
  };

  const handleSpecificTypePage = (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (!Number.isNaN(page)) {
      if (typeSorting === TypeSorting.none && !searchTypeResults?.length) {
        dispatch(
          specificPageAsync({ resourceType: 'types', resultsAmount: typeResultsAmount, page })
        );
      } else {
        dispatch(specificPageSync({ resourceType: 'types', page }));
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
