// db/models/index.js

const { model, Schema, models } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const ModelSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const CarBrandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const CategorySchema = new Schema({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    model: { type: Schema.Types.ObjectId, ref: 'Model' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Product = models.Product || model('Product', ProductSchema);
export const Model = models.Model || model('Model', ModelSchema);
export const Marque = models.CarBrand || model('CarBrand', CarBrandSchema);
export const Category = models.Category || model('Category', CategorySchema);
