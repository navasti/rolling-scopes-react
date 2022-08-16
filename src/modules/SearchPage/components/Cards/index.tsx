import { PokemonCard, MoveCard, TypeCard } from 'modules/SearchPage/components';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { AvailableTabs } from 'appConstants';
import { DetailsModal } from 'modules';
import { Loader } from 'components';
import * as S from './styled';
import React from 'react';

type Props = {
  types: Array<PokemonTypeDetails>;
  moves: Array<PokemonMoveDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  isLoading: boolean;
};

type State = {
  selectedType?: PokemonTypeDetails;
  selectedMove?: PokemonMoveDetails;
  selectedPokemon?: PokemonDetails;
  isModalOpened: boolean;
};

export class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isModalOpened: false,
      selectedPokemon: undefined,
      selectedMove: undefined,
      selectedType: undefined,
    };
  }

  handlePokemonSelect = (selectedPokemon: PokemonDetails) => this.setState({ selectedPokemon });
  handleMoveSelect = (selectedMove: PokemonMoveDetails) => this.setState({ selectedMove });
  handleTypeSelect = (selectedType: PokemonTypeDetails) => this.setState({ selectedType });
  handleModalOpened = (isModalOpened: boolean) => this.setState({ isModalOpened });

  render() {
    const { isModalOpened, selectedMove, selectedPokemon, selectedType } = this.state;
    const { activeTab, types, moves, pokemons } = this.props;

    if (this.props.isLoading) return <Loader />;

    const renderSwitch = (param: AvailableTabs) => {
      switch (param) {
        case AvailableTabs.pokemons:
          return !!pokemons.length ? (
            pokemons.map((pokemon) => (
              <PokemonCard
                handlePokemonSelect={this.handlePokemonSelect}
                handleModalOpened={this.handleModalOpened}
                pokemon={pokemon}
                key={pokemon.id}
              />
            ))
          ) : (
            <S.NoDataInfo>No pokemons were found</S.NoDataInfo>
          );
        case AvailableTabs.moves:
          return !!moves.length ? (
            moves.map((move) => (
              <MoveCard
                handleMoveSelect={this.handleMoveSelect}
                handleModalOpened={this.handleModalOpened}
                key={move.id}
                move={move}
              />
            ))
          ) : (
            <S.NoDataInfo>No moves were found</S.NoDataInfo>
          );
        case AvailableTabs.types:
          return !!types.length ? (
            types.map((type) => (
              <TypeCard
                handleTypeSelect={this.handleTypeSelect}
                handleModalOpened={this.handleModalOpened}
                key={type.id}
                type={type}
              />
            ))
          ) : (
            <S.NoDataInfo>No types were found</S.NoDataInfo>
          );
        default:
          return <></>;
      }
    };

    return (
      <S.CardsWrapper
        min={this.props.activeTab === AvailableTabs.pokemons ? '190px' : '130px'}
        center={this.props.activeTab !== AvailableTabs.pokemons}
        isLoading={this.props.isLoading}
      >
        <DetailsModal
          handleModalOpened={this.handleModalOpened}
          selectedPokemon={selectedPokemon}
          isModalOpened={isModalOpened}
          selectedMove={selectedMove}
          selectedType={selectedType}
        />
        {renderSwitch(activeTab)}
      </S.CardsWrapper>
    );
  }
}
