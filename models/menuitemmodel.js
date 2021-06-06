var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var ItemSchema = new Schema({
    outletId : {type: mongoose.Schema.ObjectId, ref : 'outlet',required : true},
    categoryId :{type: mongoose.Schema.ObjectId, ref : 'category',required : true},
    brandId :{type: mongoose.Schema.ObjectId, ref : 'brand' ,required : true},
    title : String,
    cost:{
        type:Number,
        default:0
    },
    status:Number,
    available:{
        type:Number,
        default:100
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
})
var item = mongoose.model("item", ItemSchema);

module.exports = item;
