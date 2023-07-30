"use client"
import React, {useContext, useState} from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import axios from "axios";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/providers/AuthProvider/AuthProvider";


export const Navbar = () => {
    const router = useRouter()
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(prevState => !prevState);
    };


    const signOut = async () => {
            try {
                await axios.get('/api/users/logout')
                setIsAuthenticated(false)
                await  router.push('/login')
            } catch (error) {
                console.log(error)
            }

    }



    return (
        <nav className={styles.navbar}>
            <div className={styles.container_logo}>
                <Link href={"/"}>
                    <img src="/images/icons/Logo_svg.svg" alt="logo"/>
                </Link>

            </div>
            <div
                className={isOpen ? styles.cross : styles.burger}
                onClick={toggleNavbar}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                className={`${isOpen ? styles.menuOpen : styles.menuClose} ${isOpen ? '' : styles.hidden}`}
            />
            <div className={isOpen ? styles.menuOpen : styles.menuClose}>
                {isAuthenticated ? (
                    <>
                        <Link href={"/catalog"} className={styles.link} onClick={() => setIsOpen(false)}>Catalog</Link>
                        <Link href={"/about"} className={styles.link} onClick={() => setIsOpen(false)}>A propos</Link>
                        <Link href={"/services"} className={styles.link} onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href={"/admin"} className={styles.link} onClick={() => setIsOpen(false)}>Admin</Link>
                        <button className={styles.link} onClick={signOut} >Logout</button>
                    </>
                ) : (
                    <>
                        <Link href={"/catalog"} className={styles.link}>Catalog</Link>
                        <Link href={"/services"} className={styles.link}>Services</Link>
                        <Link href={"/about"} className={styles.link}>A propos</Link>
                        <Link href={"/login"} className={styles.link}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};


