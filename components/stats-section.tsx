"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FloatingElement, FloatingLeaf, ParallaxWrapper, RotatingRing } from "./floating-elements"

const stats = [
  { value: "2M+", label: "Trees Planted", color: "text-primary" },
  { value: "98%", label: "Waste Diverted", color: "text-accent" },
  { value: "150K", label: "Happy Customers", color: "text-primary" },
  { value: "-40%", label: "Carbon Footprint", color: "text-accent" },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Moving gradient background */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
      />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={8} yOffset={20} className="absolute top-10 left-[10%] pointer-events-none">
        <FloatingLeaf size={35} className="text-primary/20" />
      </FloatingElement>
      <FloatingElement delay={1} duration={7} yOffset={25} className="absolute bottom-10 right-[12%] pointer-events-none">
        <FloatingLeaf size={30} className="text-accent/25" />
      </FloatingElement>
      <ParallaxWrapper speed={0.3} className="absolute top-1/2 left-[3%] pointer-events-none">
        <RotatingRing size={60} className="border-primary/10" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.2} className="absolute top-1/2 right-[3%] pointer-events-none">
        <RotatingRing size={50} className="border-accent/10" />
      </ParallaxWrapper>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          style={{ scale }}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-12 md:p-16 shadow-sm hover:shadow-lg transition-shadow duration-500"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center cursor-default group"
              >
                <motion.div 
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-2"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(90, 143, 90, 0)",
                      "0 0 20px rgba(90, 143, 90, 0.3)",
                      "0 0 0px rgba(90, 143, 90, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground text-sm md:text-base tracking-wide group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Decorative underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  className="h-0.5 w-12 mx-auto mt-3 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"
                />
              </motion.div>
            ))}
          </div>

          {/* Background decorative elements inside the card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/4 w-96 h-96 border border-primary/5 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/2 -left-1/4 w-80 h-80 border border-accent/5 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
