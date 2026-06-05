"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  rotateOffset?: number
  className?: string
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  yOffset = 20,
  rotateOffset = 5,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
        rotate: [-rotateOffset / 2, rotateOffset / 2, -rotateOffset / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 3D Card with tilt effect
interface Card3DProps {
  children: React.ReactNode
  className?: string
}

export function Card3D({ children, className = "" }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setRotateX(-mouseY / 20)
    setRotateY(mouseX / 20)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper for scroll-based animations
interface ParallaxWrapperProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxWrapper({ children, speed = 0.5, className = "" }: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// Floating leaf SVG
export function FloatingLeaf({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C12 22 12 22 12 22C12 17 9 13 4 12C9 11 12 7 12 2Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C12 22 12 22 12 22C12 17 15 13 20 12C15 11 12 7 12 2Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  )
}

// Floating circle element
export function FloatingCircle({ 
  className = "", 
  size = 100,
  blur = true 
}: { 
  className?: string
  size?: number
  blur?: boolean
}) {
  return (
    <div
      className={`rounded-full ${blur ? "blur-xl" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

// 3D rotating ring
export function RotatingRing({ className = "", size = 200 }: { className?: string; size?: number }) {
  return (
    <motion.div
      animate={{ rotateZ: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`border-2 border-dashed rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

// Floating dots pattern
export function FloatingDots({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-primary/40 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}
    </div>
  )
}

// Geometric shape
export function GeometricShape({ 
  type = "hexagon",
  className = "",
  size = 100
}: { 
  type?: "hexagon" | "triangle" | "diamond"
  className?: string
  size?: number
}) {
  const shapes = {
    hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
    diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        clipPath: shapes[type],
      }}
    />
  )
}
