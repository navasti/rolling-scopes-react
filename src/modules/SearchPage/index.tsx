import { AvailableTabs, API, INPUT_VALUE_KEY, tabs } from 'appConstants';
import { fetchPokemonByParameter, fetchDetails, fetchBase } from 'utils';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { SearchBar, Tabs, Cards } from './components';
import { Layout } from 'modules';
import * as S from './styled';
import {
  PokemonTypeDetails,
  PokemonMoveDetails,
  PokemonDetails,
  PokemonData,
  PokemonMove,
  PokemonType,
  MovesData,
  TypesData,
  Pokemon,
  Lengths,
} from 'types';

type Props = {
  componentName: string;
  location: string;
};

type State = {
  moves: Array<PokemonMoveDetails>;
  types: Array<PokemonTypeDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  inputValue: string;
  isLoading: boolean;
  lengths: Lengths;
};

export class SearchPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: AvailableTabs.pokemons,
      isLoading: true,
      inputValue: '',
      pokemons: [],
      moves: [],
      types: [],
      lengths: {
        moves: 0,
        pokemons: 0,
        types: 0,
      },
    };
  }

  componentDidMount() {
    const inputValue = window.localStorage.getItem(INPUT_VALUE_KEY);
    if (inputValue && inputValue.trim().length > 0) {
      this.setState({ inputValue });
      this.fetchAndSetSpecificData(inputValue).then(() => this.setState({ isLoading: false }));
    } else {
      this.fetchAndSetAllData().then(() => this.setState({ isLoading: false }));
    }
  }

  onClick = (tab: AvailableTabs) => this.setState({ activeTab: tab });

  onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ inputValue: value });
    window.localStorage.setItem(INPUT_VALUE_KEY, value);
  };

  onKeyDown = async ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      this.setState({ isLoading: true });
      const value = this.state.inputValue;
      if (!!value.trim().length) await this.fetchAndSetSpecificData(value);
      else await this.fetchAndSetAllData();
      this.setState({ isLoading: false });
    }
  };

  fetchAndSetSpecificData = async (value: string) => {
    const type = await fetchPokemonByParameter<PokemonTypeDetails>(`${API.TYPE}/${value}`);
    const move = await fetchPokemonByParameter<PokemonMoveDetails>(`${API.MOVE}/${value}`);
    const pokemon = await fetchPokemonByParameter<PokemonDetails>(`${API.POKEMON}/${value}`);
    this.setState({
      pokemons: pokemon ? [pokemon] : [],
      types: type ? [type] : [],
      moves: move ? [move] : [],
      lengths: {
        pokemons: pokemon ? 1 : 0,
        types: type ? 1 : 0,
        moves: move ? 1 : 0,
      },
    });
  };

  fetchAndSetAllData = async () => {
    const pokemons =
      (await fetchBase<PokemonData, Pokemon>(`${API.POKEMON}${API.POKEMON_LIMIT}`)) ?? [];
    const pokemonDetailed = (await fetchDetails<Pokemon, PokemonDetails>(pokemons)) || [];
    const moves = (await fetchBase<MovesData, PokemonMove>(`${API.MOVE}${API.MOVE_LIMIT}`)) || [];
    const movesDetailed = (await fetchDetails<PokemonMove, PokemonMoveDetails>(moves)) || [];
    const types = (await fetchBase<TypesData, PokemonType>(`${API.TYPE}${API.TYPE_LIMIT}`)) || [];
    const typesDetailed = (await fetchDetails<PokemonType, PokemonTypeDetails>(types)) || [];
    this.setState({
      pokemons: [...pokemonDetailed],
      types: [...typesDetailed],
      moves: [...movesDetailed],
      lengths: {
        pokemons: pokemonDetailed.length,
        types: typesDetailed.length,
        moves: movesDetailed.length,
      },
    });
  };

  render() {
    return (
      <Layout componentName={this.props.componentName} location={this.props.location}>
        <S.SearchPageView>
          <SearchBar
            label="Local Storage Input"
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            inputValue={this.state.inputValue}
            isLoading={this.state.isLoading}
          />
          <Tabs
            onClick={this.onClick}
            isLoading={this.state.isLoading}
            activeTab={this.state.activeTab}
            lengths={this.state.lengths}
            options={tabs}
          />
          <Cards
            isLoading={this.state.isLoading}
            activeTab={this.state.activeTab}
            pokemons={this.state.pokemons}
            types={this.state.types}
            moves={this.state.moves}
          />
        </S.SearchPageView>
      </Layout>
    );
  }
}
