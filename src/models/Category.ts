import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : Date
})

export default model('Category', CategorySchema)

