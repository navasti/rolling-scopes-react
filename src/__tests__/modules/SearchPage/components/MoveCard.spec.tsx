import { handleOpenModal, handleCardSelect } from '__mocks__/handlers';
import { screen, render, fireEvent } from '@testing-library/react';
import { movesMock } from '__mocks__/data';

describe.skip('MoveCard', () => {
  jest.useFakeTimers();
  afterEach(() => {
    handleOpenModal.mockReset();
    handleCardSelect.mockReset();
  });
  it('move card should be rendered and match snapshot', () => {
    const { container } = render(<></>);
    // <MoveCard
    //   handleMoveSelect={handleCardSelect}
    //   handleOpenModal={handleOpenModal}
    //   move={movesMock[0]}
    // />
    expect(screen.getByText(movesMock[0].name)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('clicking on card should invoke handleOpenModal and handleMoveSelect methods', () => {
    render(<></>);
    // <MoveCard
    //   handleMoveSelect={handleCardSelect}
    //   handleOpenModal={handleOpenModal}
    //   move={movesMock[0]}
    // />
    expect(handleOpenModal).not.toHaveBeenCalled();
    expect(handleCardSelect).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('move-card'));
    expect(handleCardSelect).toHaveBeenCalledWith(movesMock[0]);
    expect(handleCardSelect).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(handleOpenModal).toHaveBeenCalledWith();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
