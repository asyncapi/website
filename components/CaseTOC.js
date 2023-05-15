import { useState } from "react";
import Scrollspy from "react-scrollspy";
import { twMerge } from "tailwind-merge";
import ArrowRight from "./icons/ArrowRight";

const convertContentToTocItems = (content, level = 1) => {
  return content.map((section) => {
    const item = {
      lvl: level,
      content: section.title,
      slugWithATag: section.title
        .replace(/<|>|"|\\|\/|=/gi, "")
        .replace(/\s/gi, "-")
        .toLowerCase(),
    };

    if (section.children && section.children.length > 0) {
      item.children = convertContentToTocItems(section.children, level + 1);
    }

    return item;
  });
};

const renderTocItems = (items) => {
  return items.map((item, index) => (
    <>
      <a
        className={`pl-${Math.pow(
          2,
          item.lvl - 1
        )} block mb-1 transition duration-100 ease-in-out text-gray-900 font-normal text-sm font-sans antialiased hover:underline`}
        href={`#${item.slugWithATag}`}
        key={index}
      >
        {item.content}
      </a>
      {item.children && (
        <div className={`pl-${Math.pow(2, item.lvl)} ml-2`}>
          {renderTocItems(item.children)}
        </div>
      )}
    </>
  ));
};

export default function CaseTOC({
  className,
  cssBreakingPoint = "xl",
  toc,
  contentSelector,
  depth = 2,
}) {
  if (!toc || !toc.length) return null;
  // const minLevel = toc.reduce((mLevel, item) => (!mLevel || item.lvl < mLevel) ? item.lvl : mLevel, 0)
  const tocItems = convertContentToTocItems(toc);

  const [open, setOpen] = useState(false);

  return (
    <div
      className={twMerge(
        `${className} ${tocItems.length ? "" : "hidden"} ${
          cssBreakingPoint === "xl" ? "xl:block" : "lg:block"
        } md:top-24 md:max-h-(screen-14) z-20`
      )}
      onClick={() => setOpen(!open)}
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
            }`
          )}
        >
          On this page
        </h5>
        <div
          className={`text-underline text-center p4 ${
            cssBreakingPoint === "xl" ? "xl:hidden" : "lg:hidden "
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
        {
          <Scrollspy
            items={tocItems.map((item) => item.slugWithATag)}
            currentClassName="text-primary-500 font-bold"
            componentTag="div"
            rootEl={contentSelector}
            offset={-120}
          >
            {renderTocItems(tocItems)}
          </Scrollspy>
        }
      </div>
    </div>
  );
}
