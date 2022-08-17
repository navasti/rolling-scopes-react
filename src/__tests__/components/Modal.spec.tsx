import { fireEvent, render, screen } from '@testing-library/react';
import { handleCloseModal } from '__mocks__/handlers';
import { ModalContent } from '__mocks__/elements';
import { testingTitle } from '__mocks__/data';
import { Modal } from 'components';

const prepareModalElement = (opened: boolean) => (
  <Modal handleCloseModal={handleCloseModal} opened={opened} title={testingTitle}>
    <ModalContent />
  </Modal>
);

describe('Modal', () => {
  beforeAll(() => {
    const div = document.createElement('div');
    div.id = 'modal-root';
    div.dataset.testid = 'modal-mock';
    document.body.appendChild(div);
  });
  afterAll(() => handleCloseModal.mockReset());
  it('modal should be rendered when open prop equals true', () => {
    render(
      <>
        <Modal handleCloseModal={handleCloseModal} opened={true} title={testingTitle}>
          <ModalContent />
        </Modal>
      </>
    );
    expect(screen.getByText(testingTitle)).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
  it('modal should not be rendered when open prop equals false', () => {
    const { container } = render(prepareModalElement(false));
    expect(screen.queryByTestId('modal-content')).toBeNull();
    expect(screen.queryByTestId('modal-title')).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });
  it('close button should be rendered and clicking it should fire handleCloseModal method', () => {
    render(prepareModalElement(true));
    const modal = screen.getByTestId('modal-mock');
    const button = modal.querySelector('button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();
    expect(handleCloseModal).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
  it('clicking outside the modal should fire handleCloseModal method', () => {
    render(prepareModalElement(true));
    const modal = screen.getByTestId('modal-mock');
    expect(handleCloseModal).not.toHaveBeenCalled();
    fireEvent.click(modal.children[0]);
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
  it('modal should match the snapshot', () => {
    render(prepareModalElement(true));
    expect(screen.getByTestId('modal-mock')).toMatchSnapshot();
  });
});
