import { screen, render, fireEvent } from '@testing-library/react';
import { ShinyField } from 'modules/Form/components';
import { Fields } from 'appConstants';
import { createRef } from 'react';

const onChange = () => Promise.resolve(true);
const onBlur = () => Promise.resolve(true);
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { ShinyField } = jest.requireActual('modules/Form/components/ShinyField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    ShinyField,
    Message: ComponentMocks.Message,
  };
});

describe('ShinyField', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <ShinyField name={Fields.shiny} onBlur={onBlur} onChange={onChange} ref={ref} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should change input value to the one selected by user', () => {
    render(<ShinyField name={Fields.shiny} onChange={onChange} onBlur={onBlur} ref={ref} />);
    const input = screen.getByLabelText('') as HTMLInputElement;
    expect(screen.getByText('Shiny')).toBeVisible();
    expect(input.type).toEqual('checkbox');
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
});
