import React, { useState, useRef, useEffect } from 'react';

interface ShareDropdownProps {
    postTitle: string;
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({ postTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copy Link');
    const [currentUrl, setCurrentUrl] = useState('');
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Set URL safely (SSR-safe)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!currentUrl) return;

        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => {
                setCopyStatus('Copy Link');
                setIsOpen(false);
            }, 2000);
        });
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            postTitle
        )}&url=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentUrl
        )}`,
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Share this blog post"
                className="flex items-center justify-between px-3 py-1.5 h-9 w-28 rounded bg-[#bf21ba] hover:bg-[#a11ba0] transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-md group"
            >
                <svg className="w-4 h-4 text-white fill-current mr-2" viewBox="0 0 512 512">
                    <path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z" />
                </svg>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider mx-auto">
                    {isOpen ? 'Close' : 'Share'}
                </span>
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 bottom-full mb-2 w-52 rounded-xl bg-white shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                >
                    <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                        Social Networks
                    </div>

                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors group"
                    >
                        Twitter / X
                    </a>

                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors group"
                    >
                        LinkedIn
                    </a>

                    <button
                        onClick={handleCopy}
                        role="menuitem"
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors border-t border-gray-50 group"
                    >
                        {copyStatus}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareDropdown;
