import { testingComponentName, testingLocation } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import { Form } from 'modules';

jest.mock('modules', () => {
  const { ComponentMocks } = require('__mocks__/elements');
  const { Form } = jest.requireActual('modules/Form');

  return {
    __esModule: true,
    Form,
    Layout: ComponentMocks.Layout,
  };
});

jest.mock('modules/Form/components', () => {
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    BirthdayField: ComponentMocks.BirthdayField,
    ConsentField: ComponentMocks.ConsentField,
    AvatarField: ComponentMocks.AvatarField,
    ShinyField: ComponentMocks.ShinyField,
    GenderField: ComponentMocks.GenderField,
    TypeField: ComponentMocks.TypeField,
    NameField: ComponentMocks.NameField,
    FormCard: ComponentMocks.FormCard,
    Message: ComponentMocks.Message,
  };
});

describe.skip('Form', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(
      <Form componentName={testingComponentName} location={testingLocation} />
    );
    expect(screen.getByTestId('component-mock')).toBeVisible();
    expect(screen.getByTestId('location-mock')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
  it('form with all the fields should be displayed', () => {
    render(<Form componentName={testingComponentName} location={testingLocation} />);
    expect(screen.getByTestId('name-mock')).toBeVisible();
    expect(screen.getByTestId('type-mock')).toBeVisible();
    expect(screen.getByTestId('shiny-mock')).toBeVisible();
    expect(screen.getByTestId('consent-mock')).toBeVisible();
    expect(screen.getByTestId('birth-mock')).toBeVisible();
    const genders = screen.getAllByTestId('gender-mock');
    expect(genders[0]).toBeVisible();
    expect(genders[1]).toBeVisible();
  });
});
