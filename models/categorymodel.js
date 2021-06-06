var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var CategorySchema = new Schema({
    outletId : {type: mongoose.Schema.ObjectId, ref : 'OutletSchema',required : true},
    brandId :{type: mongoose.Schema.ObjectId, ref : 'BrandSchema',required : true},
    title: {type: String, required: true},
    type : {type: String, required: true},
    status:{type: Number, required: true}
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
})
var Category = mongoose.model("category", CategorySchema); 

module.exports = Category;
