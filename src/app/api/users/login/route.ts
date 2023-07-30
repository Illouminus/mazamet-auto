import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/User";
import {NextRequest, NextResponse} from 'next/server'
const bcrypt = require("bcrypt")
import jwt from 'jsonwebtoken'

type LoginInput = {
    username: string;
    password: string;
}


export async function GET (request: NextRequest) {
    const token = request.cookies.get('token')?.value || ''
    if (!token) {
        return NextResponse.json({isAuthenticated: false})
    }

    try {
        // Check SECRET is defined
        if (!process.env.SECRET) {
            return NextResponse.json({error: 'Server error: secret key is not defined'},
                {status: 500})
        }

        const tokenData: any = jwt.verify(token, process.env.SECRET)
        if (tokenData) {
            return NextResponse.json({
                isAuthenticated: true,
                username: tokenData.username,
                admin: tokenData.admin
            })
        } else {
            return NextResponse.json({isAuthenticated: false})
        }
    } catch (e: any) {
        return NextResponse.json({error: `Server error: ${e.message}`},
            {status: 500})
    }
}




export async function POST (request: NextRequest) {
    const { username, password }: LoginInput = await request.json()

    // Validate input
    if (!username || !password) {
        return NextResponse.json({error: 'Username and password are required'},
            {status: 400})
    }

    try {
        await connect()

        const user = await User.findOne({username});
        if (user && await bcrypt.compare(password, user.password)) {
            // Check SECRET is defined
            if (!process.env.SECRET) {
                return NextResponse.json({error: 'Server error: secret key is not defined'},
                    {status: 500})
            }

            // Create token
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email,
                admin: user.isAdmin
            }

            const token = jwt.sign(
                tokenData,
                process.env.SECRET,
                {expiresIn: '30d'}
            )

            const response = NextResponse.json({
                admin: user.isAdmin,
                username: user.username,
                isAuthenticated: true
            })

            response.cookies.set('token', token, {
                httpOnly: true
            })
            return response
        } else {
            return NextResponse.json({error: 'Username or password incorrect'},
                {status: 400})
        }

    } catch (e: any) {
        return NextResponse.json({error: `Server error: ${e.message}`},
            {status: 500}
        )
    }
}
