const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attribute = new Schema({
    name: { type:String },
    type: {type: String},
    arrayElement: [
        {
            name: {type: String},
        }
    ],
});

module.exports = mongoose.model('Attribute', Attribute);
