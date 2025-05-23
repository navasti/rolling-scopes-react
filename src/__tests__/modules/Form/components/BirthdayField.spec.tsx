import { screen, render, fireEvent } from '@testing-library/react';
import { BirthdayField } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { createRef } from 'react';

const onChange = jest.fn();
const onBlur = jest.fn();
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { BirthdayField } = jest.requireActual('modules/Form/components/BirthdayField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    BirthdayField,
    Message: ComponentMocks.Message,
  };
});

describe('BirthdayField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <BirthdayField
        name={Fields.birthday}
        maxDate="2022-08-09"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('initially message should be rendered but hidden', () => {
    render(<BirthdayField name={Fields.birthday} onChange={onChange} onBlur={onBlur} ref={ref} />);
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 0 });
  });
  it('should display error message if received valid error prop', () => {
    render(
      <BirthdayField
        name={Fields.birthday}
        error="testing-error"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 1, color: 'red' });
    expect(screen.getByTestId('message-mock')).toHaveTextContent('Testing-error');
  });
  it('should change input value to the one selected by user', () => {
    render(<BirthdayField ref={ref} name={Fields.birthday} onChange={onChange} onBlur={onBlur} />);
    const input = screen.getByLabelText('*Birthday') as HTMLInputElement;
    expect(input).toHaveValue('');
    expect(input.type).toEqual('date');
    fireEvent.change(input, { target: { value: '2000-05-05' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('2000-05-05');
  });
});
