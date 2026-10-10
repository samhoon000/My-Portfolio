export function Architecture({ variant = 'atrium' }) {
  return <div className={`architecture architecture--${variant}`} aria-hidden="true">
    <div className="architecture-back" />
    <div className="architecture-left" />
    <div className="architecture-right" />
    <div className="architecture-ceiling" />
    <div className="architecture-floor" />
    <div className="architecture-floor-grid" />
    <div className="architecture-cornice" />
    <div className="architecture-light light-left" />
    <div className="architecture-light light-right" />
    <div className="architecture-dust" />
    <div className="architecture-vignette" />
  </div>
}

export function RoomScene({ variant, className = '', children }) {
  return <main className={`room-scene room-scene--${variant} ${className}`}>
    <Architecture variant={variant} />
    <div className="room-scene-content">{children}</div>
  </main>
}
