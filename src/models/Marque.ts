const { Schema, model, models } = require('mongoose');

const CarBrandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Marque = models.CarBrand || model('CarBrand', CarBrandSchema);
export default Marque;
