import { createTheme, responsiveFontSizes } from '@mui/material/styles'

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

    truckCarLink: '/public/game/grey-car.png',
    myCarLink: '/public/game/my-car.png',
    greyCarLink: '/public/game/grey-car.png',
    policeCarLink: '/public/game/police-car.png',
    coinLink: '/public/game/coin.png',
    liveLink: '/public/game/live.png',
    roadLink: '/public/game/doroga.jpg',

    forumBgImage: 'public/msg.png',
    leaderBgImage: 'public/crown.png',
    bgCar: 'public/bg-car.png',
    logo: 'public/logo.png',
    audioSoundOff: 'public/audio/audio-sound-off.png',
    audioSoundOn: 'public/audio/audio-sound-on.png',
    audioSoundNext: 'public/audio/audio-sound-next.png',
    fullscreenIconOff: 'public/fullscreen/fullscreen-icon-off.png',
    fullscreenIconOn: 'public/fullscreen/fullscreen-icon-on.png',
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

    truckCarLink: '/public/light-game/truck.png',
    myCarLink: '/public/light-game/my-car.png',
    greyCarLink: '/public/light-game/grey-car.png',
    policeCarLink: '/public/light-game/police-car.png',
    coinLink: '/public/light-game/coin.png',
    liveLink: '/public/light-game/live.png',
    roadLink: '/public/light-game/doroga.jpg',

    forumBgImage: 'public/msg.png',
    leaderBgImage: 'public/crown.png',
    bgCar: 'public/light-theme/light-bg-car.png',
    logo: 'public/light-theme/logo-light.png',
    audioSoundOff: 'public/light-theme/audio-sound-off-light.png',
    audioSoundOn: 'public/light-theme/audio-sound-on-light.png',
    audioSoundNext: 'public/light-theme/audio-sound-next-light.png',
    fullscreenIconOff: 'public/light-theme/fullscreen-icon-off-light.png',
    fullscreenIconOn: 'public/light-theme/fullscreen-icon-on-light.png',
  })
)

export { themeDefault, lightTheme };