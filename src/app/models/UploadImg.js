const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadImg = new Schema({
    path: { type:String },
});

module.exports = mongoose.model('UploadImg', UploadImg);
