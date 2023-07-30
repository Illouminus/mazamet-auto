const { Schema, model, models } = require('mongoose');

const OrderSchema = new Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = models.Order || model('Order', OrderSchema);
export default Order;
