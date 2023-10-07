"use client"
import React, {useState} from 'react';
import cls from './Sidebar.module.css'
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineHome, AiOutlinePlusCircle, AiOutlineUnorderedList} from "react-icons/ai";
import {CiDeliveryTruck} from "react-icons/ci";




export const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = (): void => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={classNames(cls.sidebar, {[cls.collapsed]: collapsed})}>
            <button
                onClick={onToggle}
                className={cls.collapseBtn}
            >
                {collapsed ?
                    <Image
                        src={'/images/icons/arrow_left.svg'}
                        alt={"home"}
                        width={30}
                        height={30}
                    />
                    :
                    <Image
                        src={'/images/icons/arrow_right.svg'}
                        alt={"home"}
                        width={30}
                        height={30}
                    />
                }
            </button>

            <div className={cls.items}>

                    <Link href={'/'} className={classNames(cls.item, {[cls.collapsedItem]: collapsed})}>
                        <AiOutlineHome />
                        <p className={cls.link}>Home</p>
                    </Link>

                    <Link href={'/admin/productForm'} className={classNames(cls.item, {[cls.collapsedItem]: collapsed})}>
                        <AiOutlinePlusCircle />
                        <p className={cls.link}>Ajouter</p>
                    </Link>


                    <Link
                        href={'/admin/commandes'}
                        className={classNames(cls.item, {[cls.collapsedItem]: collapsed})}>
                        <CiDeliveryTruck />
                        <p className={cls.link}>Commandes</p>
                    </Link>

                    <Link href={'/admin/products'} className={classNames(cls.item, {[cls.collapsedItem]: collapsed})}>
                        <AiOutlineUnorderedList />
                        <p className={cls.link}>Products</p>
                    </Link>
            </div>
        </div>
    );
};
