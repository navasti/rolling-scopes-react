import { useSearchContext } from 'contexts';
import { SearchingResults } from 'types';
import { Pagination } from '../Pagination';
import { SortingSelector } from '../SortingSelector';

import { PokemonCard } from '../PokemonView/components/PokemonCard';

type Props = {
  searchingResults?: SearchingResults;
};

export const Results = ({ searchingResults }: Props) => {
  return (
    <div>
      {/* <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      <SortingSelector name="pokemon" onChange={handleSorting} options={options} value={sorting} />
      <div>
        {searchingResults.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div> */}
    </div>
  );
};
