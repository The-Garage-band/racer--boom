import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import truckCarImageDark from '/public/game/grey-car.png';
import myCarImageDark from '/public/game/my-car.png';
import greyCarImageDark from '/public/game/grey-car.png';
import policeCarImageDark from '/public/game/police-car.png';
import coinImageDark from '/public/game/coin.png';
import liveImageDark from '/public/game/live.png';
import roadImageDark from '/public/game/doroga.png';
import forumBgImageDark from 'public/msg.png';
import leaderBgImageDark from 'public/crown.png';
import bgCarImageDark from 'public/bg-car.png';
import logoImageDark from 'public/logo.png';
import audioSoundOffImageDark from 'public/audio/audio-sound-off.png';
import audioSoundOnImageDark from 'public/audio/audio-sound-on.png';
import audioSoundNextImageDark from 'public/audio/audio-sound-next.png';
import fullscreenIconOffImageDark from 'public/fullscreen/fullscreen-icon-off.png';
import fullscreenIconOnImageDark from 'public/fullscreen/fullscreen-icon-on.png';

import truckCarImageLight from '/public/light-game/truck.png';
import myCarImageLight from '/public/light-game/my-car.png';
import greyCarImageLight from '/public/light-game/grey-car.png';
import policeCarImageLight from '/public/light-game/police-car.png';
import coinImageLight from '/public/light-game/coin.png';
import liveImageLight from '/public/light-game/live.png';
import roadImageLight from '/public/light-game/doroga.png';
import forumBgImageLight from 'public/msg.png';
import leaderBgImageLight from 'public/crown.png';
import bgCarImageLight from 'public/light-theme/light-bg-car.png';
import logoImageLight from 'public/light-theme/logo-light.png';
import audioSoundOffImageLight from 'public/light-theme/audio-sound-off-light.png';
import audioSoundOnImageLight from 'public/light-theme/audio-sound-on-light.png';
import audioSoundNextImageLight from 'public/light-theme/audio-sound-next-light.png';
import fullscreenIconOffImageLight from 'public/light-theme/fullscreen-icon-off-light.png';
import fullscreenIconOnImageLight from 'public/light-theme/fullscreen-icon-on-light.png';

declare module '@mui/material/styles' {

  interface CustomTheme {
    name?: string;
    
    textShadow?: string;
    backgroudOpacity?: string;
    borderColor?: string;
    borderWidht?: string;
    borderStyle?: string;
    boxShadow?: string;

    truckCarLink?: string;
    myCarLink?: string;
    greyCarLink?: string;
    policeCarLink?: string;
    coinLink?: string;
    liveLink?: string;
    roadLink?: string;

    forumBgImage?: string;
    leaderBgImage?: string;
    bgCar?: string;
    logo?: string;
    audioSoundOff?: string;
    audioSoundOn?: string;
    audioSoundNext?: string;
    fullscreenIconOff?: string;
    fullscreenIconOn?: string;
  }

  interface Theme extends CustomTheme {
    name?: string;

    textShadow?: string;
    backgroudOpacity?: string;
    borderColor?: string;
    borderWidht?: string;
    borderStyle?: string;
    boxShadow?: string;

    truckCarLink?: string;
    myCarLink?: string;
    greyCarLink?: string;
    policeCarLink?: string;
    coinLink?: string;
    liveLink?: string;
    roadLink?: string;

    forumBgImage?: string;
    leaderBgImage?: string;
    bgCar?: string;
    logo?: string;
    audioSoundOff?: string;
    audioSoundOn?: string;
    audioSoundNext?: string;
    fullscreenIconOff?: string;
    fullscreenIconOn?: string;
  }
  interface ThemeOptions extends CustomTheme {
    name?: string;
    
    textShadow?: string;
    backgroudOpacity?: string;
    borderColor?: string;
    borderWidht?: string;
    borderStyle?: string;
    boxShadow?: string;

    truckCarLink?: string;
    myCarLink?: string;
    greyCarLink?: string;
    policeCarLink?: string;
    coinLink?: string;
    liveLink?: string;
    roadLink?: string;

    forumBgImage?: string;
    leaderBgImage?: string;
    bgCar?: string;
    logo?: string;
    audioSoundOff?: string;
    audioSoundOn?: string;
    audioSoundNext?: string;
    fullscreenIconOff?: string;
    fullscreenIconOn?: string;
  }
}

//https://mui.com/material-ui/customization/theming/

const themeDefault = responsiveFontSizes(
  createTheme({
    name: 'dark',
    palette: {
      primary: {
        main: 'rgba(21, 255, 241, 1)',
      },
      secondary: {
        main: '#ffffff',
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff', //#ffffff
        disabled: 'rgba(255,255,255,0.38)',        
      },
      background: {
        default: '#141E30', //#98acd6 141E30
        paper: '#141E30', //#98acd6 141E30
      },
    },
    shape: {
      borderRadius: 8,
    },

    textShadow: '1px 1px 2px #15fff1',
    backgroudOpacity: 'rgba(20, 30, 48, 0.81)',
    borderColor: '#ffffff',
    borderWidht: '2px',
    borderStyle: 'solid',
    boxShadow: '0px 4px 53px rgb(60 193 193 / 51%), inset 0px 4px 100px rgb(60 193 193 / 20%)',

    truckCarLink: truckCarImageDark,
    myCarLink: myCarImageDark,
    greyCarLink: greyCarImageDark,
    policeCarLink: policeCarImageDark,
    coinLink: coinImageDark,
    liveLink: liveImageDark,
    roadLink: roadImageDark,

    forumBgImage: forumBgImageDark,
    leaderBgImage: leaderBgImageDark,
    bgCar: bgCarImageDark,
    logo: logoImageDark,
    audioSoundOff: audioSoundOffImageDark,
    audioSoundOn: audioSoundOnImageDark,
    audioSoundNext: audioSoundNextImageDark,
    fullscreenIconOff: fullscreenIconOffImageDark,
    fullscreenIconOn: fullscreenIconOnImageDark,
  })
)

const lightTheme = responsiveFontSizes( createTheme({
    name: 'light',
    palette: {
      primary: {
        main: '#fad201'
      },
      secondary: {
        main: '#555555',
      },
      text: {
        primary: '#333333',
        secondary: '#fad201', //#ffffff
        disabled: 'rgba(100,100,100,0.38)',
      },
      background: {
        default: '#808080', //#98acd6 141E30
        paper: '#808080', //#98acd6 141E30
      },
    },
    shape: {
      borderRadius: 8,
    },

    textShadow: '0px 0px 0px',
    backgroudOpacity: 'rgba(128, 128, 128, 0.81)',
    borderColor: '#ffffff',
    borderWidht: '5px',
    borderStyle: 'dashed',
    boxShadow: '0px 0px 0px',    

    truckCarLink: truckCarImageLight,
    myCarLink: myCarImageLight,
    greyCarLink: greyCarImageLight,
    policeCarLink: policeCarImageLight,
    coinLink: coinImageLight,
    liveLink: liveImageLight,
    roadLink: roadImageLight,

    forumBgImage: forumBgImageLight,
    leaderBgImage: leaderBgImageLight,
    bgCar: bgCarImageLight,
    logo: logoImageLight,
    audioSoundOff: audioSoundOffImageLight,
    audioSoundOn: audioSoundOnImageLight,
    audioSoundNext: audioSoundNextImageLight,
    fullscreenIconOff: fullscreenIconOffImageLight,
    fullscreenIconOn: fullscreenIconOnImageLight,
  })
)

export { themeDefault, lightTheme };