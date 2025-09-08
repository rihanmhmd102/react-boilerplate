import './spinner.css'

export function Spinner() {
  return (
    <div className="loading-hero">
      <div className="app-background">
        <div className="app-background-gradient" />
        <div className="app-background-pattern">
          <svg width="100%" height="100%">
            <pattern
              id="loading-tech-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="var(--text-secondary)" />
              <circle cx="30" cy="10" r="1" fill="var(--text-secondary)" />
              <circle cx="50" cy="10" r="2" fill="var(--text-secondary)" />
              <circle cx="10" cy="30" r="1" fill="var(--text-secondary)" />
              <circle cx="30" cy="30" r="2" fill="var(--text-secondary)" />
              <circle cx="50" cy="30" r="1" fill="var(--text-secondary)" />
              <circle cx="10" cy="50" r="2" fill="var(--text-secondary)" />
              <circle cx="30" cy="50" r="1" fill="var(--text-secondary)" />
              <circle cx="50" cy="50" r="2" fill="var(--text-secondary)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#loading-tech-pattern)" />
          </svg>
        </div>
        <div className="app-background-accent" />
      </div>

      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      </div>
    </div>
  )
}
