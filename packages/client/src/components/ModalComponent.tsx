import { Dialog, DialogTitle } from '@mui/material'
import { FC, ReactElement } from 'react'

type ModalComponentProps = {
  show: boolean
  dialogTitle: string
  handleClose: () => void
  children?: ReactElement
}

export const ModalComponent: FC<ModalComponentProps> = ({
  dialogTitle,
  handleClose,
  children,
  show,
}) => {
  return (
    <Dialog onClose={handleClose} open={show}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {children}
    </Dialog>
  )
}
