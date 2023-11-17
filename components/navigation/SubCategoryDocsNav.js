import { useState, useEffect } from "react";
import DocsNavItem from "./DocsNavItem";
import DocsArrow from "../icons/DocsArrow";

export default function SubCategoryDocsNav({ subCategory, active, onClick }) {
    const [openSubCategoryChildren, setOpenSubCategoryChildren] = useState(active.startsWith(subCategory.item.slug));

    const onClickHandler = () => {
      setOpenSubCategoryChildren(!openSubCategoryChildren);
      onClick();
    }
  
    useEffect(() => {
      setOpenSubCategoryChildren(active.startsWith(subCategory.item.slug));
    }, [active])
  
    return (
      <li key={subCategory.item.title} data-testid="DocsNav-subitem">
        <div className='flex gap-2'>
          <DocsArrow isDropDown={subCategory.children} activeDropDown={openSubCategoryChildren} onClick={() => setOpenSubCategoryChildren(!openSubCategoryChildren)} />
          <DocsNavItem {...subCategory.item} activeSlug={active} defaultClassName={`font-body text-sm text-black leading-8 ${subCategory.children ? 'hover:font-semibold' : 'hover:text-secondary-600'}`} inactiveClassName='font-regular' activeClassName={subCategory.children ? 'font-semibold' : 'text-secondary-600'} onClick={onClickHandler} />
        </div>
        {openSubCategoryChildren && (
          <ul className='border-l ml-8 border-gray-200 pl-4'>
            {subCategory.children && subCategory.children.map(subItem => (
              <li key={subItem.title}>
                <DocsNavItem {...subItem} activeSlug={active} defaultClassName='font-body text-sm text-gray-700 leading-7 hover:text-secondary-600' inactiveClassName='font-regular' activeClassName='text-secondary-600' onClick={onClick} />
              </li>
            ))}
          </ul>
        )}
      </li>
    )
}
