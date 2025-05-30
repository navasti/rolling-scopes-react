import { screen, render, fireEvent } from '@testing-library/react';
import { Fields } from 'appConstants';
import { AvatarField } from 'modules/Form/components';
import { createRef } from 'react';

const onChange = jest.fn();
const onBlur = jest.fn();
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { AvatarField } = jest.requireActual('modules/Form/components/AvatarField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    AvatarField,
    Message: ComponentMocks.Message,
  };
});

const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

describe('AvatarField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <AvatarField ref={ref} name={Fields.avatar} onChange={onChange} onBlur={onBlur} />
    );
    expect(container).toMatchSnapshot();
  });
  it('input value should keep information about selected file', () => {
    render(<AvatarField ref={ref} name={Fields.avatar} onChange={onChange} onBlur={onBlur} />);
    const input = screen.getByLabelText('Avatar') as HTMLInputElement;
    expect(input.type).toEqual('file');
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.files?.[0].name).toEqual('test.png');
    expect(input.files).toHaveLength(1);
  });
  it('initially message should be rendered but hidden', () => {
    render(<AvatarField name={Fields.avatar} onChange={onChange} onBlur={onBlur} ref={ref} />);
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 0 });
  });
  it('should display error message if received valid error prop', () => {
    render(
      <AvatarField
        name={Fields.avatar}
        error="testing-error"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
    expect(screen.getByTestId('message-mock')).toHaveStyle({ opacity: 1, color: 'red' });
    expect(screen.getByTestId('message-mock')).toHaveTextContent('Testing-error');
  });
});
