import {FC, MouseEvent, useState} from 'react';
import fullscreenIconOff from 'public/fullscreen/fullscreen-icon-off.png'
import fullscreenIconOn from 'public/fullscreen/fullscreen-icon-on.png'
import './FullscreenButtonComponent.less';
import * as FullscreenApi from '@/API/FullscreenApi';

export const FullscreenButtonComponent: FC = () => {
  const [btnEnabled, setBtnEnabled] = useState(
      FullscreenApi.isFullScreen(),
  );

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