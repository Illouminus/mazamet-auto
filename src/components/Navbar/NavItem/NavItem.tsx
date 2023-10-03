import {usePathname} from "next/navigation";
import Link from "next/link";
import cls from './NavItem.module.css'
import {FC} from "react";
import classNames from "classnames";
interface LinkProps {
    label: string;
    href: string;
}

interface NavItemProps {
    links: LinkProps[];
    onClick: () => void
}

export const NavItem: FC<NavItemProps> = ({links, onClick}) => {
    const pathName = usePathname()

    return (
       <>
           {links.map((link) => {
               const isActive = pathName === link.href

               return (
                   <Link
                       href={link.href}
                       key={link.label}
                       className={classNames(cls.link, isActive ? cls.active : '')}
                       onClick={onClick}
                   >{link.label}</Link>
               )
           })}
       </>
    );
};

