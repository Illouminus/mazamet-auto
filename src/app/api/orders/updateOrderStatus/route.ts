import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/lib/dataToken/DataToken";
import Order from "@/models/Order";

export async function updateOrderStatus(request: NextRequest) {
    try {
        await connect();
        // Проверка доступа администратора.
        const userData = await getDataFromToken(request);
        if (!userData.admin) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const orderId = request.nextUrl.searchParams.get('id');
        if (!orderId) {
            throw new Error('Missing order id');
        }

        const { status } = await request.json();
        if (!status) {
            throw new Error('Missing order status');
        }

        if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            throw new Error('Invalid order status');
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).exec();

        if (!updatedOrder) {
            return NextResponse.json({error: 'Order not found'}, {status: 404});
        }

        return NextResponse.json(updatedOrder);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
