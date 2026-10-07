import { useState } from 'react'

function WatermarkedImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  watermarkPosition = 'bottom-right',
  watermarkSize = 'md',
  showText = true,
  ...props
}) {
  const [error, setError] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const textSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
  }

  return (
    <div className={`relative overflow-hidden group ${className}`} style={style}>
      <img
        src={src}
        alt={alt || 'Oria Interior'}
        onError={() => setError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
        {...props}
      />

      {/* Auto Logo Watermark Badge */}
      {!error && (
        <div
          className={`absolute z-10 pointer-events-none transition-all duration-300 flex items-center gap-1.5 px-2 py-1 rounded-md backdrop-blur-sm bg-black/45 border border-white/15 shadow-sm ${
            positionClasses[watermarkPosition] || positionClasses['bottom-right']
          } opacity-50 group-hover:opacity-85 group-hover:scale-105`}
        >
          <img
            src="/favicon.png"
            alt="Oria Watermark"
            className={`${iconSizes[watermarkSize] || iconSizes.md} object-contain filter drop-shadow-sm`}
          />
          {showText && (
            <span
              className={`${textSizes[watermarkSize] || textSizes.md} font-semibold tracking-wider text-white/90 uppercase select-none`}
              style={{ fontFamily: 'sans-serif' }}
            >
              ORIA
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default WatermarkedImage
