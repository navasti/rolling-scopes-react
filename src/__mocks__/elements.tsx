import { createRef, forwardRef, RefObject } from 'react';
import { testingContent, testingTitle } from './data';
import { MALE, POKEMON_TYPES } from 'appConstants';
import { capitalize } from 'utils';
import {
  SearchBarProps,
  MessageProps,
  LayoutProps,
  MessageType,
  CardsProps,
  TabsProps,
  CustomPokemon,
} from 'types';

export const modalRef: RefObject<HTMLDivElement> = createRef();
export const errorRef: RefObject<HTMLSpanElement> = createRef();
export const inputRef: RefObject<HTMLInputElement> = createRef();
export const selectRef: RefObject<HTMLSelectElement> = createRef();

export const ModalTitle = () => <span data-testid="modal-title">{testingTitle}</span>;
export const ModalContent = () => <div data-testid="modal-content">{testingContent}</div>;

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
  SearchBar: ({ onChange, onKeyDown }: SearchBarProps) => {
    return (
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
    );
  },
  Tabs: ({ isLoading, lengths }: TabsProps) => (
    <div>
      <span data-testid="pokemons-length-mock">
        pokemons {isLoading ? null : `(${lengths.moves})`}
      </span>
      <span data-testid="moves-length-mock">moves {isLoading ? null : `(${lengths.moves})`}</span>
      <span data-testid="types-length-mock">types {isLoading ? null : `(${lengths.types})`}</span>
    </div>
  ),
  Cards: (props: CardsProps) => {
    return (
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
    );
  },
  FormCard: ({ customPokemon }: { customPokemon: CustomPokemon }) => {
    const { name, gender, type, birthday, shiny } = customPokemon;
    return (
      <div data-testid="form-card-mock">
        <div>
          <img src="questionmark.png" />
        </div>
        <div>
          <p>
            Name :<span>{capitalize(name)}</span>
          </p>
          <p>
            Gender :<span>{capitalize(gender)}</span>
          </p>
          <p>
            Main type :<span>{capitalize(type)}</span>
          </p>
          <p>
            Birthday :<span>{capitalize(birthday)}</span>
          </p>
          <p>
            Shiny :<span>{shiny ? 'Yes' : 'No'}</span>
          </p>
        </div>
      </div>
    );
  },
  Message: ({ message, type, visible, center }: MessageProps) => {
    return (
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
    );
  },
  BirthdayField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="birth" data-testid="birth-mock">
      <input id="birth" type="date" ref={ref} value="2000-02-02" onChange={onChange} />
    </label>
  )),
  ConsentField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="consent" data-testid="consent-mock">
      <input type="checkbox" id="consent" ref={ref} checked onChange={onChange} />
    </label>
  )),
  AvatarField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="avatar" data-testid="avatar-mock">
      <input type="file" id="avatar" ref={ref} onChange={onChange} />
    </label>
  )),
  ShinyField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="shiny" data-testid="shiny-mock">
      <input type="checkbox" id="shiny" ref={ref} onChange={onChange} checked />
    </label>
  )),
  GenderField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="gender" data-testid="gender-mock">
      <input type="radio" id="gender" ref={ref} value={MALE} onChange={onChange} />
    </label>
  )),
  TypeField: forwardRef<HTMLSelectElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="type" data-testid="type-mock">
      <select id="type" ref={ref} value={POKEMON_TYPES[0]} onChange={onChange}></select>
    </label>
  )),
  NameField: forwardRef<HTMLInputElement, { onChange: () => void }>(({ onChange }, ref) => (
    <label htmlFor="name" data-testid="name-mock">
      <input type="text" id="name" ref={ref} value="charmander" onChange={onChange} />
    </label>
  )),
};
