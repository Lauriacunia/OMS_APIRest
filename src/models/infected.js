const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfectedSchema = new Schema({
    first_name: String,
    last_name: String,
    country: String,
    live: Boolean,
    age: Number,
    infect_date: Number,
    female: Boolean
})

module.exports = mongoose.model('infected', InfectedSchema)