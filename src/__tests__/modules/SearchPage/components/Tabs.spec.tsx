import { screen, render, fireEvent } from '@testing-library/react';
import { expectByText, onTabClick } from '__mocks__/handlers';
import { Tabs } from 'modules/SearchPage/components';
import { AvailableTabs } from 'appConstants';
import { TABS } from 'appConstants';

describe.skip('Tabs', () => {
  afterEach(() => expectByText.mockReset());
  it('tabs should match snapshot and display lengths if isLoading prop equal false', () => {
    const { container } = render(
      <Tabs
        activeTab={AvailableTabs.pokemons}
        onClick={onTabClick}
        lengths={lengths}
        isLoading={false}
        options={TABS}
      />
    );
    for (const length in lengths) {
      const key = length as keyof typeof lengths;
      TABS.forEach((tab) => tab === key && expectByText(`${tab} (${lengths[key]})`));
    }
    expect(expectByText).toHaveBeenCalledTimes(TABS.length);
    expect(container).toMatchSnapshot();
  });
  it('tabs should match snapshot and should not display lengths if isLoading prop equals true', () => {
    const { container } = render(
      <Tabs
        activeTab={AvailableTabs.pokemons}
        onClick={onTabClick}
        lengths={lengths}
        isLoading={true}
        options={TABS}
      />
    );
    TABS.forEach((tab) => expect(screen.getByText(tab)).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });
  it('clicking on tab should invoke onClick method', () => {
    const { container } = render(
      <Tabs
        activeTab={AvailableTabs.pokemons}
        onClick={onTabClick}
        lengths={lengths}
        isLoading={true}
        options={TABS}
      />
    );
    const spans = container.querySelectorAll('span');
    spans.forEach((span) => {
      fireEvent.click(span);
      expect(onTabClick).toBeCalledWith(span.textContent?.trim());
    });
    expect(onTabClick).toBeCalledTimes(spans.length);
    expect(spans.length).toEqual(TABS.length);
  });
});
