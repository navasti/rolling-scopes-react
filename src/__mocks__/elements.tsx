import { testingContent, testingTitle } from './data';
import { createRef, RefObject } from 'react';
import { CardsProps, LayoutProps, SearchBarProps, TabsProps } from 'types';

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
};
