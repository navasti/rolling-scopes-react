import { screen, render } from '@testing-library/react';
import { FormCard } from 'modules/Form/components';
import { capitalize } from 'utils';
import { customPokemon } from '__mocks__/data';

describe('FormCard', () => {
  it('should be rendered and match snapshot', () => {
    const { container } = render(<FormCard customPokemon={customPokemon} />);
    expect(screen.getByText(customPokemon.birthday)).toBeVisible();
    expect(screen.getByText(capitalize(customPokemon.name))).toBeVisible();
    expect(screen.getByText(capitalize(customPokemon.gender))).toBeVisible();
    expect(screen.getByText(customPokemon.shiny ? 'Yes' : 'No')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
  it('image should be visible and src set as questionmark.png', () => {
    const { container } = render(<FormCard customPokemon={customPokemon} />);
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'questionmark.png');
    expect(img).toBeVisible();
  });
});
