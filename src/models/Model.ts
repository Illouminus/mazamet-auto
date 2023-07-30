const { Schema, model, models } = require('mongoose');

const ModelSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Model = models.Model || model('Model', ModelSchema);
export default Model;
