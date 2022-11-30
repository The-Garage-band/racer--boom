import { FC, useState, MouseEvent, useEffect, ChangeEvent, useRef } from 'react'
import { AudioService } from '@/services'
import './AudioSetup.less'

import { useTheme } from '@mui/material/styles';

const MAX_VOLUME_INPUT_VALUE = 100
const MAX_PROGRESS_INPUT_VALUE = 500

const getFormattedTimeString = (time: number) => {
  const seconds = Number.isNaN(time) ? 0 : Math.floor(time) % 60
  const minutes = Number.isNaN(time) ? 0 : Math.floor(time / 60)

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export const AudioSetup: FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(
    AudioService.getInstance().isEnabled()
  )
  const [volume, setVolume] = useState(
    AudioService.getInstance().volume * MAX_VOLUME_INPUT_VALUE
  )
  const [progress, setProgress] = useState(
    AudioService.getInstance().progress * MAX_PROGRESS_INPUT_VALUE
  )
  const [currentTime, setCurrentTime] = useState(
    AudioService.getInstance().currentTime
  )
  const [duration, setDuration] = useState(AudioService.getInstance().duration)
  const [collapsed, setCollapsed] = useState(false)
  const [currentSound, setCurrentSound] = useState(
    AudioService.getInstance().currentSound
  )

  const soundNameContainer = useRef<HTMLDivElement>(null)
  const soundNameValue = useRef<HTMLParagraphElement>(null)

  const theme = useTheme();

  useEffect(() => AudioService.getInstance().start(), [])
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setProgress(
          Math.floor(
            AudioService.getInstance().progress * MAX_PROGRESS_INPUT_VALUE
          )
        ),
      100
    )

    return () => clearInterval(intervalId)
  })
  useEffect(() => {
    setCurrentTime(AudioService.getInstance().currentTime)
    setDuration(AudioService.getInstance().duration)
    setCurrentSound(AudioService.getInstance().currentSound)
  }, [progress])
  useEffect(() => {
    if (soundNameContainer.current && soundNameValue.current) {
      if (
        soundNameContainer.current.clientWidth <
        soundNameValue.current.scrollWidth
      ) {
        soundNameValue.current.classList.add('sound-name-animated')
      } else {
        soundNameValue.current.classList.remove('sound-name-animated')
      }
    }
  }, [collapsed, currentSound, soundNameValue, soundNameContainer])

  const onToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (soundEnabled) {
      AudioService.getInstance().off()
      setSoundEnabled(false)
    } else {
      AudioService.getInstance().on()
      setSoundEnabled(true)
    }
  }
  const onNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    AudioService.getInstance().next()
  }
  const onChangeVolume = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newVolume = parseInt(event.target.value)
    AudioService.getInstance().updateVolume(newVolume / MAX_VOLUME_INPUT_VALUE)
    setVolume(newVolume)
  }
  const onChangeDuration = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newProgress = parseInt(event.target.value)
    AudioService.getInstance().updateProgress(
      newProgress / MAX_PROGRESS_INPUT_VALUE
    )
    setProgress(newProgress)
  }
  const onCollapse = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setCollapsed(!collapsed)
  }

  return (
    <div className="audio-setup">
      <button className="toggle button" onClick={onToggle}>
        <img src={soundEnabled ? theme.audioSoundOn : theme.audioSoundOff} alt="" />
      </button>
      <button
        className={`collapse button ${collapsed ? 'collapse-active' : ''}`}
        onClick={onCollapse}>
        <img src={theme.audioSoundNext} />
      </button>
      <div
        className={`collapse-content ${
          collapsed ? 'collapse-content-active' : ''
        }`} style={{
          backgroundColor: theme.backgroudOpacity, 
          borderColor: theme.borderColor,
          borderStyle: theme.borderStyle, 
          boxShadow: theme.boxShadow
        }}>
        <input
          className="volume"
          onChange={onChangeVolume}
          type="range"
          min="0"
          max={MAX_VOLUME_INPUT_VALUE}
          value={volume} 
          style={{
            backgroundColor: theme.backgroudOpacity
          }}
        />
        <span className="volume-value">{volume}%</span>
        <button className="next button" onClick={onNext}>
          <img src={theme.audioSoundNext} />
        </button>
        <span className="current-time">
          {getFormattedTimeString(currentTime)}
        </span>
        <input
          className="duration"
          onChange={onChangeDuration}
          type="range"
          min="0"
          max={MAX_PROGRESS_INPUT_VALUE}
          value={progress}
        />
        <span className="end-time">{getFormattedTimeString(duration)}</span>
        <div ref={soundNameContainer} className="sound-name-container">
          <p ref={soundNameValue} className="sound-name">
            {currentSound}
          </p>
        </div>
      </div>
    </div>
  )
}
