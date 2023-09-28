// db/models/index.js

const { model, Schema, models } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
    brand: {type: Schema.Types.ObjectId, ref: 'CarBrand', required: true},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    stripeProductID: { type: String, required: true },
    stripePriceID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// ProductSchema.index({ name: 'text' });

const CarBrandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    models: [{ type: Schema.Types.ObjectId, ref: 'Model' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ModelSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'CarBrand', required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const CategorySchema = new Schema({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    model: { type: Schema.Types.ObjectId, ref: 'Model' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const OrderSchema = new Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    items:
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ,
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Product = models.Product || model('Product', ProductSchema);
export const Model = models.Model || model('Model', ModelSchema);
export const Marque = models.CarBrand || model('CarBrand', CarBrandSchema);
export const Category = models.Category || model('Category', CategorySchema);

export const Order = models.Order || model('Order', OrderSchema);
