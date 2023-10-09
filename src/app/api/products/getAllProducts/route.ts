import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {Product} from "@/models/Buisnes";

interface IModel {
    _id: string;
    name: string;
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export async function GET(request: NextRequest) {
    try {
        await connect();
        const products = await Product.find().populate('brand').populate('model').populate('category').exec();
        if (!products) {
            return NextResponse.json({error: 'Model not found'}, {status: 404});
        }
        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
