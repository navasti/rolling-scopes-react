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
    const handleClickOutside = ({ target }: MouseEvent) => {
      const current = (ref as RefObject<HTMLDivElement>).current;
      opened && current && !current.contains(target as HTMLElement) && handleCloseModal();
    };
    const callback = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener('click', callback);
    return () => document.removeEventListener('click', callback);
  }, [handleCloseModal, opened, ref]);

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
