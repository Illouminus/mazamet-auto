import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Order, Product } from "@/models/Buisnes";
import { StripeEvent } from "./stripeTypes";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = "whsec_S8Fr1SkFXySjoZtIOrmdBn4VP8PvqmRQ";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {

        // @ts-ignore
        const sig: string | string[] | undefined = request.headers['stripe-signature'];

        if (!sig) {
            const headersKeys = Object.keys(request.headers).join(', ');
            console.error("No stripe-signature header found in the request.");
            return NextResponse.json({
                error: `No stripe-signature header found. Available headers: ${headersKeys}. SIG: ${sig} SECRET: ${endpointSecret}`
            }, { status: 400 });
        }

        let event: StripeEvent;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err: any) {
            return NextResponse.json({ error: `Webhook Error: ${err.message} SIG: ${sig} SECRET: ${endpointSecret}` }, { status: 400 });
        }

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;

                await connect();

                // Извлечь информацию о заказе из объекта сессии
                const customerEmail = session.customer_details.email;
                const customerName = session.customer_details.name;
                const totalPrice = session.amount_total;
                const productId = session.metadata.productId;
                const productQuantity = session.metadata.quantity;
                const customerAddress = [session.shipping_details.address.city, session.shipping_details.address.postal_code, session.shipping_details.address.line1,]

                // Создать новый заказ
                const newOrder = new Order({
                    customer: {
                        name: customerName,
                        email: customerEmail,
                        address:customerAddress.toString()
                    },
                    items: {
                        product: productId,
                        quantity: productQuantity
                    },
                    totalPrice,
                });

                await newOrder.save();

                //return NextResponse.json(newOrder);

            default:
                console.log(`Unhandled event type ${event.type}`);
                return NextResponse.json({ message: `Unhandled event type ${event.type}` });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
