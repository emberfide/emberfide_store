const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Collection = new Schema({
    name: { type:String },
    img: { type: String },
});

module.exports = mongoose.model('Collection', Collection);
