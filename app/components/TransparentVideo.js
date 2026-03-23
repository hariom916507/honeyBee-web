'use client'

import { useRef, useEffect } from 'react'

/**
 * TransparentVideo — A component that renders a video onto a canvas,
 * removes its background, and crops out edge artifacts (like black bars).
 */
export default function TransparentVideo({ src, className, ...props }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: true })
    let animationId

    const processFrame = () => {
      if (video.paused || video.ended || video.readyState < 2) {
        if (video.paused && video.readyState >= 2) {
          video.play().catch(() => {})
        }
        animationId = requestAnimationFrame(processFrame)
        return
      }

      const { videoWidth: vw, videoHeight: vh } = video
      if (vw === 0 || vh === 0) {
        animationId = requestAnimationFrame(processFrame)
        return
      }

      // Crop configuration to remove edge artifacts (black bars)
      // We crop about 8% from each side which is common for WhatsApp/mobile exports.
      const cropX = Math.round(vw * 0.08) 
      const croppedWidth = vw - (cropX * 2)

      // Sync canvas size to cropped video size
      if (canvas.width !== croppedWidth || canvas.height !== vh) {
        canvas.width = croppedWidth
        canvas.height = vh
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw ONLY the middle section of the video to the canvas
      ctx.drawImage(
        video, 
        cropX, 0, croppedWidth, vh, // Source rect
        0, 0, croppedWidth, vh      // Destination rect
      )
      
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = frame.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        const brightness = (r + g + b) / 3
        const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b))
        
        // Background removal (checkerboard keying)
        if (maxDiff < 40 && (brightness > 100 || (r > 240 && g > 240 && b > 240))) {
          data[i + 3] = 0 // Transparent
        }
        
        // Extra safeguard: remove any leftover black pixels at the very edges
        const x = (i / 4) % canvas.width
        if ((x < 5 || x > canvas.width - 5) && brightness < 50) {
           data[i + 3] = 0 
        }
      }

      ctx.putImageData(frame, 0, 0)
      animationId = requestAnimationFrame(processFrame)
    }

    animationId = requestAnimationFrame(processFrame)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const { autoPlay, loop, muted, playsInline, ...canvasProps } = props

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        style={{ 
          position: 'fixed', 
          width: '1px', 
          height: '1px', 
          opacity: 0.01, 
          left: 0, 
          top: 0, 
          pointerEvents: 'none' 
        }}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        playsInline={playsInline}
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className={className}
        {...canvasProps}
      />
    </>
  )
}
