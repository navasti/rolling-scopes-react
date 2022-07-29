import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from 'components';
import {
  TestingContentElement,
  TestingTitleElement,
  testingContent,
  testingTitle,
  modalRef,
} from '__mocks__';

describe('Modal', () => {
  it('Render opened modal', () => {
    let opened = true;
    const { container } = render(
      <Modal handleCloseModal={() => (opened = false)} opened={opened} ref={modalRef}>
        <TestingTitleElement />
        <TestingContentElement />
      </Modal>
    );
    const closeButton = container.querySelector('button') as HTMLButtonElement;
    expect(screen.getByText(testingContent)).toBeInTheDocument();
    expect(screen.getByText(testingTitle)).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(opened).toBeFalsy();
  });
  it('Render closed modal', () => {
    const { container } = render(
      <Modal handleCloseModal={() => {}} opened={false}>
        <TestingTitleElement />
        <TestingContentElement />
      </Modal>
    );
    expect(container.children.length).toEqual(0);
  });
});
