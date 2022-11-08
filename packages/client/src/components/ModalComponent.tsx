import { Dialog, Button, DialogTitle, DialogActions } from '@mui/material'
import { FC, ReactElement } from 'react'

type ModalComponentProps = {
  show: boolean
  handleClose: () => void
  children?: ReactElement
}

export const ModalComponent: FC<ModalComponentProps> = ({
  handleClose,
  children,
  show,
}) => {
  return (
    <Dialog onClose={handleClose} open={show}>
      <DialogTitle>Создать новую тему</DialogTitle>
      {children}
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
        <Button onClick={handleClose}>Создать</Button>
      </DialogActions>
    </Dialog>
  )
}
