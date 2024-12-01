import React, { useState } from 'react';

/**
 * @description Logo for SAP
 * @param {string} className - used to style the svg
 */
export default function SapLogo({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <svg
      className={className || 'inline-block'}
      fill='currentColor'
      viewBox='0 0 1024 522'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <linearGradient
        id='path3060_1_'
        gradientUnits='userSpaceOnUse'
        x1='-127.4302'
        y1='661.6777'
        x2='-126.4722'
        y2='661.6777'
        gradientTransform='matrix(0 513.7015 -513.7015 0 340415.5625 65474.9453)'
      >
        <stop offset='0' style={{ stopColor: isHovered ? '#1661BE' : 'currentColor' }} />
        <stop offset='1' style={{ stopColor: isHovered ? '#019CE0' : 'currentColor' }} />
      </linearGradient>
      <path
        id='path3060'
        fill='url(#path3060_1_)'
        d='M13.43,13.621v491.971h502.559l491.915-491.915l0,0H13.43V13.621z'
      />
      <path
        id='path5384'
        fill='url(#path3060_1_)'
        d='M649.993,455.304v36.691h5.538v-15.923h6.229l10.039,15.923h6.23l-10.731-15.923c5.362-0.665,9.692-3.783,9.692-10.385c0-7.232-4.427-10.384-13.152-10.384H649.993z M655.531,460.149h7.614c3.745,0,7.962,0.609,7.962,5.191c0,5.728-4.271,6.232-9,6.232h-6.576V460.149z M662.454,441.803c-17.567,0-32.539,13.537-32.539,31.846c0,18.442,14.971,32.192,32.539,32.192c17.324,0,31.846-13.747,31.846-32.192C694.3,455.34,679.778,441.803,662.454,441.803z M662.454,446.996c14.332,0,25.613,11.578,25.613,26.652c0,15.332-11.281,26.654-25.613,26.654c-14.578,0-26.307-11.322-26.307-26.654C636.147,458.574,647.876,446.996,662.454,446.996z'
      />
      <path
        id='path3100'
        fill='#FFFFFF'
        d='M609.321,249.022h-21.555V170.19h21.555c28.777,0,51.684,9.481,51.684,38.913C661.005,239.497,638.099,249.022,609.321,249.022 M377.321,305.381c-11.409,0-22.109-2.083-31.358-5.561l31.048-97.918h0.665l30.405,98.184c-9.16,3.278-19.583,5.295-30.727,5.295 M603.606,106.145h-97.885v232.754l-85.512-232.754h-84.758l-73.062,194.595c-7.72-49.047-58.529-66.028-98.472-78.688c-26.329-8.474-54.353-20.924-54.098-34.714c0.222-11.276,15.053-21.732,44.307-20.17c19.716,0.997,37.107,2.592,71.633,19.285l34.005-59.238c-31.502-16.094-75.155-26.196-110.867-26.274h-0.221c-41.66,0-76.374,13.58-97.907,35.811c-14.965,15.552-23.062,35.224-23.427,57.123c-0.554,29.996,10.49,51.285,33.606,68.31c19.562,14.333,44.517,23.561,66.56,30.472c27.193,8.386,49.391,15.707,49.136,31.314c-0.221,5.682-2.337,11.01-6.446,15.219c-6.768,7.034-17.169,9.637-31.558,9.958c-27.736,0.554-48.305-3.766-81.07-23.128l-30.228,60.068c32.665,18.598,71.333,29.476,110.8,29.476h5.106c34.338-0.665,62.074-10.468,84.238-28.279l3.588-3.135l-9.792,26.318h88.89l14.932-45.403c15.618,5.284,33.407,8.252,52.237,8.252c18.376,0,35.711-2.769,51.053-7.819l14.355,44.971h145.037v-94.041h31.646c76.429,0,121.688-38.9,121.688-104.187c0-72.663-43.952-105.993-137.528-105.993'
      />
    </svg>
  );
}
