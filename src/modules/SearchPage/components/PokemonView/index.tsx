import { SortingSelector, Pagination, ResultsSelector } from 'modules/SearchPage/components';
import { PokemonCard } from './components/PokemonCard';
import { RESULTS_AMOUNT } from 'appConstants';
import { useAppSelector } from 'app/hooks';
import { PokemonSorting } from 'types';
import { useResources } from 'hooks';
import { Loader } from 'components';
import * as S from './styled';

export const PokemonView = () => {
  const options = Object.values(PokemonSorting);

  const { pokemonResultsAmount, currentPokemonPage, currentPokemons, pokemonSorting } =
    useAppSelector((state) => state.resources);

  const {
    isLoading,
    totalPokemonPages,
    handlePokemonSorting,
    handleNextPokemonPage,
    handleSpecificPokemonPage,
    handlePreviousPokemonPage,
    handlePokemonResultsAmount,
  } = useResources();

  return (
    <S.PokemonView>
      <S.SelectorsWrapper>
        <SortingSelector
          onChange={handlePokemonSorting}
          value={pokemonSorting}
          options={options}
          name="pokemon"
        />
        <ResultsSelector
          onClick={handlePokemonResultsAmount}
          options={RESULTS_AMOUNT.POKEMON}
          value={pokemonResultsAmount}
        />
      </S.SelectorsWrapper>
      <Pagination
        previousPage={handlePreviousPokemonPage}
        specificPage={handleSpecificPokemonPage}
        totalPageCount={totalPokemonPages}
        currentPage={currentPokemonPage}
        nextPage={handleNextPokemonPage}
      />
      {!currentPokemons.length && !isLoading && <S.TextCenter>No pokemons found</S.TextCenter>}
      {isLoading ? (
        <Loader />
      ) : (
        <S.CardsWrapper>
          {currentPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </S.CardsWrapper>
      )}
    </S.PokemonView>
  );
};
