import { Schema, model } from 'mongoose';

const CompanySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    products : { type: Schema.Types.ObjectId, ref:'Product' },
    createdAt  : { type: Date, default: Date.now },
    updatedAt  : Date
})

export default model('Company', CompanySchema)

