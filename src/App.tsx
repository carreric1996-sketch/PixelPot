import './index.css'
import { useStore } from './store'
import PlantDisplay from './PlantDisplay'
import BackgroundSlideshow from './BackgroundSlideshow'
import { soundManager } from './SoundManager'
import { useEffect } from 'react'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function App() {
  const { timeLeft, timerRunning, plantStage, startTimer, pauseTimer } = useStore()

  useEffect(() => {
    soundManager.init()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-10 overflow-hidden">
      <BackgroundSlideshow />

      {/* Plant illustration */}
      <PlantDisplay plantStage={plantStage} isWilted={false} />

      {/* Timer */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-neutral-500 text-sm font-medium uppercase tracking-[0.3em]">
          Focus Session
        </p>
        <span
          className="text-white font-bold tabular-nums leading-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 10rem)' }}
        >
          {formatTime(timeLeft)}
        </span>
        <p className="text-neutral-600 text-sm">
          Stage {plantStage} / 5
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={startTimer}
          disabled={timerRunning}
          className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-400 active:bg-green-600
                     text-black font-semibold text-sm tracking-wide
                     transition-all duration-150
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-500
                     shadow-[0_0_18px_rgba(74,222,128,0.3)] hover:shadow-[0_0_28px_rgba(74,222,128,0.5)]"
        >
          Focus
        </button>
        <button
          onClick={pauseTimer}
          disabled={!timerRunning}
          className="px-8 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600
                     text-neutral-300 font-semibold text-sm tracking-wide
                     transition-all duration-150
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-800
                     border border-neutral-700"
        >
          Pause
        </button>
      </div>

      {/* Debug Controls (Visible in Development) */}
      <div className="mt-12 flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
        <div className="h-[1px] w-24 bg-neutral-800" />
        <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Debug Tools</span>
        <div className="flex gap-2">
          <button
            onClick={() => useStore.getState().adjustTime(-300)}
            className="px-3 py-1 text-[10px] rounded border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
          >
            -5 min
          </button>
          <button
            onClick={() => useStore.getState().adjustTime(300)}
            className="px-3 py-1 text-[10px] rounded border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
          >
            +5 min
          </button>
          <button
            onClick={() => useStore.getState().reset()}
            className="px-3 py-1 text-[10px] rounded border border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
          >
            Full Reset
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
