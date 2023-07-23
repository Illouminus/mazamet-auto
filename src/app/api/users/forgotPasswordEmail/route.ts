import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import {sendEmail} from "@/lib/nodeMailer/nodeMailer";
 // Импортируем функцию отправки почты

type ForgotPasswordOptions = {
    email: string;
}

export async function POST(request: NextRequest) {
    const { email }: ForgotPasswordOptions = await request.json()

    // Validate input
    if (!email) {
        return NextResponse.json({ error: 'Email is required' },
            { status: 400 })
    }

    try {
        await connect()
        const user = await User.findOne({ email });
        if (!user) {

            return NextResponse.json({ error: 'No user with this email' },
                { status: 400 })
        }

        // Check SECRET is defined
        if (!process.env.SECRET) {

            return NextResponse.json({ error: 'Server error: secret key is not defined' },
                { status: 500 })
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: '1h' } // Expire in 1 hour
        )

        // Update user with the forgot password token and expiry
        user.forgotPasswordToken = token
        user.forgotPasswordTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
        await user.save()

        // Send email with the token
        const emailData = {
            to: email,
            subject: 'Réinitialisation du mot de passe',
            text: `Vous pouvez réinitialiser votre mot de passe en utilisant ce lien : ${process.env.BASE_URL}/reset-password/?token=${token}`,
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <h1 style="color: #444;">Réinitialisation du mot de passe</h1>
            <p style="color: #444; font-size: 18px;">Vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe.</p>
            <a href="${process.env.BASE_URL}/reset-password/?token=${token}" style="display: inline-block; color: #fff; background-color: #3498db; padding: 10px 20px; text-decoration: none; border-radius: 3px; margin-top: 15px;">Réinitialiser le mot de passe</a>
            <p style="color: #444; font-size: 14px; margin-top: 20px;">Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email ou répondre pour nous le faire savoir. Cette réinitialisation de mot de passe n'est valide que pour les 30 prochaines minutes.</p>
        </div>
    `
        }

         await sendEmail(emailData)


        return NextResponse.json({
            message: 'Password reset email sent',
            success: true
        })
    } catch (e: any) {
        return NextResponse.json({ error: `Server error: ${e.message}` },
            { status: 500 }
        )
    }
}
