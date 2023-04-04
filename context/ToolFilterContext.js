import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react'
export const ToolFilterContext = createContext()

export default function ToolFilter({ children }) {
    const router = useRouter();
    const [isPaid, setisPaid] = useState("all");
    const [isAsyncAPIOwner, setAsyncAPIOwner] = useState(false)
    const [languages, setLanguages] = useState([])
    const [technologies, setTechnologies] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
      if(!router.isReady) return;

        let { pricing, owned, langs, techs, categories } = router.query;

        setisPaid(pricing || "all")
        setAsyncAPIOwner(owned === "true")
        setLanguages(langs?.split(",") || [])
        setTechnologies(techs?.split(",") || [])
        setCategories(categories?.split(",") || [])

    }, [router.query])
    

    return (
        <ToolFilterContext.Provider value={{isPaid, isAsyncAPIOwner, languages, technologies, categories}}>
            {children}
        </ToolFilterContext.Provider>
    )
}
