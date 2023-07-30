import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { customer, items, totalPrice } = await request.json();

        // Проверяем, что все необходимые данные предоставлены
        if (!customer || !items || !totalPrice) {
            return NextResponse.json({ error: "Missing required data" }, { status: 400 });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: "Items must be a non-empty array" }, { status: 400 });
        }

        // Проверяем, что товары существуют и доступны в достаточном количестве
        for (let item of items) {
            const product = await Product.findById(item.product).exec();

            // Проверяем, что товар существует
            if (!product) {
                return NextResponse.json({ error: `Product with id ${item.product} does not exist` }, { status: 404 });
            }

            // Проверяем, что товар доступен в достаточном количестве
            if (product.quantity < item.quantity) {
                return NextResponse.json({ error: `Not enough product in stock for product id: ${item.product}` }, { status: 400 });
            }

            // Уменьшаем количество товара на складе
            product.quantity -= item.quantity;
            await product.save();
        }

        // Создаем новый заказ
        const newOrder = new Order({
            customer,
            items,
            totalPrice,
            status: 'pending'
        });

        await newOrder.save();

        // Возвращаем данные о новом заказе
        return NextResponse.json(newOrder);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
