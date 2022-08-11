import { TimesIcon } from 'assets/images/svg';
import { createPortal } from 'react-dom';
import * as S from './styled';

type Props = {
  children: [JSX.Element, JSX.Element];
  handleCloseModal: () => void;
  opened: boolean;
};

export const Modal = ({ children, opened, handleCloseModal }: Props) => {
  return createPortal(
    <>
      {opened && (
        <S.ModalWrapper onClick={handleCloseModal}>
          <S.ModalWindow onClick={(event) => event.stopPropagation()}>
            <S.Header>
              <p>{children[0]}</p>
              <S.CloseButton onClick={handleCloseModal}>
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
