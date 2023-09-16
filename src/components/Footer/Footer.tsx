import cls from './Footer.module.css'
import Link from "next/link";


export const Footer = () => {
    return (
        <footer className={cls.container}>
            <div className={cls.container_logo}>
                <img src="/images/icons/Logo_footer.svg" alt="logo"  className={cls.logo}/>
            </div>
            <div className={cls.information_block}>
                <ul className={cls.section}>
                    <Link href={'/about'} className={cls.link}>A PROPOS DE NOUS</Link>
                    <Link href={'/catalog'} className={cls.link}>CATALOG</Link>
                    <Link href={'/services'} className={cls.link}>NOS SERVICES</Link>
                </ul>

                <ul className={cls.section}>
                    <Link href={'/services'} className={cls.link}>CONDITIONS GENERALE</Link>
                    <Link href={'/services'} className={cls.link}>NOUS CONTACTER</Link>
                    <Link href={'/services'} className={cls.link}>NOUS TROUVER</Link>
                </ul>
            </div>
        </footer>
    );
};


