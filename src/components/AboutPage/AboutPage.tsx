import { Fragment } from 'react';
import { FaCar, FaHistory, FaMedal, FaUsers, FaPhone } from 'react-icons/fa';

export function APropos() {
    return (
        <Fragment>
            <div className="container mx-auto px-4 py-8 mt-36">
                <h1 className="text-4xl font-bold mb-8 text-center">A Propos de MAZAMET PIECES AUTO</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded shadow-md">
                        <FaCar className="text-4xl mb-4" />
                        <h2 className="text-3xl font-semibold mb-4">Qui sommes-nous?</h2>
                        <p>
                            MAZAMET PIECES AUTO est votre partenaire de confiance pour toutes vos pièces auto.
                            Fondée en 2002, nous nous sommes engagés à fournir des pièces de qualité à des prix abordables.
                        </p>
                    </div>

                    <div className="p-6 border rounded shadow-md">
                        <FaHistory className="text-4xl mb-4" />
                        <h2 className="text-3xl font-semibold mb-4">Notre histoire</h2>
                        <p>
                            Depuis notre création, nous avons servi des milliers de clients satisfaits
                            et avons continué à élargir notre gamme de produits pour répondre à tous
                            vos besoins en matière de pièces auto.
                        </p>
                    </div>

                    <div className="p-6 border rounded shadow-md">
                        <FaMedal className="text-4xl mb-4" />
                        <h2 className="text-3xl font-semibold mb-4">Pourquoi nous choisir?</h2>
                        <ul className="list-disc pl-5">
                            <li>Qualité garantie</li>
                            <li>Prix compétitifs</li>
                            <li>Livraison rapide</li>
                            <li>Service clientèle exceptionnel</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded shadow-md">
                        <FaUsers className="text-4xl mb-4" />
                        <h2 className="text-3xl font-semibold mb-4">Notre équipe</h2>
                        <p>
                            Notre équipe est composée de professionnels passionnés
                            par l'automobile et dédiés à vous fournir le meilleur service possible.
                        </p>
                    </div>
                </div>

                <section className="mt-8 p-6 border rounded shadow-md">
                    <FaPhone className="text-4xl mb-4" />
                    <h2 className="text-3xl font-semibold mb-4">Contactez-nous</h2>
                    <p>
                        Si vous avez des questions ou souhaitez
                        en savoir plus sur nos produits, n'hésitez pas
                        à nous contacter via notre forme de contact.
                    </p>
                </section>
            </div>
        </Fragment>
    );
}
