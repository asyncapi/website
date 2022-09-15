import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function CommunityDocsNav({navlist, post}) {
    const {pathname} = useRouter()
    const [title, setTitle] = useState(null);
    const section = pathname.split('/')[[3]];
    const [tocs, setTocs] = useState([]);
    useEffect(() => {
        const newLists = navlist.filter(
          (p) => {
            if(p.isIndex){
              setTitle(p.title)
            }
            return p.sectionSlug && p.sectionSlug.includes(section);
          }
        );
        setTocs(newLists)
    },[])
  return (
    <div>
      <h4 className="text-lg text-primary-600">{title}</h4>
      <div className="w-full py-4 shadow shadow-slate-300 rounded-lg mt-4">
        <ul>
          {Object.keys(tocs) &&
            tocs.map((toc) => {
              return (
                toc.isIndex === false && (
                  <li
                    key={toc.id}
                    className={`flex mt-2 items-center text-base font-semibold text-gray-700 hover:text-black ${
                      pathname === toc.slug && 'text-black'
                    }`}
                  >
                    <div
                      className={`w-1 h-6 ${
                        pathname === toc.slug && 'bg-primary-600'
                      }`}
                    />
                    <div className="ml-4">
                      <Link href={toc.slug}>{toc.title}</Link>
                    </div>
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default CommunityDocsNav