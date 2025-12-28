import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Next.js + .NET API Integration",
    description: "Next.js ile .NET Web API entegrasyonu örnek projesi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
