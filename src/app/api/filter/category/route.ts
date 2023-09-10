import {NextRequest, NextResponse} from "next/server";
import {Category, Product} from "@/models/Buisnes";
import {connect} from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const categoryId = request.nextUrl.searchParams.get('id');
        const category = await Category.findById(categoryId).populate('products').exec();
        if (!category) {
            return NextResponse.json({error: 'Category not found'}, {status: 404});
        }
        return NextResponse.json(category.products);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
