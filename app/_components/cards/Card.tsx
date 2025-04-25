'use client';
import {motion} from 'motion/react';
function Card({children, className}: {children: React.ReactNode, className?: string}) {
    return (
      <motion.article
        initial={{opacity: 0, scale: 0.9, y: 20}}
        whileInView={{opacity: 1, y: 0, scale: 1}}
        transition={{duration: 0.6, ease: 'easeInOut'}}
        viewport={{once: true, amount: 0.2}}
         className={`w-full min-h-40 rounded-xtra bg-background2 p-std shadow-lg ${className ? className : ''}`}>
        {children}
      </motion.article>
    )
  }

  export default Card;