import { screen, render, fireEvent } from '@testing-library/react';
import { Fields } from 'appConstants';
import { ConsentField } from 'modules/Form/components';
import { createRef } from 'react';

const onChange = () => Promise.resolve(true);
const onBlur = () => Promise.resolve(true);
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { ConsentField } = jest.requireActual('modules/Form/components/ConsentField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    ConsentField,
    Message: ComponentMocks.Message,
  };
});

describe('ConsentField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <ConsentField name={Fields.consent} onBlur={onBlur} onChange={onChange} ref={ref} />
    );
    expect(container).toMatchSnapshot();
  });
  it('initially message should be rendered but hidden', () => {
    render(<ConsentField name={Fields.consent} onChange={onChange} onBlur={onBlur} ref={ref} />);
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 0 });
  });
  it('should display error message if received valid error prop', () => {
    render(
      <ConsentField
        name={Fields.consent}
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
    render(<ConsentField name={Fields.consent} onChange={onChange} onBlur={onBlur} ref={ref} />);
    const input = screen.getByLabelText('read and accept', { exact: false }) as HTMLInputElement;
    expect(input.type).toEqual('checkbox');
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
});
