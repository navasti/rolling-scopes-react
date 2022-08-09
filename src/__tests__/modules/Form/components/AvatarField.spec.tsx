import { screen, render, fireEvent } from '@testing-library/react';
import { Fields } from 'appConstants';
import { AvatarField } from 'modules/Form/components';
import { createRef } from 'react';

const onChange = () => Promise.resolve(true);
const onBlur = () => Promise.resolve(true);
const ref = createRef<HTMLInputElement>();

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
    expect(input.files?.[0].name).toEqual('test.png');
    expect(input.files).toHaveLength(1);
  });
});
