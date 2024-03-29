import { Random } from '@/utils'
import { SOUNDS } from '@/services/audio-service/sounds'
import { DataStorage } from '@/utils/data-storage'
import crushSound from '/game/crush.mp3';
import repareSound from '/game/repare.mp3';
import gameOverSound from '/game/gameover.mp3';
import collectCoinSound from '/game/collectcoin.mp3';

const AUDIO_ELEMENT_ID = 'audio-service-element-tag'

type AudioServiceStorageData = {
  enabled: boolean
  currentSound: string
  volume: number
}

const INITIAL_DATA: AudioServiceStorageData = {
  enabled: true,
  currentSound: SOUNDS[0],
  volume: 0.2,
}

export class AudioService {
  private static __instance?: AudioService
  private _audio: HTMLAudioElement | undefined = undefined;
  private _soundQueue: string[]
  private _storage: DataStorage<AudioServiceStorageData>
  private _currentSoundIndex = 0

  public static getInstance(): AudioService {
    if (!this.__instance) {
      this.__instance = new AudioService()
    }

    return this.__instance
  }

  private constructor() {
    this._storage = new DataStorage('audio-service', INITIAL_DATA)
    const currentSound = this._storage.get<string | null>('currentSound')
    if (currentSound && SOUNDS.includes(currentSound)) {
      const filteredSound = Random.shuffleArray(
        SOUNDS.filter(sound => sound !== currentSound)
      )
      this._soundQueue = [currentSound, ...filteredSound]
    } else {
      this._soundQueue = Random.shuffleArray(SOUNDS)
    }

    if (typeof window !== 'undefined' && window.document) {
      let audio = document.querySelector<HTMLAudioElement>(`#${AUDIO_ELEMENT_ID}`)
      if (!audio) {
        audio = new Audio()
        audio.id = AUDIO_ELEMENT_ID
        audio.crossOrigin = "anonymous"
        audio.onended = this.next
        document.head.appendChild(audio)
      }
      this._audio = audio
      this._audio.autoplay = true
      this._audio.src = `sounds/${this._soundQueue[this._currentSoundIndex]}.mp3`
      this.updateVolume(this._storage.get('volume'))
    }
  }

  public off() {
    this._storage.set('enabled', false)
    if (this._audio) {
      this._audio.pause();
    }
  }

  public on() {
    this._storage.set('enabled', true)
    this.start()
  }

  public start() {
    if (this.isEnabled()) {
      this._play()
    }
  }

  public updateVolume(value: number) {
    if (this._audio) {
      this._audio.volume = value
    }
    this._storage.set('volume', value)
  }

  public isEnabled(): boolean {
    return this._storage.get<boolean>('enabled') && !!this._audio;
  }

  public get volume(): number {
    return this._storage.get('volume')
  }

  public get progress(): number {
    if (this._audio) {
      const progress = this._audio.currentTime / this._audio.duration
      return Number.isNaN(progress) ? 0 : progress
    }
    else {
      return 0;
    }
  }

  public get duration(): number {
    if (!this._audio) {
      return 0;
    }

    return this._audio.duration
  }

  public get currentTime(): number {
    if (!this._audio) {
      return 0;
    }
    return this._audio.currentTime
  }

  public get currentSound(): string {
    return this._soundQueue[this._currentSoundIndex]
  }

  public updateProgress(newProgress: number) {
    if (!this._audio) {
      return;
    }

    this._audio.currentTime = newProgress * this._audio.duration
    if (this._audio.currentTime >= this._audio.duration) {
      this.next()
    }
  }

  public next = () => {
    if (!this.isEnabled()) return
    if (!this._audio) {
      return;
    }
    this._audio.pause()

    this._currentSoundIndex =
      (this._currentSoundIndex + 1) % this._soundQueue.length
    if (this._currentSoundIndex === 0) {
      // Для того чтобы трек не повторялся
      const lastSound = this._soundQueue[this._soundQueue.length - 1]
      this._soundQueue = SOUNDS.filter(sound => sound !== lastSound)
      this._soundQueue.splice(
        Random.randomInt(1, this._soundQueue.length),
        0,
        lastSound
      )
    }
    const currentSound = this._soundQueue[this._currentSoundIndex]
    this._storage.set('currentSound', currentSound)
    this._audio.src = `sounds/${currentSound}.mp3`
    this._play()
  }

  private _play = () => {
    if (this._audio) {
      this._audio.play()?.catch(() => setTimeout(this._play, 100))
    }
  }

  public playEffect (source: string) {
    if (this.isEnabled()) {
      const audio = new Audio(source);
      audio.play()
        .then(() => audio.remove());
    }
  }

  public playCoinEffect () {
    this.playEffect(collectCoinSound);
  }

  public playRepairEffect () {
    this.playEffect(repareSound);
  }

  public playGameOverEffect () {
    this.playEffect(gameOverSound);
  }

  public playCrushEffect () {
    this.playEffect(crushSound);
  }
}
