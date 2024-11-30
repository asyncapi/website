import React from 'react';

type Profile = {
  name: string;
  link: string;
  avatar: string;
};

interface ProfileProps {
  profiles?: Profile[];
}

/**
 * This component displays list of profiles.
 * @param {ProfileProps} props - The props for the Profiles component
 * @param {Profile[]} props.profiles - List of profiles
 */
export default function Profiles({ profiles = [] }: ProfileProps) {
  if (profiles.length === 0) {
    return null;
  }

  return (
    <div
      className='mt-4 grid grid-cols-2 gap-5 rounded border border-slate-100 p-4 drop-shadow-md sm:grid-cols-4'
      data-testid='Profiles-main'
    >
      {profiles.map((profile) => (
        <a
          data-testid='Profiles-link'
          href={profile.link}
          key={profile.name}
          target='_blank'
          className='flex flex-col items-center'
          rel='noreferrer'
        >
          <img src={profile.avatar} alt={profile.name} className='rounded' />
          <span className='mt-2 text-sm underline decoration-secondary-300'>{profile.name}</span>
        </a>
      ))}
    </div>
  );
}
