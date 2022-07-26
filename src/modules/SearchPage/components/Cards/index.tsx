import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import React, { createRef, RefObject } from 'react';
import { AvailableTabs } from 'appConstants';
import { DetailsModal } from 'modules';
import { Loader } from 'components';
import * as S from './styled';

type Props = {
  types: Array<PokemonTypeDetails>;
  moves: Array<PokemonMoveDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  isLoading: boolean;
};

type State = {
  selectedType: PokemonTypeDetails | null;
  selectedMove: PokemonMoveDetails | null;
  selectedPokemon: PokemonDetails | null;
  isModalOpened: boolean;
};

export class Cards extends React.Component<Props, State> {
  pokemonModalRef: RefObject<HTMLDivElement>;
  moveModalRef: RefObject<HTMLDivElement>;
  typeModalRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      isModalOpened: false,
      selectedPokemon: null,
      selectedMove: null,
      selectedType: null,
    };
    this.pokemonModalRef = createRef();
    this.moveModalRef = createRef();
    this.typeModalRef = createRef();
  }

  handlePokemonSelect = (selectedPokemon: PokemonDetails) => this.setState({ selectedPokemon });
  handleMoveSelect = (selectedMove: PokemonMoveDetails) => this.setState({ selectedMove });
  handleTypeSelect = (selectedType: PokemonTypeDetails) => this.setState({ selectedType });
  handleModalOpened = (isModalOpened: boolean) => this.setState({ isModalOpened });

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Loader />
        ) : (
          <S.CardsWrapper
            min={this.props.activeTab === AvailableTabs.pokemons ? '250px' : '130px'}
            isLoading={this.props.isLoading}
          >
            {this.props.activeTab === AvailableTabs.pokemons ? (
              <>
                {this.props.pokemons.length > 0 ? (
                  <>
                    {this.state.selectedPokemon && (
                      <DetailsModal
                        ref={this.pokemonModalRef}
                        selectedPokemon={this.state.selectedPokemon}
                        handleModalOpened={this.handleModalOpened}
                        isModalOpened={this.state.isModalOpened}
                      />
                    )}
                    {this.props.pokemons.map((pokemon) => (
                      <PokemonCard
                        handlePokemonSelect={this.handlePokemonSelect}
                        handleModalOpened={this.handleModalOpened}
                        pokemon={pokemon}
                        key={pokemon.id}
                      />
                    ))}
                  </>
                ) : (
                  <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
                )}
              </>
            ) : this.props.activeTab === AvailableTabs.moves ? (
              <>
                {this.props.moves.length > 0 ? (
                  <>
                    {this.state.selectedMove && (
                      <DetailsModal
                        ref={this.moveModalRef}
                        handleModalOpened={this.handleModalOpened}
                        isModalOpened={this.state.isModalOpened}
                        selectedMove={this.state.selectedMove}
                      />
                    )}
                    {this.props.moves.map((move) => (
                      <MoveCard
                        handleModalOpened={this.handleModalOpened}
                        handleMoveSelect={this.handleMoveSelect}
                        move={move}
                        key={move.id}
                      />
                    ))}
                  </>
                ) : (
                  <S.NoDataInfo>No moves were found</S.NoDataInfo>
                )}
              </>
            ) : this.props.activeTab === AvailableTabs.types ? (
              <>
                {this.props.types.length > 0 ? (
                  <>
                    {this.state.selectedType && (
                      <DetailsModal
                        ref={this.typeModalRef}
                        handleModalOpened={this.handleModalOpened}
                        isModalOpened={this.state.isModalOpened}
                        selectedType={this.state.selectedType}
                      />
                    )}
                    {this.props.types.map((type) => (
                      <TypeCard
                        handleModalOpened={this.handleModalOpened}
                        handleTypeSelect={this.handleTypeSelect}
                        key={type.id}
                        type={type}
                      />
                    ))}
                  </>
                ) : (
                  <S.NoDataInfo>No types were found</S.NoDataInfo>
                )}
              </>
            ) : null}
          </S.CardsWrapper>
        )}
      </>
    );
  }
}
