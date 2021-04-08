import {useState} from 'react';
import PropTypes from 'prop-types';

export default function Filter({data, onFilter}) {
    const [state, setState] = useState('Filter');
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
        <div class="mb-4">
            <div className="select-box inline-flex w-56 max-w-sm justify-between">
                <div className="select-box__current" tabIndex="1">
                    <div className="select-box__value">
                        <input className="select-box__input" type="radio" id="0" value="1" name="Ben" checked="checked"/>
                        <p className="select-box__input-text">{state}</p>
                    </div>
                    <svg className="select-box__icon -mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <ul className="select-box__list">
                    {catgeories.map((category, i) => <li key={i}>
                        <label  onClick={() => onFilterApply(category)} className="select-box__option" htmlFor="0" aria-hidden="aria-hidden">{category}</label>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

Filter.propTypes = {
    data: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
}
