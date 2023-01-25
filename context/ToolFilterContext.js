import { createContext, useState } from 'react'
export const ToolFilterContext = createContext()

export default function ToolFilter({ children }) {
    const [isPaid, setisPaid] = useState("all");
    const [isAsyncAPIOwner, setAsyncAPIOwner] = useState(false)
    const [languages, setLanguages] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [categories, setCategories] = useState([])

    return (
        <ToolFilterContext.Provider value={{isPaid, isAsyncAPIOwner, languages, technologies, categories, setisPaid, setAsyncAPIOwner, setLanguages, setTechnologies, setCategories}}>
            {children}
        </ToolFilterContext.Provider>
    )
}