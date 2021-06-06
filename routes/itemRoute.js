var item = require('../models/menuitemmodel');
const {auth} = require('../middleware/auth');






module.exports = function (app){
    app.post('/createItem',auth, (req,res)=>{
        var mitem = new item(req.body)
        mitem.save().then(data=>{
            res.json({messeg:"success",data:data,status:200})
        })
        .catch(err=>{
            res.json({messeg:"fail",error:err,status:0})
        })
    })


    // http://localhost:3009/getItems?id=60b9d38e963df3c1ba1be910
    app.get('/getItems' ,(req,res)=>{
        item.find({  "outletId": req.query.id})
        .populate('categoryId brandId')
        .lean().exec((err,data)=>{
            if(err){
                res.json({messeg:"fail",error:err,status:0})
            }else res.json({items:data,status:1})
            
        })
    })

    // http://localhost:3009/updateItem?id=60b9d213f2c212bec5caa374
    app.post('/updateItem',auth, (req,res)=>{
        let id = req.query.id;
        try{
            const obj = {}
            // if(req.body.cost){
            //     obj.cost = req.body.cost
            // }
            // if(req.body.title){
            //     obj.title = req.body.title
            // }
            item.updateOne({'_id':id},req.body).exec((err,data)=>{
                if(err)res.json({status:0,error:err})
                else res.json({status:1,message:"updated successfully"})
            })
        }
        catch(err){
            res.status(500).json({status:0,error:err})
        }
       
    })
}