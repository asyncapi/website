import { twMerge } from "tailwind-merge"

export default function Loader({ className = "", dark = false }) {
    return (
        <div className={twMerge(`w-fit flex flex-col m-auto ${className}`)}>
        <svg class={`animate-spin mx-auto border-4 border-t-transparent ${dark ? 'border-white' : 'border-black'} h-10 w-10 rounded-full`} viewBox="0 0 24 24"></svg>
        <div className={`my-2 ${dark ? 'text-white' : 'text-black'}`}>Waiting for response...</div>
        </div>
    )
}
