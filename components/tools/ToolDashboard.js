import { useState, useContext, useEffect, useRef } from 'react';
import {ToolFilterContext} from '../../context/ToolFilterContext'
import {categoryList} from '../../scripts/tools/categorylist'
import Button from '../buttons/Button'
import ToolsData from '../../config/tools.json'
import FilterIcon from '../icons/Filter';
import ArrowDown from '../icons/ArrowDown';
import SearchIcon from '../icons/Search';
import ToolsList from './ToolsList';
import Filters from './Filters';
import FiltersDropdown from './FiltersDropdown';

export default function ToolDashboard() {
    const filterRef = useRef()
    const categoryRef = useRef()
    const [openFilter, setopenFilter] = useState({
        filter: false,
        category: false
    })
    const {isPaid, isAsyncAPIOwner, languages, technologies, categories, setCategories} = useContext(ToolFilterContext)
    const [searchName, setSearchName] = useState('')
    const [toolsList, setToolsList] = useState({})
    const [checkedCategory, setCheckedCategory] = useState(categories)
    const [checkToolsList, setcheckToolsList] = useState(true)

    const handleApplyCategory = () => {
        setCategories(checkedCategory)
        setopenFilter({
            filter: false,
            category: false
        })
    }
    useEffect(() => {
        const checkIfClickOutside = (e) => {
            if((openFilter.filter && filterRef.current && !filterRef.current.contains(e.target)) || openFilter.category && categoryRef.current && !categoryRef.current.contains(e.target))
                setopenFilter({
                    filter: false,
                    category: false
                })             
        }
        document.addEventListener("mousedown", checkIfClickOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickOutside)
        }
    })

    useEffect(()=> {
        let tempToolsList = {}
        if(categories.length >0){
            for(let category of categories){
                Object.keys(ToolsData).forEach((key) => {
                    if(key===category) tempToolsList[key] = JSON.parse(JSON.stringify(ToolsData[key]))
                })
            }
        }else{
            tempToolsList = JSON.parse(JSON.stringify(ToolsData));
        }
        setcheckToolsList(false)
        Object.keys(tempToolsList).forEach((category) => {
            tempToolsList[category].toolsList = tempToolsList[category].toolsList.filter((tool) => {
                let isLanguageTool = true, isTechnologyTool = true, isSearchTool = true;
                if(languages.length){
                    isLanguageTool = false;
                    for(let language of languages){
                        if(language === tool.filters.language.name) isLanguageTool = true;
                    }
                }
                if(technologies.length){
                    isTechnologyTool = false;
                    for(let technology of technologies){
                        if(tool.filters.technology.find((item) => item.name === technology)) isTechnologyTool = true;
                    }
                }
                if(searchName){
                    isSearchTool = tool.title.toLowerCase().includes(searchName.toLowerCase())
                }
                return isLanguageTool && isTechnologyTool && isSearchTool && tool.filters.isAsyncAPIOwner === isAsyncAPIOwner && tool.filters.hasCommercial === isPaid;
            })
            if(tempToolsList[category].toolsList.length) setcheckToolsList(true)
        })
        setToolsList(tempToolsList)
    }, [isPaid, isAsyncAPIOwner, languages, technologies, categories, searchName])
    
    const setFilter = (filterType) => {
        let newFilterObject = { ...openFilter };
        if (filterType === 'filter') {
            newFilterObject.filter = !newFilterObject.filter
            newFilterObject.category = false
        } else {
            newFilterObject.category = !newFilterObject.category
            newFilterObject.filter = false;
        }
        setopenFilter(newFilterObject)
    }

    return (
        <div>
            <div className="lg:flex flex-row gap-5 my-10">
                <div className='w-full flex lg:w-1/3 gap-5 h-auto'>
                <div className="relative w-1/3 h-auto my-2 lg:my-0" ref={filterRef}>
                    <div
                        className="flex py-2 justify-center items-center gap-2 rounded-lg border w-full h-full border-gray-300 hover:shadow-md hover:border-gray-600 text-gray-700 shadow text-sm cursor-pointer"
                        onClick={() => setFilter("filter")}>
                        <FilterIcon />
                        <div>Filter</div>
                    </div>
                    {openFilter.filter && (
                        <div className="z-10 absolute top-16 min-w-[20rem]">
                            <Filters setOpenFilter={setopenFilter} />
                        </div>
                    )}
                </div>
                <div className="my-2 lg:my-0 rounded-lg relative w-2/3" ref={categoryRef}>
                    <div className="relative top-1/2 -translate-y-1/2 flex items-center border border-gray-300 hover:shadow-md hover:border-gray-600 text-gray-700 shadow text-sm cursor-pointer rounded-lg py-4 px-4 justify-between gap-2" onClick={() => (setCheckedCategory(categories),setFilter("category"))}>
                        <div className="">Select Categories</div>
                        <ArrowDown className={`my-auto ${openFilter.category ? 'rotate-180' : ''}`} />
                    </div>
                    {openFilter.category && (
                        <div className="z-10 p-2 absolute md:min-w-[20rem] left-0 top-16 w-full rounded-lg duration-150 overflow-x-auto bg-white border border-gray-300 shadow">
                            <FiltersDropdown dataList = {categoryList} checkedOptions={checkedCategory} setStateFunction={setCheckedCategory} className="min-w-[18rem] w-full overflow-x-auto" />
                            <div className='w-auto min-w-[18rem] min-w-0 my-6 mb-0' onClick={handleApplyCategory}>
                                <Button text='Apply Category' className=' w-full' />
                            </div>
                        </div>
                    )}
                </div>
                </div>
                <div className="py-1 px-4 flex rounded-lg border w-full lg:w-2/3 border-gray-300 hover:border-gray-600 focus:border-gray-600 text-gray-700 shadow text-sm">
                    <SearchIcon className="my-auto opacity-70" />
                    <input
                        className="border-none outline-none flex-1 focus:ring-0"
                        placeholder="Search by name"
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    {searchName && <button className="hover:bg-gray-100 p-2 rounded-full h-fit my-auto" onClick={() => setSearchName('')}>
                        <img src="/img/illustrations/icons/close-icon.svg" width="10" />
                    </button>}
                </div>
            </div>
            <div className="mt-10">
                {checkToolsList ? <ToolsList toolsData={toolsList} /> : <div>None from tools list meet the search requirements</div>}
            </div>
        </div>
    )
}
