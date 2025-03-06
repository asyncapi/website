
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IAsyncAPILogoProps {
  className?: string;
}

/**
 * @description A component that displays the AsyncAPI logo
 * @param {string} props.className - The class name for the component
 */
export default function AsyncAPILogo({ className }: IAsyncAPILogoProps) {
  return (
    <svg
      className={twMerge('h-10 w-auto mt-0.5', className)}
      width='165'
      height='36'
      viewBox='0 0 165 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>AsyncAPI Logo</title>
      <defs>
        <linearGradient
          id='gradient1'
          x1='33.0317'
          y1='3.3661'
          x2='4.57364'
          y2='32.1761'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2DCCFD' />
          <stop offset='100%' stopColor='#AD20E2' />
        </linearGradient>
        <linearGradient id='gradient2' x1='33.0317' y1='32.6313' x2='4.571' y2='3.82126' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#A829E2' />
          <stop offset='5%' stopColor='#A829E2' stopOpacity='84%' />
          <stop offset='11%' stopColor='#A829E2' stopOpacity='67%' />
          <stop offset='18%' stopColor='#A829E2' stopOpacity='51%' />
          <stop offset='25%' stopColor='#A829E2' stopOpacity='38%' />
          <stop offset='33%' stopColor='#A829E2' stopOpacity='28%' />
          <stop offset='43%' stopColor='#A829E2' stopOpacity='20%' />
          <stop offset='54%' stopColor='#A829E2' stopOpacity='14%' />
          <stop offset='68%' stopColor='#A829E2' stopOpacity='11%' />
          <stop offset='100%' stopColor='#A829E2' stopOpacity='10%' />
        </linearGradient>
        <linearGradient
          id='gradient3'
          x1='3.41005'
          y1='32.6313'
          x2='31.8682'
          y2='3.82129'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E50E99' />
          <stop offset='100%' stopColor='#A829E2' stopOpacity='10%' />
        </linearGradient>
        <linearGradient
          id='gradient4'
          x1='33.0317'
          y1='3.36871'
          x2='4.57097'
          y2='32.1761'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#21D4FD' />
          <stop offset='3%' stopColor='#27CDFC' stopOpacity='96%' />
          <stop offset='23%' stopColor='#4E9CF4' stopOpacity='70%' />
          <stop offset='43%' stopColor='#6E73EE' stopOpacity='49%' />
          <stop offset='61%' stopColor='#8753E9' stopOpacity='32%' />
          <stop offset='77%' stopColor='#993CE5' stopOpacity='20%' />
          <stop offset='90%' stopColor='#A42EE3' stopOpacity='13%' />
          <stop offset='100%' stopColor='#A829E2' stopOpacity='10%' />
        </linearGradient>
      </defs>

      <path className={`dark:fill-white`}
        d='M63.9815 27.6971H61.4524L59.3704 22.3187H50.4894L48.4074 27.6971H45.9074L53.5529 8.30026H56.3783L63.9815 27.6971ZM51.3386 20.1182H58.5079L54.9074 10.5635L51.3386 20.1182Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M71.7037 27.9925C70.3161 28.0052 68.9453 27.6926 67.7037 27.0804C66.5264 26.5139 65.5472 25.6129 64.8915 24.4931L66.9154 23.0531C67.3281 23.9309 67.9957 24.6678 68.8333 25.17C69.7573 25.7002 70.8129 25.9645 71.881 25.9331C72.9392 25.9331 73.7566 25.7345 74.3519 25.332C74.5772 25.1976 74.771 25.0172 74.9202 24.8029C75.0695 24.5887 75.1707 24.3455 75.2173 24.0895C75.2639 23.8335 75.2547 23.5707 75.1903 23.3185C75.1259 23.0663 75.0078 22.8306 74.8439 22.6271C74.5741 22.2786 74.0635 22.0286 73.3122 21.877L69.7408 21.1348C68.291 20.8421 67.2549 20.3525 66.6323 19.6661C66.0004 18.9638 65.6644 18.0493 65.6931 17.1101C65.688 16.3206 65.9331 15.5493 66.3942 14.9044C66.9016 14.2043 67.5894 13.6512 68.3863 13.3024C69.3457 12.8822 70.3873 12.6769 71.4365 12.7013C72.7305 12.6615 74.0126 12.9561 75.1561 13.5559C76.148 14.1039 76.9395 14.9471 77.418 15.9654L75.4233 17.2722C75.1327 16.4626 74.5495 15.7878 73.7857 15.3774C73.0666 14.9839 72.2586 14.7762 71.4365 14.7737C70.8133 14.7596 70.1927 14.8588 69.6058 15.0664C69.1521 15.2272 68.7514 15.5073 68.4471 15.8766C68.1783 16.2134 68.0358 16.6318 68.044 17.0606C68.0522 17.4894 68.2106 17.9022 68.4921 18.2287C68.7884 18.5911 69.343 18.8524 70.1561 19.0127L73.8757 19.7784C75.2654 20.052 76.2355 20.5024 76.7857 21.1296C77.344 21.7637 77.6413 22.5815 77.619 23.4216C77.6361 24.2872 77.3759 25.136 76.8757 25.8468C76.3504 26.566 75.628 27.1218 74.7937 27.4489C73.8106 27.8314 72.7601 28.0163 71.7037 27.9925V27.9925Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M90.3703 13.0018H92.9285L85.9391 30.1668C85.642 30.9811 85.2258 31.748 84.7037 32.4431C84.3138 32.9574 83.8037 33.3707 83.2169 33.6479C82.6214 33.9034 81.9771 34.0291 81.328 34.0164C80.6995 34.0219 80.0743 33.9275 79.4762 33.7367C78.939 33.565 78.4321 33.312 77.9735 32.9867L78.6269 30.9299C78.9951 31.2671 79.424 31.5331 79.8915 31.7139C80.3125 31.8803 80.7609 31.9689 81.2143 31.9753C81.7379 31.9722 82.2474 31.8077 82.6719 31.5049C83.127 31.1913 83.5432 30.5545 83.9206 29.5945L84.6931 27.684L83.2063 24.1873L78.4761 13.0175H81.1772L85.8174 24.2134L90.3703 13.0018Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M94.9735 27.6971V13.0018H97.0502L97.2566 16.2947L96.8703 15.9707C97.1438 15.2501 97.5819 14.6017 98.1507 14.0759C98.6824 13.5968 99.3148 13.2398 100.003 13.0306C100.711 12.8158 101.449 12.7075 102.19 12.7091C103.193 12.6965 104.187 12.9017 105.101 13.3102C105.966 13.7045 106.695 14.3405 107.198 15.1396C107.727 15.9637 107.992 17.0091 107.992 18.2757V27.6841H105.611V19.1146C105.611 17.4891 105.258 16.3566 104.553 15.7172C103.842 15.079 102.91 14.7371 101.95 14.7633C101.207 14.7703 100.475 14.9408 99.8068 15.2624C99.0692 15.6187 98.4538 16.1812 98.037 16.8801C97.5714 17.6258 97.3386 18.625 97.3386 19.8777V27.6945L94.9735 27.6971Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M117.251 12.7091C118.181 12.6912 119.105 12.851 119.974 13.1795C120.741 13.4831 121.436 13.9436 122.011 14.5307C122.599 15.1392 123.072 15.8474 123.407 16.6214L121.148 17.6668C120.895 16.8219 120.393 16.0705 119.706 15.5081C118.978 14.983 118.091 14.7185 117.19 14.758C116.291 14.7331 115.404 14.9625 114.632 15.4192C113.903 15.8776 113.332 16.5437 112.995 17.3297C112.243 19.2646 112.243 21.4057 112.995 23.3405C113.329 24.1319 113.9 24.8032 114.632 25.264C115.404 25.7207 116.291 25.9501 117.19 25.9252C117.877 25.9411 118.56 25.8211 119.198 25.5724C119.745 25.3515 120.226 24.9983 120.598 24.5453C120.979 24.0633 121.239 23.4991 121.357 22.8989L123.558 23.662C123.249 24.5153 122.779 25.3035 122.175 25.9853C121.591 26.6305 120.867 27.1378 120.058 27.4698C119.167 27.8283 118.211 28.006 117.249 27.9925C115.95 28.0139 114.667 27.6995 113.529 27.0804C112.433 26.4701 111.544 25.5548 110.971 24.4486C110.363 23.1655 110.048 21.7662 110.048 20.3495C110.048 18.9328 110.363 17.5334 110.971 16.2503C111.545 15.1447 112.434 14.2296 113.529 13.6186C114.668 12.9998 115.952 12.6862 117.251 12.7091Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M143.659 27.6971H140.296L138.423 22.614H130.183L128.307 27.6971H125.034L132.442 8.30026H136.251L143.659 27.6971ZM131.074 20.0555H137.526L134.312 11.0052L131.074 20.0555Z'
        fill='#0C0928'
      />
      <path className={`dark:fill-white`}
        d='M152.992 8.30024C154.248 8.26933 155.494 8.52043 156.638 9.03462C157.616 9.49485 158.441 10.2199 159.019 11.1254C159.584 12.1193 159.881 13.2402 159.881 14.3804C159.881 15.5205 159.584 16.6415 159.019 17.6354C158.443 18.5428 157.617 19.2684 156.638 19.7262C155.495 20.2425 154.248 20.4945 152.992 20.4631H148.619V27.6919H145.444V8.30024H152.992ZM152.487 17.7635C153.898 17.7635 154.934 17.4743 155.595 16.8958C156.257 16.3174 156.589 15.4802 156.593 14.3843C156.593 13.2692 156.26 12.4216 155.595 11.8414C154.93 11.2613 153.894 10.972 152.487 10.9738H148.619V17.7687L152.487 17.7635Z'
        fill='#0C0928'
      />
      <path d='M165 8.30026V27.6971H161.825V8.30026H165Z' fill='#0C0928' className={`dark:fill-white`} />
      <path
        d='M27.8228 0H8.61905C3.85888 0 0 3.8121 0 8.51456V27.4854C0 32.1879 3.85888 36 8.61905 36H27.8228C32.5829 36 36.4418 32.1879 36.4418 27.4854V8.51456C36.4418 3.8121 32.5829 0 27.8228 0Z'
        fill='url(#gradient1)'
      />
      <path
        d='M27.8228 0H8.61905C3.85888 0 0 3.8121 0 8.51456V27.4854C0 32.1879 3.85888 36 8.61905 36H27.8228C32.5829 36 36.4418 32.1879 36.4418 27.4854V8.51456C36.4418 3.8121 32.5829 0 27.8228 0Z'
        fill='url(#gradient2)'
      />
      <path
        d='M27.8228 0H8.61905C3.85888 0 0 3.8121 0 8.51456V27.4854C0 32.1879 3.85888 36 8.61905 36H27.8228C32.5829 36 36.4418 32.1879 36.4418 27.4854V8.51456C36.4418 3.8121 32.5829 0 27.8228 0Z'
        fill='url(#gradient3)'
      />
      <path
        d='M27.8228 0H8.61905C3.85888 0 0 3.8121 0 8.51456V27.4854C0 32.1879 3.85888 36 8.61905 36H27.8228C32.5829 36 36.4418 32.1879 36.4418 27.4854V8.51456C36.4418 3.8121 32.5829 0 27.8228 0Z'
        fill='url(#gradient4)'
      />
      <path
        d='M11.7645 14.1988L10.6799 15.6754L19.1508 21.749L19.209 21.7908L20.2936 20.3142L11.8227 14.2406L11.7645 14.1988Z'
        fill='white'
      />
      <path
        d='M17.2989 14.2406L17.2407 14.1988L16.1561 15.6754L24.627 21.749L24.6852 21.7908L25.7698 20.3142L17.2989 14.2406Z'
        fill='white'
      />
      <path
        d='M18.2275 6.64075C13.6349 6.64075 9.89948 9.46064 9.89948 12.9261V12.9966H11.7513V12.9261C11.7513 10.4668 14.6614 8.46492 18.2328 8.46492C21.8042 8.46492 24.7143 10.4668 24.7143 12.9261V12.9966H26.5661V12.9261C26.5556 9.46064 22.8201 6.64075 18.2275 6.64075Z'
        fill='white'
      />
      <path
        d='M24.6958 23.0714C24.6958 25.5306 21.7857 27.5325 18.2116 27.5325C14.6376 27.5325 11.7301 25.5306 11.7301 23.0714V23.0008H9.8783V23.0714C9.8783 26.5368 13.6137 29.3567 18.2063 29.3567C22.7989 29.3567 26.5344 26.5368 26.5344 23.0714V23.0008H24.6825L24.6958 23.0714Z'
        fill='white'
      />
      
    </svg>
  );
}
