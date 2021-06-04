var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var ItemSchema = new Schema({
    outletId : {type: mongoose.Schema.ObjectId, ref : 'outlet'},
    categoryId :{type: mongoose.Schema.ObjectId, ref : 'category'},
    brandId :{type: mongoose.Schema.ObjectId, ref : 'brand'},
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
})
var item = mongoose.model("item", ItemSchema);

module.exports = item;
