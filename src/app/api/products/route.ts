import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {Marque, Product, Model, Category} from "@/models/Buisnes";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


interface ProductData {
    name: string;
    price: number;
    quantity: number;
    description: string;
    images: string[];
    brand: string;
    model: string;
    category: string;
}

const checkExistsOrCreate = async (type: 'Brand' | 'Model' | 'Category', name: string, parent?: string,) => {
    let existingEntity = null;

    switch(type) {
        case 'Brand':
            existingEntity = await Marque.findOne({ name });
            if (!existingEntity) {
                existingEntity = await new Marque({ name }).save();
            }
            break;
        case 'Model':
            existingEntity = await Model.findOne({ name,  brand: parent });
            if (!existingEntity && parent) {
                existingEntity = await new Model({ name, brand: parent }).save();
            }
            break;
        case 'Category':
            existingEntity = await Category.findOne({ name, model: parent });
            if (!existingEntity) {
                if (parent) {
                    existingEntity = await new Category({ name, model: parent}).save();
                } else {
                    throw new Error(`Model for Category ${name} not found`);
                }
            }
            break;
    }

    if (!existingEntity) throw new Error(`${type} not found or could not be created`);

    return existingEntity;
}

export async function GET(request: NextRequest) {
    try {
        await connect();
        const productId = request.nextUrl.searchParams.get('id');
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({error: 'Product not found'}, {status: 404});
        }
        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        const {
            name,
            price,
            quantity,
            description,
            images,
            brand: brandName,
            model: modelName,
            category: categoryName
        }: ProductData = await request.json();
        const brand = await checkExistsOrCreate('Brand', brandName);
        const model = await checkExistsOrCreate('Model', modelName,  brand._id);
        const category = await checkExistsOrCreate('Category', categoryName, model._id);



        const product = await stripe.products.create({
            name: name,
            description: description,
            images: images,
        });


        const stripePrice = await stripe.prices.create({
            unit_amount: price * 100,
            currency: 'eur',
            product: product.id,
        });



        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            images,
            brand: brand._id,
            model: model._id,
            category: category._id,
            stripeProductID: product.id, // Сохраните идентификатор продукта Stripe
            stripePriceID: stripePrice.id, // Сохраните идентификатор цены Stripe
        });
        category.products.push(newProduct._id);
        category.save()
        await newProduct.save();
        if (newProduct) {
            console.log('STRIPE', product);
            return NextResponse.json(newProduct);
        } else {
            return NextResponse.json({ error: "Error on create stripe product" }, { status: 500 });
        }


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connect();
        const productId = request.nextUrl.searchParams.get('id');
        const {
            name,
            price,
            quantity,
            description,
            images,
            brand: brandName,
            model: modelName,
            category: categoryName
        }: ProductData = await request.json();

        const brand = await checkExistsOrCreate('Brand', brandName);
        const model = await checkExistsOrCreate('Model', modelName, brand._id);
        const category = await checkExistsOrCreate('Category', categoryName, model._id);

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            quantity,
            description,
            images,
            brand: brand._id,
            model: model._id,
            category: category._id
        }, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({error: 'Product not found'}, {status: 404});
        }

        return NextResponse.json(updatedProduct);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connect();
        const productId = request.nextUrl.searchParams.get('id');

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return NextResponse.json({error: 'Product not found'}, {status: 404});
        }
        return NextResponse.json(deletedProduct);
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
