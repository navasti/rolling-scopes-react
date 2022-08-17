import { render, fireEvent } from '@testing-library/react';
import { GenderField } from 'modules/Form/components';
import { FEMALE, Fields, MALE } from 'appConstants';
import { createRef } from 'react';

const onChange = jest.fn();
const onBlur = jest.fn();
const ref = createRef<HTMLInputElement>();

jest.mock('modules/Form/components', () => {
  const { GenderField } = jest.requireActual('modules/Form/components/GenderField');
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    GenderField,
    Message: ComponentMocks.Message,
  };
});

describe('GenderField', () => {
  it('should be rendered with value male and match snapshot', () => {
    const { container } = render(
      <GenderField
        name={Fields.gender}
        onChange={onChange}
        onBlur={onBlur}
        value={MALE}
        ref={ref}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('should be rendered with value female and match snapshot', () => {
    const { container } = render(
      <GenderField
        name={Fields.gender}
        onChange={onChange}
        onBlur={onBlur}
        value={FEMALE}
        ref={ref}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('should change input value to the one selected by user', () => {
    const { container } = render(
      <GenderField
        name={Fields.gender}
        onChange={onChange}
        onBlur={onBlur}
        value={FEMALE}
        ref={ref}
      />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toEqual('radio');
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toBeChecked();
  });
});
