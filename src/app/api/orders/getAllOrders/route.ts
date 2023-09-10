import {NextRequest, NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/lib/dataToken/DataToken";
import {Order} from "@/models/Buisnes";

export async function GET(request: NextRequest) {
    try {
        await connect();
        // Проверка доступа администратора.
        const userData = await getDataFromToken(request);
        if (!userData.admin) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const orders = await Order.find({}).exec();
        return NextResponse.json(orders);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
