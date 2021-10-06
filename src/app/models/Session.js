const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({
    cart: { type:String },
});

module.exports = mongoose.model('Session', Session);
