import { TimesIcon } from 'assets/images/svg';
import { createPortal } from 'react-dom';
import * as S from './styled';

type Props = {
  handleModalOpened: (isModalOpened: boolean) => void;
  children: [JSX.Element, JSX.Element];
  opened: boolean;
};

export const Modal = ({ children, opened, handleModalOpened }: Props) => {
  return createPortal(
    <>
      {opened && (
        <S.ModalWrapper onClick={() => handleModalOpened(false)}>
          <S.ModalWindow onClick={(event) => event.stopPropagation()}>
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
    </>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};
