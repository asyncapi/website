import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function CommunityDocsNav({navlist, post}) {
    const {pathname} = useRouter()
    const section = pathname.split('/')[[3]];
    console.log(section)
    const [tocs, setTocs] = useState([]);
    useEffect(() => {
        const newLists = navlist.filter(
          (p) => p.sectionSlug && p.sectionSlug.includes(section)
        );
        setTocs(newLists)
    },[])
  return (
     <div className="w-full py-4 shadow shadow-slate-300 rounded-lg">
        <ul>
            {Object.keys(tocs) && tocs.map((toc) => {
                const title = toc.excerpt.split('\n')[0].toLowerCase();
                return (
                  <li
                    key={toc.id}
                    className={`flex mt-2 items-center text-base font-semibold text-gray-700 hover:text-black ${
                      pathname === toc.slug && 'text-black'
                    }`}
                  >
                    <div className={`w-1 h-6 ${pathname === toc.slug && 'bg-primary-600'}`} />
                    <div className="ml-4">
                      <Link href={toc.slug}>
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                      </Link>
                    </div>
                  </li>
                );
            })}
        </ul>
     </div>
  )
}

export default CommunityDocsNav