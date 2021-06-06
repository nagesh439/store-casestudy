var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
    // outletId : {type: mongoose.Schema.ObjectId, ref : 'Outlet'},
    // categoryId :{type: mongoose.Schema.ObjectId, ref : 'Category'},
    title : {type: String, required: true},
    status:{type: Number, required: true},
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
})
var brand = mongoose.model("brand", BrandSchema);

module.exports = brand;
