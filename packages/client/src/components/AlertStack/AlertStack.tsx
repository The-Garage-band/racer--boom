import { getAlertState } from '@/store/slices/GetAlertSlice'
import { useAppSelector } from '@/hooks'

import Alert from '@/components/Alert'

export default function AlertStack() {

  const { message, type, duration } = useAppSelector(getAlertState)

  if (message) {
    return (
      <Alert message={ message } type={ type } duration={ duration } />
    );
  }

  return;
}
