import { createContext, useState } from 'react'
export const ToolFilterContext = createContext()

export default function ToolFilter({ children }) {
    const [isPaid, setisPaid] = useState(false);
    const [isAsyncAPIOwner, setAsyncAPIOwner] = useState(false)
    const [languages, setLanguages] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [categories, setCategories] = useState([])

    const FilterLanguages = (language, value) => {
        let temp = {...languages}
        if(value){
            const index = temp.indexOf(language)
            temp.splice(index, 1);
        }else{
            temp.push(language)
        }
        setLanguages(temp)
    }

    const FilterTechnologies = (technology, value) => {
        let temp = {...technologies}
        if(value){
            const index = temp.indexOf(technology)
            temp.splice(index, 1);
        }else{
            temp.push(technology)
        }
        setTechnologies(temp)
    }

    const FilterCategories = (category, value) => {
        let temp = {...categories}
        if(value){
            const index = temp.indexOf(category)
            temp.splice(index, 1);
        }else{
            temp.push(category)
        }
        setCategories(temp)
    }

    return (
        <ToolFilterContext.Provider value={{isPaid, isAsyncAPIOwner, languages, technologies, categories, setisPaid, setAsyncAPIOwner, FilterLanguages, FilterTechnologies, FilterCategories}}>
            {children}
        </ToolFilterContext.Provider>
    )
}