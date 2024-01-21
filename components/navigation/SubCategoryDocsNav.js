import { useState, useEffect } from "react";
import DocsNavItem from "./DocsNavItem";
import DocsArrow from "../icons/DocsArrow";

export default function SubCategoryDocsNav({ subCategory, activeItem, onClick }) {
  const [isOpen, setIsOpen] = useState(activeItem.startsWith(subCategory.item.slug));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    onClick();
  }

  useEffect(() => {
    setIsOpen(activeItem.startsWith(subCategory.item.slug));
  }, [activeItem])

  return (
    <li key={subCategory.item.title} data-testid="DocsNav-subitem">
      <div className='flex gap-2'>
        <DocsArrow 
          isDropDown={subCategory.children} 
          activeDropDownItem={isOpen} 
          onClick={toggleOpen} 
        />
        <DocsNavItem 
          {...subCategory.item} 
          activeSlug={activeItem} 
          defaultClassName={`font-body text-sm text-black leading-8 hover:font-semibold`}
          inactiveClassName='font-regular' 
          activeClassName='font-semibold' 
          onClick={toggleOpen} 
        />
      </div>
      {isOpen && (
        <ul className='border-l ml-8 border-gray-200 pl-4'>
          {subCategory.children && subCategory.children.map(subItem => (
            <li key={subItem.title}>
              <DocsNavItem 
                {...subItem} 
                activeSlug={activeItem} 
                defaultClassName='font-body text-sm text-gray-700 leading-7 hover:text-secondary-600' 
                inactiveClassName='font-regular' 
                activeClassName='text-secondary-600' 
                onClick={onClick} 
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}