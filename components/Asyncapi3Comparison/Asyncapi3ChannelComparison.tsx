import React, { useState } from 'react';
import { AsyncAPI3ChannelComparisonProps, HoverState } from '@/types/Asyncapi3Comparison/AsyncAPI3ChannelComparison';

export default function Asyncapi3ChannelComparison({ className = '' }: AsyncAPI3ChannelComparisonProps) {
 const [hoverState, setHoverState] = useState<HoverState>({
   Paths: false,
   PathItem: false,
   Operation: false,
   Message: false,
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
           className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`}
           onMouseEnter={() => handleMouseEnter('Paths')}
           onMouseLeave={() => handleMouseLeave('Paths')}
         >
           Channels

           <div className="flex flex-wrap flex-1">
             <div
               className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`}
               onMouseOver={() => handleMouseEnter('PathItem')}
               onMouseLeave={() => handleMouseLeave('PathItem')}
             >
               Channel Item

               <div className="flex flex-wrap flex-1">
                 <div
                   className={(hoverState.Operation ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`}
                   onMouseOver={() => handleMouseEnter('Operation')}
                   onMouseLeave={() => handleMouseLeave('Operation')}
                 >
                   Operation (Publish and Subscribe)

                   <div className="flex flex-col flex-wrap flex-1">
                     <div className="flex flex-wrap flex-1">
                       <div
                         className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`}
                         onMouseEnter={() => handleMouseEnter('Message')}
                         onMouseLeave={() => handleMouseLeave('Message')}
                       >
                         Messages
                         <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                           Message

                           <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                             Headers
                           </div>
                           <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                             Payload
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div className="flex-1 border border-black p-2 ml-1">
       <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

       <div>
         <div
           className={(hoverState.Paths ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`}
           onMouseEnter={() => handleMouseEnter('Paths')}
           onMouseLeave={() => handleMouseLeave('Paths')}
         >
           Channels

           <div
             className={(hoverState.PathItem ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`}
             onMouseOver={() => handleMouseEnter('PathItem')}
             onMouseLeave={() => handleMouseLeave('PathItem')}
           >
             Channel
             <div className="flex flex-col flex-wrap flex-1">
               <div
                 className={(hoverState.Message ? `bg-red-400` : 'bg-white') + ` flex-1 border border-red-600 p-2 m-2`}
                 onMouseEnter={() => handleMouseEnter('Message')}
                 onMouseLeave={() => handleMouseLeave('Message')}
               >
                 Messages
                 <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                   Message

                   <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                     Headers
                   </div>
                   <div className="flex-1 border border-black box-border mr-1 p-2 m-2">
                     Payload
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div
           className={(hoverState.Operation ? `bg-yellow-100` : ' ') + ` border border-yellow-300 p-2 m-2`}
           onMouseEnter={() => handleMouseEnter('Operation')}
           onMouseLeave={() => handleMouseLeave('Operation')}
         >
           Operations
           <div className="flex flex-wrap flex-1">
             <div className="flex-1 border border-orange-300 p-2 m-2">
               Operation
               <div className="flex flex-col flex-wrap flex-1">
                 <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                   action (send or receive)
                 </div>
                 <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                   channel
                 </div>
                 <div className="border border-blue-500 bg-white hover:bg-blue-200 p-2 m-2">
                   messages
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}