import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {Product, Model, Category, Marque} from '@/models/Buisnes';
import {log} from "util";

interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    brand: typeof Marque;
    category: typeof Category;
    model: typeof Model;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const products: IProduct[] = await Product.find().populate('category').populate('model').populate('brand').exec();
        const transformedProducts = products.map(product => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            images: product.images,
            brand: {
                id: product.brand._id,
                name: product.brand.name,
            },
            category: product.category.name,
            model: product.model.name,
            createdAt: product.createdAt.toISOString().substring(0,10),
        }));
        return NextResponse.json(transformedProducts);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
