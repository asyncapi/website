export default function SilverSponsors({ className = '', showSupportBanner = true }){
    return(
        <div className={`text-center ${className}`}>
            <div className="flex flex-wrap mb-8 items-center justify-center md:px-4">
            <a
            href="https://bump.sh/asyncapi?utm_source=asyncapi&utm_medium=referral&utm_campaign=sponsor"
            target="_blank"
            className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
            rel="noopener noreferrer"
           >
            <img
            className="inline-block sm:h-9"
            src="/img/sponsors/bumpsh.svg"
            alt="Bump.sh"
          />
           </a>
            </div>
        </div>
    )

}
