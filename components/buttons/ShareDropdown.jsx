import React, { useState, useRef, useEffect } from 'react';

/**
 * ShareDropdown Component (JSX Version)
 * Handles social sharing for Twitter, LinkedIn, and Clipboard.
 */
const ShareDropdown = ({ postTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copy Link');
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCopy = (e) => {
        e.preventDefault();
        const url = window.location.href;

        navigator.clipboard.writeText(url).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => {
                setCopyStatus('Copy Link');
                setIsOpen(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
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
                <div className="absolute right-0 bottom-full mb-2 w-52 rounded-xl bg-white shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                    <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                        Social Networks
                    </div>

                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors group"
                    >
                        <svg className="w-4 h-4 mr-3 text-black fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter / X
                    </a>

                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors group"
                    >
                        <svg className="w-4 h-4 mr-3 text-[#0077b5] fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>

                    <button
                        onClick={handleCopy}
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#bf21ba] transition-colors border-t border-gray-50 group"
                    >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#bf21ba] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        {copyStatus}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareDropdown;