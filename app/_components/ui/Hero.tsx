'use client'
import { motion } from 'framer-motion';
import { FeaturedText } from './Text';
import ActionButtons from './ActionButtons';
// function Hero() {
//     return (
//         <section className="absolute w-screen top-[60px] left-0 h-fit px-6 py-8 hero-bg box-border md:px-8 lg:flex lg:justify-center items-center bg-gradient-to-br from-background to-background2 lg:px-[8vw] lg:flex-wrap lg:gap-y-6 lg:gap-x-12">
//             <div className="text-left text-[4rem] md:text-[6rem] leading-[4rem] md:leading-[6rem] font-sans font-black flex flex-col text-transparent bg-gradient-to-br from-secondary/80 to-secondary bg-clip-text drop-shadow-md lg:items-end lg:py-10 lg:w-fit lg:shrink">
//                 <span className="w-full text-left">DISCOVER</span>
//                 <span className="w-full text-left">SHARE</span>
//                 <span className="w-full text-left">SAVOR</span>
//             </div>
//             <p className="font-heading font-light text-xl md:leading-loose text-transparent bg-gradient-to-tl from-primary to-foreground bg-clip-text py-8 md:text-2xl lg:flex-1 lg:max-w-600 xl:text-3xl xl:leading-[3rem]">
//                 Explore a world of culinary creativity at your fingertips. Share your favorite recipes, discover dishes from food lovers around the globe, and connect over the meals that bring us together.</p>
//             <div className="flex w-full justify-center flex-col sm:flex-row items-center gap-4 md:flex-full md:gap-10">
//                 <ActionButtons />
//             </div>
//         </section>
//     )
// }

const plates = [
    { id: 1, left: 62, speed: 1.2, size: 1.2 },
    { id: 4, left: 22, speed: 0.9, size: 1.1 },
    { id: 5, left: 5, speed: 1.6, size: 1.4 },
    { id: 7, left: -2, speed: 1, size: 1 },
    { id: 8, left: 15, speed: 1.5, size: 1.5 },
    { id: 9, left: 65, speed: 1.2, size: 1 },
    { id: 10, left: 30, speed: 1.3, size: 1.2 },
    { id: 12, left: 68, speed: 1.25, size: 0.9 },
    { id: 13, left: 18, speed: 0.95, size: 0.8 },
    { id: 14, left: 3, speed: 0.9, size: 0.9 },
    { id: 15, left: 55, speed: 1, size: 1 },
    { id: 16, left: 30, speed: 1.1, size: 0.9 },
    { id: 17, left: 72, speed: 1.3, size: 1.2 },
    { id: 18, left: 40, speed: 1.4, size: 1.5 },
    { id: 19, left: 20, speed: 1.6, size: 1.3 },
    { id: 20, left: 0, speed: 0.8, size: 0.7 },

  ];
  
  
  
  


  function MotionPlate({
    left,
    speed,
    size,
    offset = 0
  }: {
    left: number;
    speed: number;
    size: number;
    offset?: number;
  }) {

  
    return (
      <motion.div
        whileInView={{translateY: '-200vh', transition: { duration: 2 / speed, ease: 'easeInOut' }}}
        initial={{ translateY: '0vh' }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute rounded-full bg-slate-50 shadow-[0_8px_26px_4px_#0000001a] z-10"
        style={{
          width: `clamp(80px, ${size * 45}vw, 500px)`,
          height: `clamp(80px, ${size * 45}vw, 500px)`,
          left: `${left}%`,
          top: `calc(90vh - ${offset}px)`
        }}
      >
        <div className="absolute w-5/6 h-5/6 bg-slate-50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[-4px_10px_8px_0px_#00000005_inset,_4px_-8px_8px_0px_#00000003,_-4px_10px_12px_0px_#ffffffcc,_4px_-10px_6px_0px_#ffffffcc_inset,_-2px_4px_6px_0px_#ffffffff]">
            <div className="absolute w-1/2 h-1/2 bg-slate-50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[-4px_10px_6px_0px_#00000008_inset,_2px_-4px_6px_0px_#ffffffff_inset,_2px_-4px_12px_4px_#00000005,_-2px_4px_6px_0px_#ffffffaa]"></div>
            </div>
      </motion.div>
    );
  }

  function Plate({size, left, top}: {
    size: number;
    left: number;
    top: number;}) {
    return (
        <div
          className="absolute rounded-full bg-slate-50 shadow-[0_8px_26px_4px_#0000001a] z-0"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            transform: 'translateZ(-20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute w-5/6 h-5/6 bg-slate-50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[-4px_10px_8px_0px_#00000005_inset,_4px_-8px_8px_0px_#00000003,_-4px_10px_12px_0px_#ffffffcc,_4px_-10px_6px_0px_#ffffffcc_inset,_-2px_4px_6px_0px_#ffffffff]">
              <div className="absolute w-1/2 h-1/2 bg-slate-50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[-4px_10px_6px_0px_#00000008_inset,_2px_-4px_6px_0px_#ffffffff_inset,_2px_-4px_12px_4px_#00000005,_-2px_4px_6px_0px_#ffffffaa]"></div>
              </div>
        </div>
      );
  }
  
  

  function Hero() {
  
    return (
      <>
      {plates.map((plate) => (
          <MotionPlate
            key={plate.id}
            left={plate.left}
            speed={plate.speed}
            size={plate.size}
            offset={plate.speed * 50}
          />
        ))}
      <section
        className="relative w-full h-screen -mt-8 md:-mt-0 bg-gradient-to-b from-secondary/15 to-background overflow-hidden"
        style={{ perspective: '100px' }}
      >
        
        
        <div className='relative mx-auto md:w-fit grid gap-0 font-black z-10 place-items-center h-5/6'>
        <Plate size={300} left={-50} top={-10} />
        <Plate size={300} left={80} top={30} />
        <Plate size={300} left={-40} top={70} />
        <Plate size={300} left={60} top={60} />
        <Plate size={360} left={-20} top={30} />
        <Plate size={260} left={40} top={10} />
        <h2 className='grid text-left text-[4rem] sm:text-[6rem] md:text-[8rem] leading-none w-fit text-primary z-10 drop-shadow-md' style={{transform: 'translateZ(-0.1px)'}}><span>DISCOVER</span><span>SHARE</span><span>SAVOR</span></h2></div>
        <div className='absolute flex flex-wrap max-w-screen min-w-[250px] w-fit gap-2 justify-center mx-auto left-1/2 -translate-x-1/2 top-[60vh] sm:top-[70vh] z-10'>
            <ActionButtons />
        </div>
        
      </section>
      <FeaturedText className="text-center text-xl z-10 max-w-[900px] mx-auto pb-12 px-4">
          Explore a world of culinary creativity at your fingertips. Share your favorite recipes, discover dishes from food lovers around the globe, and connect over the meals that bring us together.
        </FeaturedText>
      </>
    );
  }
  
  

  
  
  

export default Hero;