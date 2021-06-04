var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var CategorySchema = new Schema({
    outletId : {type: mongoose.Schema.ObjectId, ref : 'OutletSchema'},
    brandId :{type: mongoose.Schema.ObjectId, ref : 'BrandSchema'},
    title: String,
    type : String,
    status:Number
})
var Category = mongoose.model("category", CategorySchema); 

module.exports = Category;
