var item = require('../models/menuitemmodel');






module.exports = function (app){
    app.post('/createItem', (req,res)=>{
        var mitem = new item(req.body)
        mitem.save().then(data=>{
            res.json({messeg:"success",data:data,status:200})
        })
        .catch(err=>{
            res.json({messeg:"fail",error:err,status:0})
        })
    })


    // http://localhost:3009/getItems?id=60b9d38e963df3c1ba1be910
    app.get('/getItems', (req,res)=>{
        item.find({  "outletId": req.query.id})
        .populate('categoryId brandId')
        .lean().exec((err,data)=>{
            if(err){
                res.json({messeg:"fail",error:err,status:0})
            }else res.json({items:data,status:1})
            
        })
    })

    // http://localhost:3009/updateItem?id=60b9d213f2c212bec5caa374
    app.post('/updateItem', (req,res)=>{
        let id = req.query.id;
        try{
            const obj = {
                cost :req.body.cost
            }
            item.updateOne({'_id':id},obj).exec((err,data)=>{
                if(err)res.json({status:0,error:err})
                else res.json({status:1,message:"updated successfully"})
            })
        }
        catch(err){
            res.status(500).json({status:0,error:err})
        }
       
    })
}