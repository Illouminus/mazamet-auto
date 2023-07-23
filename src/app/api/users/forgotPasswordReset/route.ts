import {NextRequest, NextResponse} from 'next/server'
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/User'

const bcrypt = require("bcrypt")

type ResetPasswordOptions = {
    token: string
    newPassword: string
}

export async function POST(request: NextRequest) {
    const { token, newPassword }: ResetPasswordOptions = await request.json()
    // Validate input
    if (!token || !newPassword) {
        return NextResponse.json(
            { error: 'Token and new password are required' },
            { status: 400 }
        )
    }

    try {
        await connect()

        const user = await User.findOne({ forgotPasswordToken: token })
        if (!user || user.forgotPasswordTokenExpiry < new Date()) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 400 }
            )
        }

        // Hash the new password
        // Update the user's password and remove the reset token
        user.password = await bcrypt.hash(newPassword, 10)
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: 'Password reset successful',
            success: true
        })
    } catch (e: any) {
        return NextResponse.json(
            { error: `Server error: ${e.message}` },
            { status: 500 }
        )
    }
}
