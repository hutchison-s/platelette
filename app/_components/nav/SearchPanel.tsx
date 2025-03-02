import RecipeSearch from '../tools/RecipeSearch';

function SearchPanel() {

  return (
    <>
        
        <div className="-z-10 absolute top-0 left-0 flex justify-center items-center transition-all duration-300 w-screen h-[60px] md:h-[70px] py-4 translate-y-0 bg-secondary/50 backdrop-blur-lg opacity-0 group-has-[input:checked]:translate-y-full group-has-[input:checked]:opacity-100" >
            <RecipeSearch />
        </div>
    </>
  )
}

export default SearchPanel