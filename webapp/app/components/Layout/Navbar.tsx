"use client"

import Link from "next/link"
import Image from "next/image"

import Logo from "@/public/Logo.ico"

import { useState } from "react"

import styles from "./Navbar.module.css"

export default function Navbar() {

    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src={Logo} alt="Logo" width={20} height={20}/>
            </div>
            <Link href="/">
                <p>Home</p>
            </Link>
            <Link href="/download">
                <p>Download</p>
            </Link>
            <Link href="/about?view=overview">
                <p>About</p>
            </Link>
            <Link href="/blog">
                <p>Blog</p>
            </Link>
            <div className={styles.learn} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <p>Learn</p>
                {open && (
                    <div className={styles.dropdown}>
                        <Link href="/guide"><p>Guide</p></Link>
                        <Link href="/docs"><p>Docs</p></Link>
                    </div>
                )}
            </div>
        </nav>
    )

}
