import cls from './Footer.module.css'


export const Footer = () => {
    return (
        <footer className={cls.container}>
            <div className={cls.container_logo}>
                <img src="/images/icons/Logo_footer.svg" alt="logo"  className={cls.logo}/>
            </div>
            <div >
                <ul className={cls.section}>
                    <li>FIRST</li>
                    <li>SECOND</li>
                    <li>THRITH</li>
                </ul>
            </div>
            <div >
                <ul className={cls.section}>
                    <li>FIRST</li>
                    <li>SECOND</li>
                    <li>THRITH</li>
                </ul>
            </div>
        </footer>
    );
};


