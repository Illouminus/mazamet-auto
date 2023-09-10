import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {Category} from "@/models/Buisnes";

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
        const idModel = request.nextUrl.searchParams.get('model');
        const categories: IModel[] = await Category.find({ model: idModel});
        const transformedCategories = categories.map(category => ({ id: category._id, name: category.name }));
        if (!categories) {
            return NextResponse.json({error: 'Model not found'}, {status: 404});
        }
        return NextResponse.json(transformedCategories);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
