"use client"
import React, {useCallback, useContext, useState} from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import axios from "axios";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/providers/AuthProvider/AuthProvider";
import {NavItem} from "./NavItem/NavItem";




export const Navbar = () => {
    const router = useRouter()
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);



    const links = isAuthenticated ? [
        { href: '/catalog', label: 'Catalog' },
        { href: '/about', label: 'A propos' },
        { href: '/services', label: 'Services' },
        { href: '/admin', label: 'Admin' }
    ] : [
        { href: '/catalog', label: 'Catalog' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'A propos' },
        { href: '/login', label: 'Login' }
    ];
    const toggleNavbar = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);
    const closeMobileMenu = useCallback(() => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    }, []);

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
                onClick={() => toggleNavbar()}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                className={`${isOpen ? styles.menuOpen : styles.menuClose} ${isOpen ? '' : styles.hidden}`}
            />
            <div className={isOpen ? styles.menuOpen : styles.menuClose}>
                <NavItem links={links} onClick={closeMobileMenu}/>
                {isAuthenticated && (
                    <button onClick={signOut} className={styles.link}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};


