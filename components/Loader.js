import { twMerge } from "tailwind-merge"

export default function Loader({ className = "" }) {
    return (
        <div className="w-fit flex flex-col m-auto">
        <svg class="animate-spin mx-auto border-4 border-t-transparent border-white h-10 w-10 rounded-full" viewBox="0 0 24 24"></svg>
        <div className="text-white my-2">Waiting for response...</div>
        </div>
    )
}
