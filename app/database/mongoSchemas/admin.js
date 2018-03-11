const mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({
  name: {type: String,require:true},
  pass: {type: String,require:true}
})
mongoose.model('Admin', adminSchema)