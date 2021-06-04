var outlet = require('../models/outlet');


module.exports = function (app) {
    app.post('/createOutlet',(req,res)=>{
        var qery = {
            "outletName" : req.body.outletName,
        }
        outlet.findOne(qery).then(data =>{
            console.log(data)
            if(data && data._id){
                res.json({
                    status: "Fail",
                    message: "Outlet Creation Failed",
                    error: "Outlet already exists the same name"
                  });
            }else{
                var outletdata = new outlet(req.body)
                outletdata.save().then((item)=>{
                    res.json({
                        status: "success",
                        message: "Outlet created successfully",
                        outlet: item
                      });
                })
                .catch(err=>{
                    console.log("erro",err)
                    res.json({
                        status: "Fail",
                        message: "Outlet Creation Failed",
                        error: err
                      });
                })
            }
        })
    })

    app.post('/updateOutlet',(req,res)=>{
        let id = req.body.id;
        outlet.finOneAndUpdate({'_id':id}).exec((err,data)=>{
            console.log(err,data)
        })
    })

    app.post('/updateOutlet',(req,res)=>{
        let id = req.query.id;
        try{
            const obj = {};
            if(req.body.title)obj.title = req.body.title
            outlet.updateOne({'_id':id},obj).exec((err,data)=>{
                if(err)res.json({status:0,error:err})
                else res.json({status:1,message:"updated successfully"})
            })
        }
        catch(err){
            res.status(500).json({status:0,error:err})
        }
       
})

    app.post('/deleteOutlet', (req,res)=>{
        let id = req.body.id;
      
    })
}
