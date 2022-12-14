export default function Profile({profiles = [], className}) {
  if(profiles.length === 0){
    return null;
  }
    return (
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-5 border border-slate-100 mt-4 rounded drop-shadow-md">
        {profiles.map((profile) => (
          <a
            href={profile.link}
            key={profile.name}
            target="_blank"
            className="flex flex-col items-center"
            rel="noreferrer"
          >
            <img src={profile.avatar} alt={profile.name} className="rounded" />
            <span className="mt-2 text-sm underline decoration-secondary-300">
              {profile.name}
            </span>
          </a>
        ))}
      </div>
    );
}
