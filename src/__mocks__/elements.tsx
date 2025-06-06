import { testingContent, testingTitle } from './data';
import { forwardRef } from 'react';
import { capitalize } from 'utils';
import {
  PokemonTypeDetails,
  PokemonMoveDetails,
  PokemonDetails,
  SearchBarProps,
  CustomPokemon,
  MessageProps,
  LayoutProps,
  MessageType,
  CardsProps,
  TabsProps,
} from 'types';

export const ModalTitle = () => <span data-testid="modal-title">{testingTitle}</span>;
export const ModalContent = () => <div data-testid="modal-content">{testingContent}</div>;

export type ModalProps = {
  handleCloseModal: () => void;
  children: JSX.Element;
  opened: boolean;
  title: string;
};

export const ComponentMocks = {
  Layout: ({ componentName, children, location }: LayoutProps) => (
    <div>
      <p>
        <span data-testid="component-mock">{componentName}</span>
        <span data-testid="location-mock">{location}</span>
      </p>
      <main>{children}</main>
    </div>
  ),
  SearchBar: ({ onChange, onKeyDown }: SearchBarProps) => (
    <div>
      <div>
        <label htmlFor="input-mock">testing label</label>
        <svg />
        <input
          data-testid="input-mock"
          value="testing-value"
          onKeyDown={onKeyDown}
          onChange={onChange}
          id="input-mock"
          type="text"
        />
      </div>
      <div>
        <span>Type and press enter to search for specific pokemon, type or move.</span>
        <span>Clear input and press enter to search for all pokemons, types and moves.</span>
      </div>
    </div>
  ),
  Tabs: ({ isLoading }: TabsProps) => (
    <div>
      <span data-testid="pokemons-length-mock">pokemons {isLoading ? null : `(1)`}</span>
      <span data-testid="moves-length-mock">moves {isLoading ? null : `(1)`}</span>
      <span data-testid="types-length-mock">types {isLoading ? null : `(1)`}</span>
    </div>
  ),
  Cards: (props: CardsProps) => (
    <div data-testid="cards-mock">
      {props.isLoading ? (
        <p>loading</p>
      ) : (
        <div>
          <p>{props.types[0].name}</p>
          <p>{props.moves[0].name}</p>
          <p>{props.pokemons[0].name}</p>
        </div>
      )}
    </div>
  ),
  Modal: ({ title, children, opened, handleCloseModal }: ModalProps) =>
    opened && (
      <div>
        <header>
          <p data-testid="details-title-mock">{title}</p>
          <button onClick={handleCloseModal}>
            <svg></svg>
          </button>
        </header>
        <div data-testid="details-content-mock">{children}</div>
      </div>
    ),
  MoveModalContent: ({ selectedMove }: { selectedMove: PokemonMoveDetails }) => (
    <span>{selectedMove.id}</span>
  ),
  PokemonModalContent: ({ selectedPokemon }: { selectedPokemon: PokemonDetails }) => (
    <span>{selectedPokemon.id}</span>
  ),
  TypeModalContent: ({ selectedType }: { selectedType: PokemonTypeDetails }) => (
    <span>{selectedType.id}</span>
  ),
  FormCard: ({ customPokemon }: { customPokemon: CustomPokemon }) => (
    <div data-testid="form-card-mock">
      <div>
        <img src="questionmark.png" />
      </div>
      <div>
        <p>
          Name :<span>{capitalize(customPokemon.name)}</span>
        </p>
        <p>
          Gender :<span>{capitalize(customPokemon.gender)}</span>
        </p>
        <p>
          Main type :<span>{capitalize(customPokemon.type)}</span>
        </p>
        <p>
          Birthday :<span>{capitalize(customPokemon.birthday)}</span>
        </p>
        <p>
          Shiny :<span>{customPokemon.shiny ? 'Yes' : 'No'}</span>
        </p>
      </div>
    </div>
  ),
  Message: ({ message, type, visible, center }: MessageProps) => (
    <span
      data-testid="message-mock"
      style={{
        opacity: visible ? '1' : '0',
        textAlign: center ? 'center' : 'left',
        color: type === MessageType.error ? 'red' : 'green',
      }}
    >
      {message && capitalize(message)}
    </span>
  ),
  BirthdayField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="birth">
      <input id="birth" ref={ref} type="date" onChange={onChange} data-testid="birth-mock" />
    </label>
  )),
  ConsentField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="consent">
      <input
        ref={ref}
        id="consent"
        type="checkbox"
        onChange={onChange}
        data-testid="consent-mock"
      />
    </label>
  )),
  AvatarField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="avatar">
      <input type="file" id="avatar" data-testid="avatar-mock" ref={ref} onChange={onChange} />
    </label>
  )),
  ShinyField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="shiny">
      <input ref={ref} id="shiny" type="checkbox" onChange={onChange} data-testid="shiny-mock" />
    </label>
  )),
  GenderField: forwardRef<HTMLInputElement, { onChange: () => void; value: string }>(
    ({ onChange, value }, ref) => (
      <label htmlFor="gender">
        <input
          ref={ref}
          id="gender"
          type="radio"
          value={value}
          onChange={onChange}
          data-testid="gender-mock"
        />
      </label>
    )
  ),
  TypeField: forwardRef<HTMLSelectElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="type">
      <select id="type" ref={ref} onChange={onChange} data-testid="type-mock"></select>
    </label>
  )),
  NameField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="name">
      <input id="name" ref={ref} type="text" onChange={onChange} data-testid="name-mock" />
    </label>
  )),
};
