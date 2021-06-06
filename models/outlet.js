var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var OutletSchema = new Schema({
    outletName:{type: String, required: true},
    country:{type: String, required: true},
    city:{type: String, required: true},
    outletAddress:{type: String, required: true},
    phNo: {type: String, required: true},
    type:{type: String},
    status:{type: Number, required: true},
    email:{type: String, required: true},
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
    },
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
})
var outlet = mongoose.model("outlet", OutletSchema);

module.exports = outlet;
