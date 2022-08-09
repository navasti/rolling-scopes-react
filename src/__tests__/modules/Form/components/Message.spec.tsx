import { screen, render } from '@testing-library/react';
import { Message } from 'modules/Form/components';
import { MessageType } from 'types';

describe('Message', () => {
  it('provided message should be displayed and match snapshot', () => {
    const { container } = render(
      <Message message="testing-message" type={MessageType.success} visible center={false} />
    );
    expect(screen.getByText('Testing-message')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
  it('color of message should be red for error type message', () => {
    render(<Message message="testing-message" type={MessageType.error} visible center={false} />);
    expect(screen.getByText('Testing-message')).toHaveStyle({ color: 'red' });
  });
  it('color of message should be green for success type message', () => {
    render(<Message message="testing-message" type={MessageType.success} visible center={false} />);
    expect(screen.getByText('Testing-message')).toHaveStyle({ color: 'green' });
  });
  it('message should not be visible if visible prop is equal to false', () => {
    render(
      <Message message="testing-message" type={MessageType.error} visible={false} center={false} />
    );
    expect(screen.getByText('Testing-message')).toHaveStyle({ opacity: 0 });
  });
  it('message should be centered if center prop is equal to true', () => {
    render(<Message message="testing-message" type={MessageType.error} visible center={true} />);
    expect(screen.getByText('Testing-message')).toHaveStyle({ textAlign: 'center' });
  });
});
