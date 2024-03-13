import React, { useState } from 'react';
import { AsyncAPI3IdAndAddressComparisonProps, HoverState } from '@/types/Asyncapi3Comparison/Asyncapi3IdAndAddressComparison';

export default function Asyncapi3IdAndAddressComparison({ className = '' }: AsyncAPI3IdAndAddressComparisonProps) {
 const [hoverState, setHoverState] = useState<HoverState>({
   Paths: false,
   PathItem: false,
 });

 const handleMouseEnter = (key: keyof HoverState) => {
   setHoverState((prevState) => ({ ...prevState, [key]: true }));
 };

 const handleMouseLeave = (key: keyof HoverState) => {
   setHoverState((prevState) => ({ ...prevState, [key]: false }));
 };

 return (
   <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
     <div className="flex-1 border border-black p-2 ml-1">
       <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

       <div>
         <div
           className={(hoverState.Paths ? `bg-yellow-100` : ' ') + `border border-yellow-300 p-2 m-2`}
           onMouseEnter={() => handleMouseEnter('Paths')}
           onMouseLeave={() => handleMouseLeave('Paths')}
         >
           Channels

           <div
             className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + `border border-yellow-600 p-2 m-2`}
             onMouseOver={() => handleMouseEnter('PathItem')}
             onMouseLeave={() => handleMouseLeave('PathItem')}
           >
             Channel Item
           </div>
         </div>
       </div>
     </div>

     <div className="flex-1 border border-black p-2 ml-1">
       <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

       <div>
         <div
           className={(hoverState.Paths ? `bg-yellow-100` : ' ') + `border border-yellow-300 p-2 m-2`}
           onMouseEnter={() => handleMouseEnter('Paths')}
           onMouseLeave={() => handleMouseLeave('Paths')}
         >
           Channels

           <div
             className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + `border border-yellow-600 p-2 m-2`}
             onMouseOver={() => handleMouseEnter('PathItem')}
             onMouseLeave={() => handleMouseLeave('PathItem')}
           >
             Channel

             <div className="flex flex-col flex-wrap flex-1">
               <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                 address
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}