import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getJourneyById } from '@/actions/admin-actions';

const DEFAULT_TEXT = 'Last week! The DreamPlay One gets replaced by the DreamPlay Pro next week at $1,899.';

export async function AnnouncementBanner() {
    // Read the journey cookie server-side (no client JS, no flash)
    const cookieStore = await cookies();
    const journeyId = cookieStore.get('dp_journey_id')?.value;

    let text = DEFAULT_TEXT;

    if (journeyId) {
        const journey = await getJourneyById(journeyId);
        if (journey?.announcementText) {
            text = journey.announcementText;
        }
    }

    return (
        <Link href="/customize" className="block w-full bg-amber-400 text-black py-1.5 px-4 text-center z-[9999] relative hover:bg-amber-300 transition-colors">
            <p className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                {text}
            </p>
        </Link>
    );
}
