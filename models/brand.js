var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
    // outletId : {type: mongoose.Schema.ObjectId, ref : 'Outlet'},
    // categoryId :{type: mongoose.Schema.ObjectId, ref : 'Category'},
    title : String,
    status:Number
})
var brand = mongoose.model("brand", BrandSchema);

module.exports = brand;
