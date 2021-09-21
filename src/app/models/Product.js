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
    urlImg0: { type: String },
    urlImg1: { type: String },
    urlImg2: { type: String },
    urlImg3: { type: String },
    urlImg4: { type: String },
    urlImg5: { type: String },
    urlImg6: { type: String },
    urlImg7: { type: String },
    urlImg8: { type: String },
    urlImg9: { type: String },
    urlImg10: { type: String },
    urlImg11: { type: String },
    slug: { type: String, slug: "title" },
},{
    timestamps: true,
});

const mongoose_delete = require('mongoose-delete');

Product.plugin(mongoose_delete,  { 
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Product', Product);
