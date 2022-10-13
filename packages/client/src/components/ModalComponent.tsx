import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import {FC, ReactElement} from 'react';

type ModalComponentProps = {
  show: boolean,
  handleClose: () => void,
  children?: ReactElement
};

export const ModalComponent: FC<ModalComponentProps> = (props) => {
  return (
      <Dialog onClose={props.handleClose} open={props.show}>
        <DialogTitle>Создать новую тему</DialogTitle>
        {props.children}
        <DialogActions>
          <Button onClick={props.handleClose}>Назад</Button>
          <Button onClick={props.handleClose}>Создать</Button>
        </DialogActions>
      </Dialog>
  );
};