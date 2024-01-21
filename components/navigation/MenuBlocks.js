import React, { useState, useEffect } from 'react';
import Paragraph from '../typography/Paragraph';
import Label from './Label';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MenuBlocks({ items = [] }) {
 const router = useRouter();
 const [isMobileView, setIsMobileView] = useState(false);

 useEffect(() => {
   const handleResize = () => {
     const isMobile = window.innerWidth < 768;
     setIsMobileView(isMobile);
   };

   handleResize();

   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);

 const isSmallText = isMobileView ? 'body-sm' : 'body-md';

 return (
   <>
     {isMobileView ? (
       <div className="grid grid-cols-3 gap-4">
         {items.map((item, index) => {
           const isExternalHref = item.href && item.href.startsWith('http');
           return (
             <Link href={item.comingSoon ? '' : item.href} key={index}>
               <a
                 data-testid="MenuBlocks-Link"
                 className={`p-3 rounded-lg ${router.asPath === item.href ? 'bg-secondary-100 shadow-sm' : 'hover:bg-gray-50'}`}
                 target={isExternalHref ? "_blank" : undefined}
                 rel={isExternalHref ? "noopener noreferrer" : undefined}
               >
                 <div className={`flex items-center justify-center rounded-lg ${item.className ? item.className : 'border border-gray-800 bg-secondary-100'} h-10 `} data-testid="MenuBlock-icon">
                   <item.icon className="h-6 w-6" />
                 </div>
                 <Paragraph typeStyle={isSmallText} textColor="text-gray-900" fontWeight="font-semibold">
                   <span className={item.comingSoon && 'opacity-50'}>{item.title}</span> {item.comingSoon && <Label text="Coming soon" />} {item.beta && <Label text="Beta" />}
                 </Paragraph>
               </a>
             </Link>
           );
         })}
       </div>
     ) : (
       <>
         {items.map((item, index) => {
           const isExternalHref = item.href && item.href.startsWith('http');
           return (
             <Link href={item.comingSoon ? '' : item.href} key={index}>
               <a
                 data-testid="MenuBlocks-Link"
                 className={`flex items-start p-3 -m-3 space-x-4 transition duration-150 ease-in-out rounded-lg ${router.asPath === item.href ? 'bg-secondary-100 shadow-sm' : 'hover:bg-gray-50'}`}
                 target={isExternalHref ? "_blank" : undefined}
                 rel={isExternalHref ? "noopener noreferrer" : undefined}
               >
                 <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${item.className ? item.className : 'border border-gray-800 bg-secondary-100'} text-gray-900 sm:h- sm:w- ${item.comingSoon && 'opacity-50'}`} data-testid="MenuBlock-icon">
                   <item.icon className="h-6 w-6" />
                 </div>
                 <div className="space-y-1 whitespace-pre-line">
                   <Paragraph typeStyle={isSmallText} textColor="text-gray-900" fontWeight="font-small">
                     <span className={item.comingSoon && 'opacity-50'}>{item.title}</span> {item.comingSoon && <Label text="Coming soon" />} {item.beta && <Label text="Beta" />}
                   </Paragraph>
                   {!isMobileView && (
                     <Paragraph typeStyle="body-sm" className={`${item.comingSoon && 'opacity-50'}`}>
                       {item.description}
                     </Paragraph>
                   )}
                 </div>
               </a>
             </Link>
           );
         })}
       </>
     )}
   </>
 );
}