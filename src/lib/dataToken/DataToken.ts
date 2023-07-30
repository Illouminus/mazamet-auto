import {NextRequest} from "next/server";
import jwt from 'jsonwebtoken'
import {NextApiRequest} from "next";

interface decodedTokenType {
    id?: string,
    username?: string,
    email?: string,
    admin?: boolean
}

export const getDataFromToken = (request: NextRequest ) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        return jwt.verify(token, process.env.SECRET!) as decodedTokenType
    } catch (error: any) {
        throw new Error(error.message)
    }
}
