import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.2, 0, 0, 1] as const

interface SectionBridgeProps {
  className?: string
}

export default function SectionBridge({ className = 'bg-cream-100' }: SectionBridgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className={`flex justify-center py-2 md:py-3 ${className}`}
      aria-hidden
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className="h-px w-20 md:w-32 bg-gold origin-center"
      />
    </div>
  )
}
