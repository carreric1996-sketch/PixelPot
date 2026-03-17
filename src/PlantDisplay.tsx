interface PlantDisplayProps {
  plantStage: number
  isWilted: boolean
}

// Shared soil base path used in every stage
const Soil = () => (
  <path d="M20 80 Q50 60 80 80 L80 100 L20 100 Z" fill="#8B4513" />
)

export default function PlantDisplay({ plantStage, isWilted }: PlantDisplayProps) {
  // Wrapper transition — smooth crossfade when stage or wilted state changes
  const wrapperClass = `w-32 h-32 transition-all duration-700 ease-in-out ${
    isWilted
      ? 'drop-shadow-[0_0_10px_rgba(161,161,170,0.2)]'
      : 'drop-shadow-[0_0_18px_rgba(74,222,128,0.45)]'
  }`

  function renderPlant() {
    // Wilted overrides everything regardless of stage
    if (isWilted) {
      return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <Soil />
          <path d="M50 75 Q55 60 70 65" stroke="#556B2F" strokeWidth="4" fill="none" />
          <circle cx="70" cy="65" r="4" fill="#6B8E23" />
        </svg>
      )
    }

    switch (plantStage) {
      case 1:
        return (
          // Stage 1: The Seed
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <Soil />
            <circle cx="50" cy="75" r="5" fill="#A0522D" />
          </svg>
        )

      case 2:
        return (
          // Stage 2: The Sprout
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <Soil />
            <path d="M50 75 Q45 60 50 50" stroke="#228B22" strokeWidth="4" fill="none" />
            <circle cx="50" cy="50" r="4" fill="#32CD32" />
          </svg>
        )

      case 3:
        return (
          // Stage 3: The Bloom
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <Soil />
            <path d="M50 75 Q45 40 50 25" stroke="#228B22" strokeWidth="6" fill="none" />
            <path d="M50 50 Q30 40 40 30" stroke="#228B22" strokeWidth="4" fill="none" />
            <path d="M50 60 Q70 50 60 40" stroke="#228B22" strokeWidth="4" fill="none" />
            <circle cx="50" cy="25" r="8" fill="#32CD32" />
            <circle cx="40" cy="30" r="5" fill="#32CD32" />
            <circle cx="60" cy="40" r="6" fill="#32CD32" />
          </svg>
        )

      case 4:
        return (
          // Stage 4: Flourishing
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <Soil />
            <path d="M50 75 Q45 35 50 15" stroke="#228B22" strokeWidth="6" fill="none" />
            <path d="M50 55 Q30 45 35 30" stroke="#228B22" strokeWidth="4" fill="none" />
            <path d="M50 35 Q25 25 30 15" stroke="#228B22" strokeWidth="4" fill="none" />
            <path d="M50 65 Q75 55 65 40" stroke="#228B22" strokeWidth="4" fill="none" />
            <path d="M50 45 Q70 35 60 20" stroke="#228B22" strokeWidth="4" fill="none" />
            <circle cx="50" cy="15" r="8" fill="#32CD32" />
            <circle cx="35" cy="30" r="6" fill="#32CD32" />
            <circle cx="30" cy="15" r="5" fill="#32CD32" />
            <circle cx="65" cy="40" r="6" fill="#32CD32" />
            <circle cx="60" cy="20" r="5" fill="#32CD32" />
          </svg>
        )

      case 5:
      default:
        return (
          // Stage 5: The Harvest
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <Soil />
            <path d="M50 75 Q45 35 50 15" stroke="#228B22" strokeWidth="7" fill="none" />
            <path d="M50 55 Q30 45 35 30" stroke="#228B22" strokeWidth="5" fill="none" />
            <path d="M50 65 Q75 55 65 40" stroke="#228B22" strokeWidth="5" fill="none" />
            <circle cx="35" cy="30" r="7" fill="#32CD32" />
            <circle cx="65" cy="40" r="7" fill="#32CD32" />
            <circle cx="45" cy="25" r="6" fill="#32CD32" />
            <circle cx="55" cy="25" r="6" fill="#32CD32" />
            <circle cx="50" cy="12" r="10" fill="#FF4500" />
            <path d="M50 12 L50 6 M48 8 Q50 4 52 8" stroke="#228B22" strokeWidth="2" fill="none" />
          </svg>
        )
    }
  }

  return (
    <div className={wrapperClass}>
      {renderPlant()}
    </div>
  )
}
