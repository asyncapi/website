import {categoryList} from '../../scripts/tools/categorylist'

export default function CategoryDropdown({setopenCategory}) {

  return (
  <div class="absolute z-10 mt-2 w-56 origin-top-right h-60 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      {categoryList.map((data, index) => {
        return (
        <div onClick={() => setopenCategory(false)}>
          <a href={`#${data.name}`} key={index} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">{data.name}</a>
        </div> )})}
    </div>
  </div>
  )
}