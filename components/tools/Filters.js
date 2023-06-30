import { useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { ToolFilterContext } from '../../context/ToolFilterContext';
import ArrowDown from '../icons/ArrowDown';
import FiltersDropdown from './FiltersDropdown';
import FiltersDisplay from './FiltersDisplay';
import Button from '../buttons/Button';
import tags from '../../config/all-tags.json';
import { categoryList } from '../../scripts/tools/categorylist';
import Data from "../../scripts/tools/tools-schema.json";
import { Carddata } from './Carddata';

export default function Filters({ setOpenFilter }) {
  const router = useRouter();
  const {
    isPaid,
    isAsyncAPIOwner,
    languages,
    technologies,
    categories,
  } = useContext(ToolFilterContext);

  const [openLanguage, setOpenLanguage] = useState(false);
  const [openTechnology, setOpenTechnology] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [checkPaid, setCheckPaid] = useState(isPaid);
  const [checkedLanguage, setCheckedLanguage] = useState(languages);
  const [checkedTechnology, setCheckedTechnology] = useState(technologies);
  const [checkedCategory, setCheckedCategory] = useState(categories);
  const [checkOwner, setCheckOwner] = useState(isAsyncAPIOwner);

  useEffect(() => {
    setCheckedLanguage(languages);
    setCheckedTechnology(technologies);
    setCheckedCategory(categories);
    setCheckPaid(isPaid);
    setCheckOwner(isAsyncAPIOwner);
  }, [languages, technologies, categories, isPaid, isAsyncAPIOwner]);

  const languageList = tags["languages"];
  const technologyList = tags["technologies"];

  const [visible, setVisible] = useState({
    lang: false,
    tech: false,
    category: false,
    pricing: false,
    ownership: false,
  });

  const [readMore, setReadMore] = useState(false);

  const handleApplyFilters = () => {
    setOpenFilter(false);

    const searchParams = new URLSearchParams();
    if (checkOwner) searchParams.set('owned', checkOwner);

    if (checkPaid !== "all") searchParams.set("pricing", checkPaid);
    if (checkedLanguage.length > 0) searchParams.set('langs', checkedLanguage);
    if (checkedTechnology.length > 0) searchParams.set('techs', checkedTechnology);
    if (checkedCategory.length > 0) searchParams.set('categories', checkedCategory);

    router.push(
      {
        pathname: '/tools',
        query: searchParams.toString(),
      },
      undefined,
      { shallow: true }
    );
  };

  const undoChanges = () => {
    setCheckedLanguage(languages);
    setCheckedTechnology(technologies);
    setCheckedCategory(categories);
    setCheckPaid(isPaid);
    setCheckOwner(isAsyncAPIOwner);
  };

  const languageRef = useRef(null);
  const technologyRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    if (languageRef.current) {
      // Perform any necessary actions with languageRef here
    }
    if (technologyRef.current) {
      // Perform any necessary actions with technologyRef here
    }
    if (categoryRef.current) {
      // Perform any necessary actions with categoryRef here
    }
  }, []);

  return (
    <div className="bg-white z-20 py-4 border rounded-lg border-gray-300 shadow-md">
      <div className="flex flex-col gap-2 mx-4">
        <FiltersDisplay
          title="Languages"
          selectedOptions={checkedLanguage}
          onClick={() => setOpenLanguage(!openLanguage)}
        />
        <FiltersDropdown
          open={openLanguage}
          setOpen={setOpenLanguage}
          visible={visible.lang}
          setVisible={(value) => setVisible((prevState) => ({ ...prevState, lang: value }))}
          list={languageList}
          checked={checkedLanguage}
          setChecked={setCheckedLanguage}
          ref={languageRef}
          cypressRef="languageRef" // Add a custom attribute for Cypress to target
        />
        <FiltersDisplay
          title="Technologies"
          selectedOptions={checkedTechnology}
          onClick={() => setOpenTechnology(!openTechnology)}
        />
        <FiltersDropdown
          open={openTechnology}
          setOpen={setOpenTechnology}
          visible={visible.tech}
          setVisible={(value) => setVisible((prevState) => ({ ...prevState, tech: value }))}
          list={technologyList}
          checked={checkedTechnology}
          setChecked={setCheckedTechnology}
          ref={technologyRef}
          cypressRef="technologyRef" // Add a custom attribute for Cypress to target
        />
        <FiltersDisplay
          title="Categories"
          selectedOptions={checkedCategory}
          onClick={() => setOpenCategory(!openCategory)}
        />
        <FiltersDropdown
          open={openCategory}
          setOpen={setOpenCategory}
          visible={visible.category}
          setVisible={(value) => setVisible((prevState) => ({ ...prevState, category: value }))}
          list={categoryList}
          checked={checkedCategory}
          setChecked={setCheckedCategory}
          ref={categoryRef}
          cypressRef="categoryRef" // Add a custom attribute for Cypress to target
        />
        <div className="flex items-center justify-between my-4">
          <Button variant="secondary" onClick={undoChanges}>
            Undo changes
          </Button>
          <Button onClick={handleApplyFilters}>Apply filters</Button>
        </div>
      </div>
    </div>
  );
}

