import { screen, render, fireEvent } from '@testing-library/react';
import { TypeField } from 'modules/Form/components';
import { Fields, POKEMON_TYPES } from 'appConstants';
import { createRef } from 'react';

const onChange = () => Promise.resolve(true);
const onBlur = () => Promise.resolve(true);
const ref = createRef<HTMLSelectElement>();

jest.mock('modules/Form/components', () => {
  const { TypeField } = jest.requireActual('modules/Form/components/TypeField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    TypeField,
    Message: ComponentMocks.Message,
  };
});

describe('TypeField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <TypeField name={Fields.type} onBlur={onBlur} onChange={onChange} ref={ref} />
    );
    expect(container).toMatchSnapshot();
  });
  it('initially message should be rendered but hidden', () => {
    render(<TypeField name={Fields.type} onChange={onChange} onBlur={onBlur} ref={ref} />);
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 0 });
  });
  it('should display error message if received valid error prop', () => {
    render(
      <TypeField
        error="testing-error"
        onChange={onChange}
        name={Fields.type}
        onBlur={onBlur}
        ref={ref}
      />
    );
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 1, color: 'red' });
    expect(screen.getByTestId('message-mock')).toHaveTextContent('Testing-error');
  });
  it('should change input value to the one selected by user', () => {
    render(<TypeField name={Fields.type} onChange={onChange} onBlur={onBlur} ref={ref} />);
    const select = screen.getByLabelText('*Main type') as HTMLSelectElement;
    expect(select).toHaveValue('');
    fireEvent.change(select, { target: { value: POKEMON_TYPES[0] } });
    expect(select.children.length).toEqual(POKEMON_TYPES.length + 1);
    expect(select).toHaveValue(POKEMON_TYPES[0]);
  });
});
