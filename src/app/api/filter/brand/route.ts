import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Marque from "@/models/Marque";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const brandId = request.nextUrl.searchParams.get('id');
        const brand = await Marque.findById(brandId).populate('categories');
        if (!brand) {
            return NextResponse.json({error: 'Brand not found'}, {status: 404});
        }
        return NextResponse.json(brand.categories);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
