import { redirect } from "next/navigation"

interface PageProps {
    searchParams: Promise<Record<string, string | string[]>>
}

export default async function HomePage({ searchParams }: PageProps) {
    const params = await searchParams
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, val]) => {
            acc[key] = Array.isArray(val) ? val[0] : val
            return acc
        }, {} as Record<string, string>)
    ).toString()

    redirect(queryString ? `/premium-offer?${queryString}` : "/premium-offer")
}
