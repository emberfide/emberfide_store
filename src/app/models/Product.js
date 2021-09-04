const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    nameCollection: { type:String },
    title: { type: String },
    description: { type: String },
    realPrice: { type: Number },
    sellPrice: { type: Number },
    urlImg: { type: String },
},{
    timestamps: true,
});

module.exports = mongoose.model('Product', Product);
