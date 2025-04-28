'use client';
import {motion} from 'motion/react';
function CardWithoutAnimation({children, className}: {children: React.ReactNode, className?: string}) {
    return (
      <motion.article
        initial={{opacity: 0, scale: 0.9, y: 20}}
        animate={{opacity: 1, y: 0, scale: 1}}
        transition={{duration: 0.3, ease: 'easeInOut'}}
         className={`w-full min-h-40 rounded-xtra bg-background2 p-std shadow-lg ${className ? className : ''}`}>
        {children}
      </motion.article>
    )
  }

  export default CardWithoutAnimation;