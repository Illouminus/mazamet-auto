import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {Model} from "@/models/Buisnes";

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
        const brandId = request.nextUrl.searchParams.get('brand');
        const models:IModel[] = await Model.find({ brand: brandId }).lean();
        const transformedBrands = models.map(model => ({ id: model._id, name: model.name }));
        if (!models) {
            return NextResponse.json({error: 'Brand not found'}, {status: 404});
        }
        return NextResponse.json(transformedBrands);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
