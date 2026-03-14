import NewsletterPopup from "@/components/NewsletterPopup";

export default function V0PagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <NewsletterPopup />
        </>
    );
}
