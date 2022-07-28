import React, { ForwardedRef, RefObject } from 'react';
import { TimesIcon } from 'assets/images/svg';
import * as S from './styled';

type Props = {
  handleModalOpened: (isModalOpened: boolean) => void;
  children: [JSX.Element, JSX.Element];
  opened: boolean;
};

export const Modal = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ModalClass innerRef={ref} {...props} />
));

class ModalClass extends React.Component<
  Props & { innerRef: ForwardedRef<HTMLDivElement> },
  unknown
> {
  constructor(props: Props & { innerRef: ForwardedRef<HTMLDivElement> }) {
    super(props);
  }
  componentDidMount() {
    document.addEventListener('click', (event) => this.handleClickOutside(event));
  }
  componentWillUnmount() {
    document.removeEventListener('click', (event) => this.handleClickOutside(event));
  }
  handleClickOutside = (event: MouseEvent) => {
    const current = (this.props.innerRef as RefObject<HTMLDivElement>).current;
    const target = event.target as HTMLElement;
    if (this.props.opened && current && !current.contains(target)) {
      this.props.handleModalOpened(false);
    }
  };
  render() {
    const { children, opened, innerRef, handleModalOpened } = this.props;
    return (
      <>
        {opened && (
          <S.ModalWrapper>
            <S.ModalWindow ref={innerRef}>
              <S.Header>
                <p>{children[0]}</p>
                <S.CloseButton onClick={() => handleModalOpened(false)}>
                  <TimesIcon />
                </S.CloseButton>
              </S.Header>
              <S.Content>{children[1]}</S.Content>
            </S.ModalWindow>
          </S.ModalWrapper>
        )}
      </>
    );
  }
}
