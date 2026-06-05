"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Leaf, Recycle, Zap, Shield } from "lucide-react"
import { Card3D, FloatingElement, ParallaxWrapper, FloatingLeaf, GeometricShape } from "./floating-elements"

const features = [
  {
    icon: Leaf,
    title: "100% Natural Materials",
    description: "Every product is crafted from sustainably sourced, biodegradable materials that return safely to the earth.",
  },
  {
    icon: Recycle,
    title: "Circular Economy",
    description: "Our closed-loop system ensures zero waste through innovative recycling and upcycling programs.",
  },
  {
    icon: Zap,
    title: "AI-Optimized Production",
    description: "Machine learning algorithms minimize resource consumption while maximizing product quality.",
  },
  {
    icon: Shield,
    title: "Carbon Negative",
    description: "We remove more carbon than we produce, actively reversing environmental impact.",
  },
]

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="products" ref={ref} className="relative scroll-mt-28 py-32 px-4 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={8} yOffset={25} className="absolute top-20 right-[10%] pointer-events-none">
        <FloatingLeaf size={40} className="text-primary/20" />
      </FloatingElement>
      <FloatingElement delay={1.5} duration={7} yOffset={20} className="absolute bottom-32 left-[8%] pointer-events-none">
        <FloatingLeaf size={35} className="text-accent/25" />
      </FloatingElement>
      <ParallaxWrapper speed={0.3} className="absolute top-40 left-[5%] pointer-events-none">
        <GeometricShape type="hexagon" size={80} className="bg-primary/5 rotate-12" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.2} className="absolute bottom-20 right-[5%] pointer-events-none">
        <GeometricShape type="diamond" size={60} className="bg-accent/5" />
      </ParallaxWrapper>

      {/* Floating circles */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Why Choose ORVIA
          </motion.p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Innovation Meets <span className="text-gradient">Sustainability</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We harness the power of artificial intelligence to create products that are
            better for you and better for the planet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card3D className="h-full">
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="h-full bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                  >
                    <feature.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
