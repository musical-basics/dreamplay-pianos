import React from 'react';

export function AnnouncementBanner() {
    return (
        <div className="w-full bg-amber-400 text-black py-1.5 px-4 text-center z-[9999] relative">
            <p className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Prices go up in April 2026 to $1099 MSRP.
            </p>
        </div>
    );
}
