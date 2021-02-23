import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    _id        : { type: Schema.Types.ObjectId, auto: true },
    catgoryId  : { type: Schema.Types.ObjectId, required: false },
    title      : { type: String, required: true },
    sku        : { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    // image      : { type: String, required: false },
    active      : { type: Boolean, default: true },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : Date
});

export default model('Product', ProductSchema);