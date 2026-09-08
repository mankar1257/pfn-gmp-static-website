import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * A background image layer that drifts as the page scrolls.
 * mode "hero"    — for full-bleed section tops: image recedes as you scroll past.
 * mode "section" — for mid-page panels: image travels through a gentle range
 *                  while the panel crosses the viewport.
 * The layer is oversized vertically so the drift never exposes an edge, and
 * collapses to a static background for prefers-reduced-motion users.
 */
const ParallaxImage: React.FC<{
  src: string;
  mode?: 'hero' | 'section';
  className?: string;
  position?: string;
}> = ({ src, mode = 'section', className, position = 'center' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], mode === 'hero' ? ['0%', '18%'] : ['-9%', '9%']);

  const bg = {
    backgroundImage: `url('${src}')`,
    backgroundSize: 'cover',
    backgroundPosition: position,
  } as const;

  return (
    <div ref={ref} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {reduced ? (
        <div className="absolute inset-0" style={bg} />
      ) : (
        <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y, ...bg }} />
      )}
    </div>
  );
};

export default ParallaxImage;
