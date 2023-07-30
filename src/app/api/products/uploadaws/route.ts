import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
const AWS  = require('aws-sdk')


const configAWS = {
    region: "eu-west-3",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: "v4",
};


const params = new AWS.S3(configAWS)


export async function POST(request: NextRequest) {
    try {
        await connect();
        let {name, type} = await request.json()
        console.log('NAME TO BACK FOR S3', name, type)

        const fileParams = {
            Bucket: "les-amoureuses",
            Key: name,
            Expires: 600,
            ContentType: type,
        };
        const url = await params.getSignedUrlPromise("putObject", fileParams)
        return NextResponse.json({url})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}


