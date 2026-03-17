import { create } from 'zustand'
import { soundManager } from './SoundManager'

// Module-level variable — storing it here means changing it never triggers a re-render
let intervalId: ReturnType<typeof setInterval> | null = null

interface PixelPotState {
  timeLeft: number
  timerRunning: boolean
  plantStage: number

  startTimer: () => void
  pauseTimer: () => void
  reset: () => void
  setTimeLeft: (seconds: number) => void
  adjustTime: (seconds: number) => void
}

export const useStore = create<PixelPotState>((set, get) => ({
  timeLeft: 1500,
  timerRunning: false,
  plantStage: 1,

  startTimer: () => {
    // Prevent multiple intervals from stacking
    if (intervalId !== null) return

    soundManager.playClick()
    set({ timerRunning: true })

    intervalId = setInterval(() => {
      // Always read fresh state — avoids stale closures
      const { timeLeft } = get()

      if (timeLeft <= 1) {
        // Pomodoro complete
        soundManager.playAlarm()
        clearInterval(intervalId!)
        intervalId = null
        set({
          timeLeft: 1500,
          timerRunning: false,
          plantStage: 1,
        })
      } else {
        const newTime = timeLeft - 1
        set({ 
          timeLeft: newTime,
          plantStage: calculateStage(newTime)
        })
      }
    }, 1000)
  },

  pauseTimer: () => {
    soundManager.playClick()
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    set({ timerRunning: false })
  },

  reset: () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    set({ timeLeft: 1500, timerRunning: false, plantStage: 1 })
  },

  setTimeLeft: (seconds: number) => {
    set({ 
      timeLeft: seconds,
      plantStage: calculateStage(seconds)
    })
  },

  adjustTime: (seconds: number) => {
    const { timeLeft } = get()
    const newTime = Math.max(0, timeLeft + seconds)
    set({ 
      timeLeft: newTime,
      plantStage: calculateStage(newTime)
    })
  },
}))

function calculateStage(seconds: number): number {
  // 1500s -> Stage 1
  // 1200s -> Stage 2
  // 900s  -> Stage 3
  // 600s  -> Stage 4
  // 300s  -> Stage 5
  if (seconds <= 0) return 5;
  if (seconds > 1200) return 1;
  if (seconds > 900) return 2;
  if (seconds > 600) return 3;
  if (seconds > 300) return 4;
  return 5;
}

// For testing via console
if (typeof window !== 'undefined') {
  (window as any).store = useStore
}
