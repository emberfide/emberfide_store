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
    urlImgGallery: { type: Array },
    slug: { type: String, slug: "title" },
    attribute: [
        {
            name: {type: String},
            arrayElement: [
                {
                    name:{type: String},
                }
            ]
        }
    ]
},{
    timestamps: true,
});

const mongoose_delete = require('mongoose-delete');

Product.plugin(mongoose_delete,  { 
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Product', Product);
