import { MoveCardDetails, PokemonCardDetails, TypeCardDetails } from './components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks';
import { Layout } from 'modules';
import * as S from './styled';
import {
  AvailableCardDetails,
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
} from 'types';

type Props = {
  componentName: string;
  location: string;
};

type MatchedPokemon = {
  resourceType: AvailableCardDetails.pokemon;
  data: PokemonDetails;
};

type MatchedMove = {
  resourceType: AvailableCardDetails.move;
  data: PokemonMoveDetails;
};

type MatchedType = {
  resourceType: AvailableCardDetails.type;
  data: PokemonTypeDetails;
};

type MatchedData = MatchedPokemon | MatchedMove | MatchedType;

export const Details = ({ componentName, location }: Props) => {
  const [matchedData, setMatchedData] = useState<MatchedData>();
  const { id, resourceType } = useParams();
  const { allMoves, allPokemons, allTypes } = useAppSelector((state) => state.resources);

  useEffect(() => {
    const { move, pokemon, type } = AvailableCardDetails;
    if (id && resourceType === pokemon) {
      const found = allPokemons.find((pokemon) => pokemon.id === Number(id));
      found && setMatchedData({ resourceType, data: found });
    }
    if (id && resourceType === move) {
      const found = allMoves.find((move) => move.id === Number(id));
      found && setMatchedData({ resourceType, data: found });
    }
    if (id && resourceType === type) {
      const found = allTypes.find((type) => type.id === Number(id));
      found && setMatchedData({ resourceType, data: found });
    }
  }, [resourceType, id, allMoves, allTypes, allPokemons]);

  return (
    <Layout location={location} componentName={componentName}>
      <S.DetailsView>
        {matchedData ? (
          <>
            {matchedData.resourceType === AvailableCardDetails.pokemon && (
              <PokemonCardDetails pokemon={matchedData.data} />
            )}
            {matchedData.resourceType === AvailableCardDetails.move && (
              <MoveCardDetails move={matchedData.data} />
            )}
            {matchedData.resourceType === AvailableCardDetails.type && (
              <TypeCardDetails type={matchedData.data} />
            )}
          </>
        ) : (
          <S.DetailsInformation>
            {id && resourceType ? (
              <>
                Could not found detailed data for {resourceType} with id {id}
              </>
            ) : (
              <>
                No enough information provided. Get back to the search page in order to fetch data
                and select specific pokemon to see its details.
              </>
            )}
          </S.DetailsInformation>
        )}
        <S.ReturnButton>
          <Link to="/">Go to search page</Link>
        </S.ReturnButton>
      </S.DetailsView>
    </Layout>
  );
};
