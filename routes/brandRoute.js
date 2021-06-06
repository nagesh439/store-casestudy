var brand = require('../models/brand');
const {auth} = require('../middleware/auth');


module.exports = function (app){
    app.post('/createBrand',auth, (req,res)=>{
        var dbrand = new brand(req.body)
        dbrand.save().then(data =>{
            res.json({status:200,message:"success",data:data})
        }).catch(err=>{
            res.json({status:0,message:"fail",error:err})
        })
    })


    app.get('/getBrands',(req,res)=>{
        brand.find().then(data=>{
            res.json({brands:data,status:1})
        })
    })

    app.post('/updateBrand',auth,(req,res)=>{
        let id = req.body.id;
        brand.finOneAndUpdate({'_id':id}).exec((err,data)=>{
            console.log(err,data)
        })
    })
}