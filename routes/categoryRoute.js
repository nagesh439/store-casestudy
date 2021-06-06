var Category = require('../models/categoryModel');
const {auth} = require('../middleware/auth');






module.exports = function (app){
    app.post('/createCat',auth, (req,res)=>{
        var cat = new Category(req.body)
        cat.save().then(data=>{
            res.json({messeg:"success",data:data,status:200})
        })
        .catch(err=>{
            res.json({messeg:"fail",error:err,status:0})
        })
    })

    // http://localhost:3009/getCategories?id=60b9d38e963df3c1ba1be910
    app.get('/getCategories', (req,res)=>{
        Category.find({  "outletId": req.query.id})
        .populate('brandId')
        .lean().exec((err,data)=>{
            if(err){
                res.json({messeg:"fail",error:err,status:0})
            }else res.json({items:data,status:1})
            
        })
    })



    app.post('/updateCategory',auth,(req,res)=>{
            let id = req.query.id;
            try{
                const obj = {};
                if(req.body.title)obj.title = req.body.title
                Category.updateOne({'_id':id},obj).exec((err,data)=>{
                    if(err)res.json({status:0,error:err})
                    else res.json({status:1,message:"updated successfully"})
                })
            }
            catch(err){
                res.status(500).json({status:0,error:err})
            }
           
    })
}