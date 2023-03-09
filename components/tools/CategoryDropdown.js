import ToolsData from '../../config/tools.json';

export default function CategoryDropdown({setopenCategory}) {

  return (
  <div className="absolute z-10 w-52 lg:w-56 origin-top-right h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
    <div className="py-1" role="none">
    {Object.keys(ToolsData).map((categoryName, index) => {
      // displaying tools category having atleast one tool
        if(ToolsData[categoryName].toolsList.length > 0) return (
        <div onClick={() => setopenCategory(false)}>
          <a href={`#${categoryName}`} key={index} className="block px-4 py-2 hover:bg-gray-100">{categoryName}</a>
        </div> )})}
    </div>
  </div>
  )
}