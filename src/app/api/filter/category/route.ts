import {NextRequest, NextResponse} from "next/server";
import {Category, Marque, Model} from "@/models/Buisnes";
import {connect} from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const categoryId = request.nextUrl.searchParams.get('id');
        const category = await Category.findById(categoryId).populate('products').exec();
        const brand = await Marque.findById(category.products[0].brand)
        const model = await Model.findById(category.model)
        if (!category) {
            return NextResponse.json({error: 'Category not found'}, {status: 404});
        }
        return NextResponse.json({
            item: category.products,
            brand: brand,
            model: model,
            category: category.name
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
