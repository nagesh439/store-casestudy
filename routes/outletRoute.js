var outlet = require('../models/outlet');
const {auth} = require('../middleware/auth');


module.exports = function (app) {
    app.post('/createOutlet',auth,(req,res)=>{
        var qery = {
            "outletName" : req.body.outletName,
        }
        try{
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
        }
        catch(err){
            console.error(err);
            res.status(400).send(err)
        }
      
    })

    app.post('/updateOutlet',auth,(req,res)=>{
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
