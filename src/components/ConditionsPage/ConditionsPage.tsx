"use client"
import { Fragment } from 'react';
import { motion } from 'framer-motion';

export function ConditionsGeneralesPage() {
    return (
        <Fragment>
            <div className="container mt-36 mx-auto flex flex-col px-4 py-8">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-center"
                >
                    Conditions Générales de Vente (CGV)
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">Produits</h2>
                    <p>Les photographies illustrant les
                        produits n&apos;entrent pas dans le champ contractuel.
                        Si des erreurs s&apos;y sont introduites, en aucun cas,
                        la responsabilité de MAZAMET PIECES AUTO ne pourra être engagée.</p>

                    <h2 className="text-2xl font-semibold mb-4 mt-6">Commande</h2>
                    <p>Les systèmes d&apos;enregistrement automatique sont considérés
                        comme valant preuve de la nature, du contenu et de la date de la commande.</p>

                    <h2 className="text-2xl font-semibold mb-4 mt-6">Livraison</h2>
                    <p>Les livraisons sont faites à l&apos;adresse indiquée dans le bon de commande.
                        Les risques sont à la charge de l&apos;acquéreur à compter du moment où les
                        produits ont quitté les locaux de MAZAMET PIECES AUTO.</p>

                    <h2 className="text-2xl font-semibold mb-4 mt-6">Rétractation</h2>
                    <p>Les acheteurs bénéficient d&apos;un délai de rétractation
                        de quatorze jours à compter de la livraison de leur commande pour faire retour
                        du produit au vendeur pour échange ou remboursement.</p>

                    <h2 className="text-2xl font-semibold mb-4 mt-6">Prix</h2>
                    <p>Les prix sont indiqués en euros et sont valables tant qu&apos;ils
                        sont affichés sur le site. Ils ne sont pas augmentés de la TVA, le statut
                        de micro-entrepreneur impliquant une franchise de TVA.</p>

                    <h2 className="text-2xl font-semibold mb-4 mt-6">Paiement</h2>
                    <p>Le prix est exigible immédiatement à la date de la commande.
                        Les modes de paiement acceptés sont : carte bancaire, PayPal, virement bancaire.</p>
                </motion.div>
            </div>
        </Fragment>
    );
}
