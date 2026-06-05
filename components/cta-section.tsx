"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { FloatingElement, FloatingLeaf, ParallaxWrapper, RotatingRing, GeometricShape, Card3D } from "./floating-elements"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none"
      />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={9} yOffset={30} className="absolute top-20 left-[8%] pointer-events-none">
        <FloatingLeaf size={45} className="text-primary/20" />
      </FloatingElement>
      <FloatingElement delay={1.5} duration={7} yOffset={25} className="absolute bottom-20 right-[10%] pointer-events-none">
        <FloatingLeaf size={38} className="text-accent/25" />
      </FloatingElement>
      <FloatingElement delay={0.5} duration={8} yOffset={20} className="absolute top-1/3 right-[5%] pointer-events-none">
        <FloatingLeaf size={30} className="text-primary/15" />
      </FloatingElement>

      {/* Rotating rings */}
      <ParallaxWrapper speed={0.4} className="absolute top-1/4 left-[5%] pointer-events-none">
        <RotatingRing size={120} className="border-primary/10" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.3} className="absolute bottom-1/4 right-[5%] pointer-events-none">
        <RotatingRing size={100} className="border-accent/10" />
      </ParallaxWrapper>

      {/* Geometric shapes */}
      <ParallaxWrapper speed={0.5} className="absolute top-32 right-[15%] pointer-events-none">
        <GeometricShape type="hexagon" size={60} className="bg-primary/5" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={-0.4} className="absolute bottom-32 left-[12%] pointer-events-none">
        <GeometricShape type="diamond" size={50} className="bg-accent/5" />
      </ParallaxWrapper>

      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${60 + (i % 3) * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Card3D>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ scale, rotateX: rotate }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-10 md:p-16 text-center shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
          >
            {/* Animated glow on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"
            />

            {/* Animated icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-20 h-20 mx-auto mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0px rgba(90, 143, 90, 0.2)",
                    "0 0 30px rgba(90, 143, 90, 0.4)",
                    "0 0 0px rgba(90, 143, 90, 0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-serif font-bold mb-6"
            >
              Join the <span className="text-gradient">Green Revolution</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Be the first to know about new sustainable products, exclusive offers,
              and our latest environmental initiatives.
            </motion.p>

            {!submitted ? (
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-background/50 border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-3 text-primary"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="w-6 h-6" />
                </motion.div>
                <span className="text-lg font-medium">Thank you for joining us!</span>
              </motion.div>
            )}

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xs text-muted-foreground mt-6"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />
          </motion.div>
        </Card3D>
      </div>
    </section>
  )
}
