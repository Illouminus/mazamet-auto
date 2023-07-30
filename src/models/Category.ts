const { Schema, model, models } = require('mongoose');

const CategorySchema = new Schema({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    model: { type: Schema.Types.ObjectId, ref: 'Model' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

CategorySchema.index({ name: 1, model: 1 }, { unique: true });
const Category = models.Category || model('Category', CategorySchema);
export default Category;
