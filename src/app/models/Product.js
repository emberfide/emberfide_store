const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Product = new Schema({
    nameCollection: { type:String },
    title: { type: String },
    description: { type: String },
    realPrice: { type: Number },
    sellPrice: { type: Number },
    urlImg: { type: String },
    slug: { type: String, slug: "title" },
},{
    timestamps: true,
});

module.exports = mongoose.model('Product', Product);
