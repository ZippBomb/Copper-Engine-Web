import Link from "next/link"

import styles from "./page.module.css"

export default function Download() {

    return (
        <>
            <div className={styles.header}>
                <img src={"/screenshots/CopperPromotional.png"} alt="Copper-Editor screenshot"/>
                <div className={styles.headerContainer}>
                    <h1>Download</h1>
                    <h2>Get started with Copper-Engine</h2>
                    <div className={styles.button}>
                        <Link href="/">
                            <h3>Copper-Engine</h3>
                            <p>0.3</p>
                        </Link>
                    </div>
                    <p className={styles.date}>0.3.0.411 - 30 July 2026</p>
                </div>
            </div>
            <section id="instructions" className={styles.instructions}>
                <h2>Instructions</h2>
                <ul>
                    <li>Download and run the installer.</li>
                    <li>The Copper-Editor alongside the Copper-Launcher should be cleanly installed on your machine now</li>
                </ul>
            </section>
        </>
    )

}
