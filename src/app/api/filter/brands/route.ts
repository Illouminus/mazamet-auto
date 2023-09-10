import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {Marque} from "@/models/Buisnes";

interface IBrand {
    _id: string;
    name: string;
    models: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}


export async function GET(request: NextRequest) {
    try {
        await connect();
        const brands: IBrand[] = await Marque.find();
        const transformedBrands = brands.map(brand => ({ id: brand._id, name: brand.name }));
        return NextResponse.json(transformedBrands);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
