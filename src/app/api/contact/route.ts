import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from "@/lib/nodeMailer/nodeMailer";

type ContactFormOptions = {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: NextRequest) {
    const { name, email, message }: ContactFormOptions = await request.json();

    // Valider les entrées
    if (!name || !email || !message) {
        return NextResponse.json({ erreur: 'Tous les champs sont obligatoires' },
            { status: 400 });
    }

    try {
        await connect();

        const emailAdmin = process.env.EMAIL_ADMIN;
        if (!emailAdmin) {
            return NextResponse.json({ erreur: 'Erreur du serveur: EMAIL_ADMIN non défini' },
                { status: 500 });
        }

        // Préparer les données de l'email
        const emailData = {
            to: emailAdmin,
            from: email,
            subject: 'Nouveau message de contact',
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                    <h1 style="color: #444;">Nouveau message de contact</h1>
                    <p><strong>Nom:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        };

        await sendEmail(emailData);

        return NextResponse.json({
            message: 'Message de contact envoyé avec succès',
            succes: true
        });
    } catch (e: any) {
        return NextResponse.json({ erreur: `Erreur du serveur: ${e.message}` },
            { status: 500 });
    }
}
