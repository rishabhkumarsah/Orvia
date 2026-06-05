"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { ParticleBackground } from "./particle-background"
import { FloatingElement, FloatingLeaf, RotatingRing, FloatingDots, GeometricShape } from "./floating-elements"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseXSpring = useSpring(mousePosition.x, springConfig)
  const mouseYSpring = useSpring(mousePosition.y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 50
    const y = (e.clientY - rect.top - rect.height / 2) / 50
    setMousePosition({ x, y })
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <ParticleBackground />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs with parallax */}
        <motion.div
          style={{ 
            y,
            x: mouseXSpring,
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
            x: useTransform(mouseXSpring, (v) => -v * 1.5),
          }}
          className="absolute top-1/3 -right-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
          className="absolute -bottom-40 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />

        {/* Floating leaves */}
        <FloatingElement delay={0} duration={8} yOffset={30} rotateOffset={15} className="absolute top-20 left-[15%]">
          <FloatingLeaf size={50} className="text-primary/30" />
        </FloatingElement>
        <FloatingElement delay={1} duration={7} yOffset={25} rotateOffset={10} className="absolute top-40 right-[20%]">
          <FloatingLeaf size={35} className="text-accent/40" />
        </FloatingElement>
        <FloatingElement delay={2} duration={9} yOffset={35} rotateOffset={20} className="absolute bottom-40 left-[25%]">
          <FloatingLeaf size={45} className="text-primary/25" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={6} yOffset={20} rotateOffset={8} className="absolute bottom-60 right-[15%]">
          <FloatingLeaf size={30} className="text-accent/30" />
        </FloatingElement>

        {/* Rotating rings */}
        <motion.div
          style={{ x: mouseXSpring, y: mouseYSpring }}
          className="absolute top-1/4 left-[10%]"
        >
          <RotatingRing size={150} className="border-primary/10" />
        </motion.div>
        <motion.div
          style={{ x: useTransform(mouseXSpring, (v) => -v * 2), y: useTransform(mouseYSpring, (v) => -v * 2) }}
          className="absolute bottom-1/4 right-[8%]"
        >
          <RotatingRing size={120} className="border-accent/10" />
        </motion.div>

        {/* Geometric shapes */}
        <FloatingElement delay={1.5} duration={10} yOffset={15} className="absolute top-1/3 left-[5%]">
          <GeometricShape type="hexagon" size={60} className="bg-primary/5" />
        </FloatingElement>
        <FloatingElement delay={2.5} duration={8} yOffset={20} className="absolute bottom-1/3 right-[5%]">
          <GeometricShape type="diamond" size={50} className="bg-accent/5" />
        </FloatingElement>

        {/* Floating dots */}
        <FloatingDots count={8} />

        {/* 3D perspective grid lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ perspective: "1000px" }}>
          <motion.div
            style={{ rotateX: 60, y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
            className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary)_1px,transparent_1px)] bg-[size:60px_60px]"
          />
        </div>
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Logo with 3D hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          style={{ transformStyle: "preserve-3d" }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="ORVIA Logo"
            width={280}
            height={80}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6"
        >
          The Future is Built on Nature
        </motion.p>

        {/* Main headline with stagger animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-8"
        >
          <motion.span 
            className="text-gradient glow-text inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sustainable Living
          </motion.span>
          <br />
          <motion.span 
            className="text-foreground inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Powered by Innovation
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover premium eco-friendly products crafted with AI precision.
          Where cutting-edge technology meets environmental consciousness for a greener tomorrow.
        </motion.p>

        {/* CTA Buttons with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button 
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Explore Products
          </motion.button>
          <motion.button 
            onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-card/80 backdrop-blur-sm border border-border rounded-full text-foreground font-medium hover:bg-card transition-all duration-300 shadow-sm"
          >
            Learn Our Mission
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
