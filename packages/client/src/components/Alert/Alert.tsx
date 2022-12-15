import { useState, SyntheticEvent, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

export interface IAlert {
  message: string
  duration?: number
  type?: AlertColor
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props: IAlert) {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { message, duration = 3000, type = 'success' } = props;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'top'}}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          { message }
        </Alert>
      </Snackbar>
    </Stack>
  );
}
