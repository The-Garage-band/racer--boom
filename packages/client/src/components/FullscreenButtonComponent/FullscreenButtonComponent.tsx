import {FC, MouseEvent, useState} from 'react';
import './FullscreenButtonComponent.less';
import * as FullscreenApi from '@/API/FullscreenApi';

import { useTheme } from '@mui/material/styles';

export const FullscreenButtonComponent: FC = () => {
  const [btnEnabled, setBtnEnabled] = useState(
      FullscreenApi.isFullScreen(),
  );

  const theme = useTheme();

  const onToggle = (e: MouseEvent) => {
    e.preventDefault();
    FullscreenApi.toggleFullScreen();
    if (btnEnabled) {
      setBtnEnabled(false);
    } else {
      setBtnEnabled(true);
    }
  };

  return (
      <div className="fullscreen-block">
      <img src={!btnEnabled ? fullscreenIconOff : fullscreenIconOn}
             onClick={onToggle}/>
      </div>
  );
};