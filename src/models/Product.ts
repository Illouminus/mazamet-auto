import { Schema, model, models } from 'mongoose';

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

// добавляем текстовый индекс для поля "name"
ProductSchema.index({ name: 'text' });

const Product = models.Product || model('Product', ProductSchema);

export default Product;
