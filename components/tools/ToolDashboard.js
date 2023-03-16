import { useState, useContext, useEffect, useRef } from 'react';
import { ToolFilterContext } from '../../context/ToolFilterContext'
import ToolsData from '../../config/tools.json'
import FilterIcon from '../icons/Filter';
import SearchIcon from '../icons/Search';
import ToolsList from './ToolsList';
import Filters from './Filters';
import CategoryDropdown from './CategoryDropdown';
import ArrowDown from '../icons/ArrowDown';
import Button from '../buttons/Button';
import Cross from '../icons/Cross';

export default function ToolDashboard() {
    const filterRef = useRef() // used to provide ref to the Filter menu and outside click close feature
    const categoryRef = useRef() // used to provide ref to the Category menu and outside click close feature
    const [openFilter, setOpenFilter] = useState(false)
    const [openCategory, setopenCategory] = useState(false)
    // filter parameters extracted from the context
    const { isPaid, isAsyncAPIOwner, languages, technologies, categories, setCategories, setLanguages, setTechnologies, setisPaid, setAsyncAPIOwner } = useContext(ToolFilterContext)
    const [searchName, setSearchName] = useState('') // state variable used to get the search name
    const [toolsList, setToolsList] = useState({}) // state variable used to set the list of tools according to the filters applied
    const [checkToolsList, setCheckToolsList] = useState(true) // state variable used to check whether any tool is available according to the needs of user.
    const [isFiltered, setIsFiltered] = useState(false);

    // useEffect function to enable the close Modal feature when clicked outside of the modal
    useEffect(() => {
        const checkIfClickOutside = (e) => {
            if ((openFilter && filterRef.current && !filterRef.current.contains(e.target)))
                setOpenFilter(false)
        }
        document.addEventListener("mousedown", checkIfClickOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickOutside)
        }
    })

    // useEffect function to enable the close Category dropdown Modal feature when clicked outside of the modal
    useEffect(() => {
        const checkIfClickOutside = (e) => {
            if ((openCategory && categoryRef.current && !categoryRef.current.contains(e.target)))
                setopenCategory(false)
        }
        document.addEventListener("mousedown", checkIfClickOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickOutside)
        }
    })

    // Function to update the list of tools according to the current filters applied
    const updateToolsList = () => {
        let tempToolsList = {}
        
        // Tools data list is first filtered according to the category filter if applied by the user.
        // Hence if any category is selected, then only respective tools will be selected for further check on filters
        if (categories.length > 0) {
            for (let category of categories) {
                Object.keys(ToolsData).forEach((key) => {
                    if (key === category) tempToolsList[key] = JSON.parse(JSON.stringify(ToolsData[key]))
                })
            }
        } else {
            // if no category is selected, then all tools are selected for further check on filters
            tempToolsList = JSON.parse(JSON.stringify(ToolsData));
        }

        // checkToolsList is initially made false to check whether any tools are present according to the filters.
        setCheckToolsList(false)

        // Each tool selected, is then traversed to check against each filter variable (only if the filter is applied), 
        // whether they match with the filter applied or not.
        Object.keys(tempToolsList).forEach((category) => {
            tempToolsList[category].toolsList = tempToolsList[category].toolsList.filter((tool) => {

                // These are filter check variable for respective filters, which is initially made true.
                // If the particular filter is applied by user, the respective check variable is made false first, 
                // and then tool parameters are checked against the filter variable value to decide it matches the filter 
                // criteria or not.
                let isLanguageTool = true, isTechnologyTool = true, isSearchTool = true, isAsyncAPITool = true, isPaidTool = true;
                if (languages.length) {
                    isLanguageTool = false;
                    for (let language of languages) {
                        if (tool?.filters?.language && language === tool.filters.language.name) isLanguageTool = true;
                    }
                }
                if (technologies.length) {
                    isTechnologyTool = false;
                    for (let technology of technologies) {
                        if (tool?.filters?.technology && tool.filters.technology.find((item) => item.name === technology)) isTechnologyTool = true;
                    }
                }
                if (searchName) {
                    isSearchTool = tool.title.toLowerCase().includes(searchName.toLowerCase())
                }
                if (isAsyncAPIOwner)
                    isAsyncAPITool = tool.filters.isAsyncAPIOwner === isAsyncAPIOwner ? true : false
                
                if (isPaid !== "all") {
                    if (isPaid === "free") isPaidTool = tool.filters.hasCommercial === false;
                    else isPaidTool = tool.filters.hasCommercial === true;
                }

                return isLanguageTool && isTechnologyTool && isSearchTool && isAsyncAPITool && isPaidTool;
            })
            if (tempToolsList[category].toolsList.length) setCheckToolsList(true)
        })
        setToolsList(tempToolsList)
    }

    // function to clear all the filters when `Clear Filters` is clicked.
    const clearFilters = () => {
        setIsFiltered(false);
        setLanguages([])
        setTechnologies([])
        setCategories([])
        setisPaid("all")
        setAsyncAPIOwner(false)
        setOpenFilter(false)
    }

    useEffect(() => {
        updateToolsList()
    }, [isPaid, isAsyncAPIOwner, languages, technologies, categories, searchName])

    return (
        <div>
            <div className="flex flex-wrap lg:flex-nowrap gap-4 my-10 justify-between">
                <div className='flex w-[47%] lg:w-1/5 gap-5 h-auto'>
                    <div className="relative w-full h-auto" ref={filterRef}>
                        <div
                            className="flex py-1 px-4 justify-center items-center gap-2 rounded-lg border w-full h-14 border-gray-300 hover:shadow-md hover:border-gray-600 text-gray-700 shadow text-sm cursor-pointer"
                            onClick={() => setOpenFilter(!openFilter)}>
                            <FilterIcon />
                            <div>Filter</div>
                        </div>
                        {openFilter && (
                            <div className="z-20 absolute top-16 min-w-[20rem]">
                                <Filters setOpenFilter={setOpenFilter} clearFilters={clearFilters} setIsFiltered={setIsFiltered} />
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex w-[47%] lg:w-1/5 gap-5 h-auto'>
                    <div className="relative w-full h-auto" ref={categoryRef}>
                        <div
                            className="flex py-1 px-4 justify-center items-center gap-2 rounded-lg border w-full h-14 border-gray-300 hover:shadow-md hover:border-gray-600 text-gray-700 shadow text-sm cursor-pointer"
                            onClick={() => setopenCategory(!openCategory)}>
                            <div>Jump to Category</div>
                            <ArrowDown className={`my-auto ${openCategory ? 'rotate-180' : ''}`} />
                        </div>
                        {openCategory && (
                            <div className="z-20 absolute top-16 right-52">
                                <CategoryDropdown setopenCategory={setopenCategory} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="py-1 px-4 flex rounded-lg border w-[100%] lg:w-4/5 h-14 border-gray-300 hover:border-gray-600 focus:border-gray-600 text-gray-700 shadow text-sm">
                    <SearchIcon className="my-auto opacity-70" />
                    <input
                        className="border-none outline-none flex-1 w-11/12 focus:ring-0"
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
            {isFiltered &&
                <div className="flex items-center mt-4 text-gray-600 cursor-pointer hover:text-black" onClick={clearFilters}>
                    <Cross />
                    <span className="ml-3">
                        Clear Filters
                    </span>
                </div>
            }
            <div className="mt-0">
                {checkToolsList ? <ToolsList toolsData={toolsList} /> : <div className='p-4'>
                    <img src='/img/illustrations/not-found.webp' className='w-1/2 m-auto' />
                    <div className='text-center text-lg'> Sorry, we don't have tools according to your needs. </div>
                </div>}
            </div>
        </div>
    )
}
