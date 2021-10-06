const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attribute = new Schema({
    name: { type:String },
    typeAttribute: {type: String},
    nameElement: { type:Array },
});

module.exports = mongoose.model('Attribute', Attribute);
