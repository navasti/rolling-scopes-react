import { screen, render, fireEvent } from '@testing-library/react';
import { NameField } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { createRef } from 'react';

const onChange = jest.fn();
const onBlur = jest.fn();
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { NameField } = jest.requireActual('modules/Form/components/NameField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    NameField,
    Message: ComponentMocks.Message,
  };
});

describe('NameField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <NameField name={Fields.name} onBlur={onBlur} onChange={onChange} ref={ref} />
    );
    expect(container).toMatchSnapshot();
  });
  it('initially message should be rendered but hidden', () => {
    render(<NameField name={Fields.name} onChange={onChange} onBlur={onBlur} ref={ref} />);
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 0 });
  });
  it('should display error message if received valid error prop', () => {
    render(
      <NameField
        error="testing-error"
        onChange={onChange}
        name={Fields.name}
        onBlur={onBlur}
        ref={ref}
      />
    );
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 1, color: 'red' });
    expect(screen.getByTestId('message-mock')).toHaveTextContent('Testing-error');
  });
  it('should change input value to the one selected by user', () => {
    render(<NameField name={Fields.name} onChange={onChange} onBlur={onBlur} ref={ref} />);
    const input = screen.getByLabelText('*Name') as HTMLInputElement;
    expect(input).toHaveValue('');
    expect(input.type).toEqual('text');
    fireEvent.change(input, { target: { value: 'testing-value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('testing-value');
  });
});
