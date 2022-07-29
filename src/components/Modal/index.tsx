import { forwardRef, RefObject, useEffect } from 'react';
import { TimesIcon } from 'assets/images/svg';
import * as S from './styled';

type Props = {
  children: [JSX.Element, JSX.Element];
  handleCloseModal: () => void;
  opened: boolean;
};

export const Modal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, opened, handleCloseModal } = props;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const current = (ref as RefObject<HTMLDivElement>).current;
      const target = event.target as HTMLElement;
      opened && current && !current.contains(target) && handleCloseModal();
    };
    document.addEventListener('click', (event) => handleClickOutside(event));
    return () => document.removeEventListener('click', (event) => handleClickOutside(event));
  }, [opened, ref, handleCloseModal]);

  return (
    <>
      {opened && (
        <S.ModalWrapper>
          <S.ModalWindow ref={ref}>
            <S.Header>
              <p>{children[0]}</p>
              <S.CloseButton onClick={() => handleCloseModal()}>
                <TimesIcon />
              </S.CloseButton>
            </S.Header>
            <S.Content>{children[1]}</S.Content>
          </S.ModalWindow>
        </S.ModalWrapper>
      )}
    </>
  );
});
