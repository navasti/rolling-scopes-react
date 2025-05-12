import { handleCardSelect, handleOpenModal } from '__mocks__/handlers';
import { screen, render, fireEvent } from '@testing-library/react';
import { typesMock } from '__mocks__/data';

describe.skip('TypeCard', () => {
  jest.useFakeTimers();
  afterEach(() => {
    handleOpenModal.mockReset();
    handleCardSelect.mockReset();
  });
  it('type card should be rendered and match snapshot', () => {
    const { container } = render(<></>);
    // <TypeCard
    //   handleTypeSelect={handleCardSelect}
    //   handleOpenModal={handleOpenModal}
    //   type={typesMock[0]}
    // />
    expect(screen.getByText(typesMock[0].name)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('clicking on card should invoke handleOpenModal and handleTypeSelect methods', () => {
    render(<></>);
    // <TypeCard
    //   handleTypeSelect={handleCardSelect}
    //   handleOpenModal={handleOpenModal}
    //   type={typesMock[0]}
    // />
    expect(handleOpenModal).not.toHaveBeenCalled();
    expect(handleCardSelect).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('type-card'));
    expect(handleCardSelect).toHaveBeenCalledWith(typesMock[0]);
    expect(handleCardSelect).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(handleOpenModal).toHaveBeenCalledWith();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
