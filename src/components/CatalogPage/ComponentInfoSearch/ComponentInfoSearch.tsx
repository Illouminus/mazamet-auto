import React from 'react';
import cls from './ComponentInfoSearch.module.css'
import { HiArrowSmRight } from "react-icons/hi";
interface ComponentInfoSearchProps {
    infos?: string[]
}
export const ComponentInfoSearch = (props: ComponentInfoSearchProps) => {
    const { infos} = props
    return (
        <div className={cls.container}>
            <div className={cls.info_car}>
                {infos && infos[0]} <HiArrowSmRight /> {infos && infos[1]} <HiArrowSmRight />{infos && infos[2]}
            </div>
            <div className={cls.description}>
                Explorez notre vaste collection de pièces pour véhicules {infos && infos[0]},
                incluant les différents modèles de la gamme {infos && infos[0]} tels que la {infos && infos[1]},
                dans notre catégorie spéciale dédiée aux {infos && infos[2]}. Trouvez les composants
                les mieux adaptés à votre {infos && infos[0]} {infos && infos[1]} et optimisez ainsi les performances de
                votre véhicule pour une expérience de conduite optimale.
            </div>

            <div className={cls.filter_options}>
                <p>Affichage des {infos && infos[3]}  résultats</p>
                <select>
                    <option>Trier par default</option>
                    <option>Trier par popularité</option>
                    <option>Trier par date</option>
                </select>
            </div>
        </div>
    );
};

