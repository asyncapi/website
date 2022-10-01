import { useState, useContext } from 'react';
import ToolsData from '../../config/tools.json'
import FilterIcon from '../icons/Filter';
import ArrowDown from '../icons/ArrowDown';
import SearchIcon from '../icons/Search';
import ToolsList from './ToolsList';
import Filters from './Filters';
import FiltersDropdown from './FiltersDropdown';

export default function ToolDashboard() {
    const [openFilter, setopenFilter] = useState({
        filter: false,
        category: false
    })
    const [searchName, setSearchName] = useState('')
    const [toolsList, setToolsList] = useState(ToolsData)
    // useEffect(()=> {

    // })
    
    const setFilter = (filterType) => {
        let newFilterObject = { ...openFilter };
        console.log(typeof filterType)
        if (filterType === 'filter') {
            newFilterObject.filter = !newFilterObject.filter
            newFilterObject.category = false
        } else {
            newFilterObject.category = !newFilterObject.category
            newFilterObject.filter = false;
        }
        setopenFilter(newFilterObject)
        console.log(newFilterObject)
    }

    return (
        <div>
            <div className="flex flex-row gap-5 my-10">
                <div className="relative w-1/12 h-auto">
                    <div
                        className="flex py-2 justify-center items-center gap-2 rounded-lg border w-full h-full border-gray-300 hover:bg-gray-300 text-gray-700 shadow text-sm cursor-pointer"
                        onClick={() => setFilter("filter")}>
                        <FilterIcon />
                        <div>Filter</div>
                    </div>
                    {openFilter.filter && (
                        <div className="z-10 absolute top-14 min-w-[20rem]">
                            <Filters />
                        </div>
                    )}
                </div>
                <div className="py-1 px-4 rounded-lg relative border w-3/12 border-gray-300 hover:bg-gray-300 text-gray-700 shadow text-sm cursor-pointer" onClick={() => setFilter("category")}>
                    <div className="relative top-1/2 -translate-y-1/2 flex items-center justify-between gap-2">
                        <div className="">Jump to Category</div>
                        <ArrowDown className="my-auto" />
                    </div>
                    {openFilter.category && (
                        <div className="z-10 p-2 absolute left-0 top-14 w-full rounded-lg duration-150 overflow-x-auto bg-white border border-gray-300">
                            <FiltersDropdown />
                        </div>
                    )}
                </div>
                <div className="py-1 px-4 flex rounded-lg border w-8/12 border-gray-300 hover:border-gray-600 focus:border-gray-600 text-gray-700 shadow text-sm">
                    <SearchIcon className="my-auto opacity-70" />
                    <input
                        className="border-none outline-none flex-1 focus:ring-0"
                        placeholder="Search by name"
                        type="text"
                        value={searchName}
                    />
                </div>
            </div>
            <div className="mt-10">
                <ToolsList toolsData={ToolsData}/>
            </div>
        </div>
    )
}
