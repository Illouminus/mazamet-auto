import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Marque from "@/models/Marque";
import { getDataFromToken } from "@/lib/dataToken/DataToken";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const categoryId = request.nextUrl.searchParams.get('id');
        if (!categoryId) {
            throw new Error('Missing category id');
        }
        const category = await Category.findById(categoryId)
            .populate('carBrand')
            .exec();
        if (!category) {
            return NextResponse.json({error: 'Category not found'}, {status: 404});
        }
        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { name, carBrandId } = await request.json();
        if (!name || !carBrandId) {
            throw new Error('Missing category name or carBrandId');
        }
        const carBrand = await Marque.findById(carBrandId);
        if (!carBrand) {
            throw new Error('Car brand not found');
        }
        const newCategory = new Category({
            name,
            carBrand: carBrandId
        });
        await newCategory.save();
        return NextResponse.json(newCategory);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connect();
        const userData = await getDataFromToken(request);
        if (!userData.admin) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const categoryId = request.nextUrl.searchParams.get('id');
        if (!categoryId) {
            throw new Error('Missing category id');
        }
        const { name, carBrandId } = await request.json();
        if (!name || !carBrandId) {
            throw new Error('Missing category name or carBrandId');
        }
        const carBrand = await Marque.findById(carBrandId);
        if (!carBrand) {
            throw new Error('Car brand not found');
        }
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
            name,
            carBrand: carBrandId
        }, { new: true }).exec();
        if (!updatedCategory) {
            return NextResponse.json({error: 'Category not found'}, {status: 404});
        }
        return NextResponse.json(updatedCategory);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connect();
        const userData = await getDataFromToken(request);
        if (!userData.admin) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const categoryId = request.nextUrl.searchParams.get('id');
        if (!categoryId) {
            throw new Error('Missing category id');
        }
        await Product.deleteMany({ category: categoryId }).exec();
        const deletedCategory = await Category.findByIdAndDelete(categoryId).exec();
        if (!deletedCategory) {
            return NextResponse.json({error: 'Category not found'}, {status: 404});
        }
        return NextResponse.json(deletedCategory);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
