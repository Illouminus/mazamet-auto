import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/lib/dataToken/DataToken";


export async function GET(request: NextRequest) {

    try {
    const userData = await getDataFromToken(request)
        return NextResponse.json({
            message: 'User Data',
            data: userData
        })
    } catch (error: any) {
        return NextResponse.json({
                error: error.message
            },
            {status: 500}
        )
    }
}
