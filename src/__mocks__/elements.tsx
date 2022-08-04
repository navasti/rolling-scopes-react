import { createRef, RefObject } from 'react';
import { testingContent, testingTitle } from './data';

export const modalRef: RefObject<HTMLDivElement> = createRef();
export const errorRef: RefObject<HTMLSpanElement> = createRef();
export const inputRef: RefObject<HTMLInputElement> = createRef();
export const selectRef: RefObject<HTMLSelectElement> = createRef();

export const TestingElement = () => <p>testing element</p>;
export const TestingErrorElement = () => <p>testing error</p>;

export const ModalTitle = () => <span data-testid="modal-title">{testingTitle}</span>;
export const ModalContent = () => <div data-testid="modal-content">{testingContent}</div>;
