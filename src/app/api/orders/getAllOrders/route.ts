import {NextRequest, NextResponse} from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/lib/dataToken/DataToken";
import {Order} from "@/models/Buisnes";

export async function GET(request: NextRequest) {
    try {
        await connect();
        // const userData = await getDataFromToken(request);
        // if (!userData.admin) {
        //    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        // }

        const orders = await Order.find().populate('items.product').exec();
        if (!orders)
            return NextResponse.json({ error: "Error to find the orders in BD" }, { status: 501 });
        return NextResponse.json(orders);

    } catch (error: any) {
        console.log('ERROR', error)
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
