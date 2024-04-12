import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, default: 'Sin descripción' },
    code: { type: String, required: true, unique: true, index: true },
    price: { type: Number, default: 1 },
    status: { type: Boolean, default: true },
    stock: { type: Number, default: 1 },
    category: { type: String, default: 'Otros', index: true },
    thumbnails: { type: [String], default: [] }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;