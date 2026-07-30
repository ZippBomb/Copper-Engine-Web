import { Metadata } from "next"

import styles from "./layout.module.css"

const title = "Download | Copper-Engine";
export const metadata: Metadata = {
    metadataBase: new URL("https://coppr.dev"),
    title: title,
    description: "Download the latest version of Copper-Engine or browse the archived versions.",
    openGraph: {
        title: title,
        siteName: "Copper-Engine",
        description: "Download and install the Copper-Engine level editor and launcher all in one simple installer.",
        type: "website",
        url: "https://coppr.dev/download",
        images: {
            url: "screenshots/CopperPromotional.png",
            width: 1200,
            height: 630,
            alt: "Copper-Engine Download",
        },
        locale: "en_US",
    }
}

export default function DownloadLayout({ children } : { children: React.ReactNode }) {

    return (
        <main className={styles.main}>
            {children}
        </main>
    )

}
