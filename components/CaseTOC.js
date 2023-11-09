import { useMemo, useState } from "react";
import Scrollspy from "react-scrollspy";
import { twMerge } from "tailwind-merge";
import ArrowRight from "./icons/ArrowRight";
import { useHeadingsObserver } from "./helpers/useHeadingsObserver";

const convertContentToTocItems = (content, level = 1) => {
  const tocItems = [];

  for (let section of content) {
    const item = {
      lvl: level,
      content: section.title,
      slug: section.title
        .replace(/<|>|"|\\|\/|=/gi, "")
        .replace(/\s/gi, "-")
        .toLowerCase(),
    };

    if (section.children && section.children.length > 0) {
      const children = convertContentToTocItems(section.children, level + 1);
      item.children = children;
    }

    tocItems.push(item);
  }

  return tocItems;
};

function TOCItem({ item, index, currSelected, closeMenu }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    closeMenu();
    setOpen(false);
  };

  return (
    <>
      <nav className="relative block max-w-max">
        <a
          className={`mb-1 transition duration-100 ease-in-out text-gray-900 font-normal text-sm font-sans antialiased hover:underline flex items-center ${
            currSelected === item.slug && "text-primary-500 font-bold"
          }`}
          href={`#${item.slug}`}
          key={index}
          style={{ marginLeft: `${(item.lvl - 1) * 16}px` }}
          onClick={handleClick}
        >
          {item.content}
        </a>
        {item.children && item.children.length > 0 && (
          <span onClick={() => setOpen(!open)} className="cursor-pointer absolute -right-6 top-0 ">
            <ArrowRight
              className={`${
                open ? "rotate-90" : "0"
              } transform transition duration-200 ease-in-out h-5 text-gray-500`}
            />
          </span>
        )}
      </nav>
      {item.children && item.children.length > 0 && (
        <ul
          className={`left-0 relative ${
            open ? "max-h-[1000px]" : "max-h-[0.01px]"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {item.children.map((item, index) => (
            <TOCItem
              item={item}
              index={index}
              key={index}
              closeMenu={closeMenu}
              currSelected={currSelected}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default function CaseTOC({
  className,
  cssBreakingPoint = "xl",
  toc,
  contentSelector,
}) {
  if (!toc || !toc.length) return null;
  const tocItems = useMemo(() => convertContentToTocItems(toc), [toc]);
  const [open, setOpen] = useState(false);
  const { currActive: selected } = useHeadingsObserver();

  return (
    <div
      className={twMerge(
        `${className} ${tocItems.length ? "" : "hidden"} ${
          cssBreakingPoint === "xl" ? "xl:block" : "lg:block"
        } md:top-24 md:max-h-(screen-14) z-20`,
      )}
    >
      <div
        className={`flex cursor-pointer ${tocItems.length ? "" : "hidden"} ${
          cssBreakingPoint === "xl" ? "xl:cursor-auto" : "lg:cursor-auto"
        } xl:mt-2`}
      >
        <h5
          className={twMerge(
            `${
              open && "mb-4"
            } flex-1 text-primary-500 font-medium uppercase tracking-wide text-sm font-sans antialiased ${
              cssBreakingPoint === "xl"
                ? "xl:mb-4 xl:text-xs xl:text-gray-900 xl:font-bold"
                : "lg:mb-4 lg:text-xs lg:text-gray-900 lg:font-bold"
            }`,
          )}
        >
          On this page
        </h5>
        <div
          className={`text-underline text-center p4 ${
            cssBreakingPoint === "xl" ? "xl:hidden" : "lg:hidden"
          }`}
          onClick={() => setOpen(!open)}
        >
          <ArrowRight
            className={`${
              open ? "-rotate-90" : "rotate-90"
            } transform transition duration-200 ease-in-out h-6 -mt-0.5 text-primary-500`}
          />
        </div>
      </div>
      <div
        className={`${!open && "hidden"} ${
          cssBreakingPoint === "xl" ? "xl:block" : "lg:block"
        }`}
      >
        <ul className="mt-2">
          {tocItems.map((item, index) => (
            <TOCItem
              item={item}
              index={index}
              key={index}
              closeMenu={() => setOpen(false)}
              currSelected={selected}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
