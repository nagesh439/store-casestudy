var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var OutletSchema = new Schema({
    outletName:String,
    country:String,
    city:String,
    outletAddress:String,
    phNo: String,
    type:String,
    status:Number,
    email:String,
    settings:{
        enable:{
            type:Boolean,
            default:true
        },
        acceptOrders:{
            type:Boolean,
            default:true
        },
        enableOffers:{
            type:Boolean,
            default:false
        }
    }
})
var outlet = mongoose.model("outlet", OutletSchema);

module.exports = outlet;
