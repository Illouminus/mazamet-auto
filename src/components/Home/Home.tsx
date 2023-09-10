import React from 'react';
import Image from "next/image";
import cls from './Home.module.css'
import classNames from "classnames";
import {acme} from "@/lib/fonts/fonts";
import carImage from "../../../public/images/img/Car_filter.png"
export const HomeComponent = () => {

    return (
        <div className={cls.container}>
            <div className={classNames(cls.container_car, acme.className)}>
                <Image
                    src={carImage}
                    placeholder={"blur"}
                    priority
                    fill
                    style={{
                        objectFit:"cover",
                        objectPosition:"center"
                    }}
                    className={cls.car_image}
                    alt={'Image of car'}
                />
                <h1 className={cls.text}>MAZAMET - PIECES AUTO</h1>
                <h2>
                    Découvrez notre garage en ligne pour des pièces auto de
                    toutes marques, livrées rapidement et à des prix compétitifs.
                    Nous sommes à votre service pour tous vos besoins en pièces détachées.
                </h2>
            </div>

            <div className={cls.container_catalog_link}>
                <button>
                    VOIR LE CATALOG
                </button>
            </div>

            <div className={cls.container_car_parts}>
                <div>
                    <Image
                        src={'/images/car_parts/car_wheel.png'}
                        priority={false}
                        height={200}
                        width={200}
                        style={{
                            objectFit:"contain",
                            objectPosition:"center"
                        }}
                        alt={'Image of car'}
                    />
                    <h3>Des roues</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                </div>
                <div>
                    <Image
                        src={'/images/car_parts/car_moteur.png'}
                        height={200}
                        width={200}
                        style={{
                            objectFit:"contain",
                            objectPosition:"center"
                        }}
                        alt={'Image of car'}
                    />
                    <h3>Des moteurs</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                </div>
                <div>
                    <Image
                        src={'/images/car_parts/car_frain.png'}
                        width={200}
                        height={200}
                        style={{
                            objectFit:"cover",
                            objectPosition:"center"
                        }}
                        alt={'Image of car'}
                    />
                    <h3>Des frains</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                </div>
                <div>
                    <Image
                        src={'/images/car_parts/car_alternateur.png'}
                        priority={false}
                        width={200}
                        height={200}
                        style={{
                            objectFit:"contain",
                            objectPosition:"center"
                        }}
                        alt={'Image of car'}
                    />
                    <h3>Des alternateurs</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                </div>
            </div>

            <div className={cls.container_car_full}>
                <div className={cls.container_car_full_center}>
                    <div>
                        <Image
                            src={'/images/car/bmw.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"contain",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />

                    </div>
                    <div>
                        <Image
                            src={'/images/car/bike.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"contain",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/images/car/quad.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"cover",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

