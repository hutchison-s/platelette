import ActionButtons from "./ActionButtons";
import { FeaturedText } from "./Text";

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
  
  

  function HeroLoading() {
  
    return (
      <>
      <section
        className="relative w-full max-w-screen h-screen bg-gradient-to-b from-secondary/15 to-background overflow-hidden"
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
      <FeaturedText className="text-center text-xl z-10 max-w-screen-md mx-auto pb-12 px-4">
          Explore a world of culinary creativity at your fingertips. Share your favorite recipes, discover dishes from food lovers around the globe, and connect over the meals that bring us together.
        </FeaturedText>
      </>
    );
  }

  export default HeroLoading