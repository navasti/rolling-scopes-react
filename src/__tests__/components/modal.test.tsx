import { ModalContent, ModalTitle, modalRef, handleCloseModal } from '__mocks__';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from 'components';

const prepareModalElement = (opened: boolean) => (
  <Modal handleCloseModal={handleCloseModal} opened={opened} ref={modalRef}>
    <ModalTitle />
    <ModalContent />
  </Modal>
);

describe('Modal', () => {
  afterEach(() => handleCloseModal.mockReset());
  it('modal should be rendered when open prop equals true', () => {
    render(prepareModalElement(true));
    expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
  it('modal should not be rendered when open prop equals false', () => {
    const { container } = render(prepareModalElement(false));
    expect(screen.queryByTestId('modal-content')).toBeNull();
    expect(screen.queryByTestId('modal-title')).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });
  it('close button should be rendered and clicking it should fire handleCloseModal method', () => {
    const { container } = render(prepareModalElement(true));
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(handleCloseModal).not.toHaveBeenCalled();
    fireEvent.click(container.querySelector('button') as HTMLButtonElement);
    expect(handleCloseModal).toHaveBeenCalledWith();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
  it('clicking outside the modal should fire handleCloseModal method', () => {
    const { container } = render(prepareModalElement(true));
    expect(handleCloseModal).not.toHaveBeenCalled();
    fireEvent.click(container.children[0]);
    expect(handleCloseModal).toHaveBeenCalledWith();
    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
  it('modal should match the snapshot', () => {
    const { container } = render(prepareModalElement(true));
    expect(container).toMatchSnapshot();
  });
});
