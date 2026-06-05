"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card3D, FloatingElement, ParallaxWrapper, FloatingLeaf, RotatingRing, GeometricShape } from "./floating-elements"

export function MissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 left-10 w-64 h-64 border border-primary/20 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-48 h-48 border border-accent/20 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
        className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"
      />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={9} yOffset={30} className="absolute top-32 right-[15%] pointer-events-none">
        <FloatingLeaf size={45} className="text-primary/25" />
      </FloatingElement>
      <FloatingElement delay={2} duration={7} yOffset={25} className="absolute bottom-40 left-[12%] pointer-events-none">
        <FloatingLeaf size={38} className="text-accent/20" />
      </FloatingElement>
      
      {/* Rotating rings with parallax */}
      <ParallaxWrapper speed={0.4} className="absolute top-1/4 right-[5%] pointer-events-none">
        <RotatingRing size={100} className="border-primary/10" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.3} className="absolute bottom-1/4 left-[3%] pointer-events-none">
        <RotatingRing size={80} className="border-accent/10" />
      </ParallaxWrapper>

      {/* Geometric shapes */}
      <ParallaxWrapper speed={0.5} className="absolute top-20 left-[20%] pointer-events-none">
        <GeometricShape type="hexagon" size={70} className="bg-primary/5 rotate-45" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.4} className="absolute bottom-32 right-[18%] pointer-events-none">
        <GeometricShape type="triangle" size={50} className="bg-accent/5" />
      </ParallaxWrapper>

      {/* Animated background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4"
            >
              Our Mission
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Redefining the Future of{" "}
              <span className="text-gradient">Conscious Living</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                At ORVIA, we believe that sustainability and innovation are not mutually
                exclusive. Our AI-driven approach to product development allows us to
                create solutions that are both environmentally responsible and
                technologically advanced.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Every decision we make is guided by our commitment to leave the planet
                better than we found it. From sourcing to shipping, we optimize every
                step of our process to minimize environmental impact.
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Discover Our Story
            </motion.button>
          </motion.div>

          {/* Right visual - 3D floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ scale }}
            className="relative"
          >
            <div className="relative aspect-square" style={{ perspective: "1000px" }}>
              {/* Floating cards with 3D effect */}
              <Card3D>
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotateY: [0, 5, 0],
                    rotateX: [0, -3, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-48 h-48 bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-6 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-3xl font-serif font-bold text-primary"
                  >
                    2030
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Net Zero Target</div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary/40 rounded-full" />
                  </div>
                </motion.div>
              </Card3D>

              <Card3D>
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotateY: [0, -5, 0],
                    rotateX: [0, 3, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/4 right-0 w-52 h-36 bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-6 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-3xl font-serif font-bold text-accent"
                  >
                    100%
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Renewable Energy</div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent/40 rounded-full" />
                  </div>
                </motion.div>
              </Card3D>

              <Card3D>
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 3, 0],
                    rotateX: [0, -2, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-1/4 w-56 h-40 bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-6 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="text-3xl font-serif font-bold text-gradient"
                  >
                    50+
                  </motion.div>
                  <div className="text-sm text-muted-foreground">Global Partners</div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary/40 rounded-full" />
                  </div>
                </motion.div>
              </Card3D>

              {/* Central glow with animation */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              </motion.div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <motion.line
                  x1="25%" y1="25%" x2="75%" y2="35%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                  x1="75%" y1="35%" x2="45%" y2="80%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-accent"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                  x1="45%" y1="80%" x2="25%" y2="25%"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
