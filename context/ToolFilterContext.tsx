import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ToolFilterContextProps {
  isPaid: string;
  isAsyncAPIOwner: boolean;
  languages: string[];
  technologies: string[];
  categories: string[];
}

export const ToolFilterContext = createContext<ToolFilterContextProps>({
  isPaid: "all",
  isAsyncAPIOwner: false,
  languages: [],
  technologies: [],
  categories: [],
});

function ToolFilter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPaid, setIsPaid] = useState<string>("all");
  const [isAsyncAPIOwner, setIsAsyncAPIOwner] = useState<boolean>(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // useEffect has been used to apply filters to the tool on each change of router query
  useEffect(() => {
    if (!router || !router.isReady) return;

    let { pricing, owned, langs, techs, categories } = router.query;

    setIsPaid(pricing as string || "all");
    setIsAsyncAPIOwner(owned === "true");
    setLanguages((langs as string)?.split(",") || []);
    setTechnologies((techs as string)?.split(",") || []);
    setCategories((categories as string)?.split(",") || []);
  }, [router?.query]);

  return (
    <ToolFilterContext.Provider
      value={{ isPaid, isAsyncAPIOwner, languages, technologies, categories }}
    >
      {children}
    </ToolFilterContext.Provider>
  );
}

export default ToolFilter;
