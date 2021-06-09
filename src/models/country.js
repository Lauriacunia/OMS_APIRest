const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
     name: String,
     infected: Number,
})


module.exports = mongoose.model('country', CountrySchema)