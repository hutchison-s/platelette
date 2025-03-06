'use client'

export default function DateString({time}: {time: number | string}) {
    const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const d = new Date(time);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
         month: 'short',
         day: 'numeric',
         hour: 'numeric',
         minute: '2-digit',
         timeZone: tz
    }).format(d);
    return <span>{formattedDate}</span>
}