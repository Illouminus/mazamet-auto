import {NextRequest, NextResponse} from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import {connect} from "@/dbConfig/dbConfig";
import {Category, Marque, Product} from "@/models/Buisnes";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const product = await Product.findById(data.id);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: product.stripePriceID,
                    quantity: data.amount,
                },
            ],
            mode: 'payment',
            phone_number_collection: {
                enabled: true,
            },
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['FR'], // Список разрешенных стран для доставки
            },
            success_url: `${process.env.BASE_URL}/?success=true`,
            cancel_url: `${process.env.BASE_URL}/?canceled=true`,
            // automatic_tax: {enabled: true}
        });
        return NextResponse.json(session.url)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
