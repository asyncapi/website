import {useState} from 'react';
import PropTypes from 'prop-types';

export default function Filter({data, onFilter}) {
    const [state, setState] = useState('Add filter');
    const catgeories = [];
    data.map((data) => {
        catgeories.push(data.category)
    });
    const onFilterApply = (value) => {
        setState(value);
        const jobs = data.filter((e) => e.category === value);
        onFilter(jobs);
    }
    return (
        <div>
            <input type="checkbox" id="sortbox" className="hidden absolute" />
            <label htmlFor="sortbox" className="inline-flex w-56 max-w-sm justify-between rounded-md mb-2 border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 cursor-pointer">
                <span className="text-md">{state}</span>
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </label>
            <div id="sortboxmenu" className="absolute mt-1S min-w-max opacity-0 transition delay-75 ease-in-out z-10 origin-top-right right-50 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none group-hover:block">
                <ul className="py-1 block">
                    {catgeories.map((category, i) => 
                    <li id="sortitem" key={i} onClick={()=> onFilterApply(category)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"><a href="#" className="">{category}</a></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

Filter.propTypes = {
    data: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
}
