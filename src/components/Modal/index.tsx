import { TimesIcon } from 'assets/images/svg';
import { createPortal } from 'react-dom';
import * as S from './styled';

type Props = {
  handleCloseModal: () => void;
  children: JSX.Element;
  opened: boolean;
  title: string;
};

export const Modal = ({ title, children, opened, handleCloseModal }: Props) => {
  return createPortal(
    <>
      {opened && (
        <S.ModalWrapper onClick={handleCloseModal}>
          <S.ModalWindow onClick={(event) => event.stopPropagation()}>
            <S.Header>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.CloseButton onClick={handleCloseModal}>
                <TimesIcon />
              </S.CloseButton>
            </S.Header>
            <S.Content>{children}</S.Content>
          </S.ModalWindow>
        </S.ModalWrapper>
      )}
    </>,
    document.getElementById('modal-root') as HTMLDivElement
  );
};
