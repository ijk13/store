const express = require("express"); 
const bodyPars = require("body-parser"); // to parse post request body
const cors = require("cors"); // accept cross client request
let schema = require("./schema"); // 
let {nstore} = schema;
const app = express();
i=0
// using middle ware for parse and cross request
app.use(bodyPars());
// only allowing cros fom my site
app.use( cors({
    }));
app.post("/sl",(req,res)=>{
    const body = req.body;  // copying request body
    let val = new nstore({      // fitting request to menu schema
        brand:body.brand,
        product:body.product,
        price:body.price,
        unit:body.unit,
        _v:i
    });
    i=i+1;
     val.save().then(doc=>{   // saving new item to  mongoose
        res.write("sucess");
        res.end();
    }) 
});
app.get("/gl",(req,res)=>{
    nstore.find({},{__v:0,_id:0},(err,val)=>{ //request all data from menu collection
        res.send(val)  
    })
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server started lisening in port 3000.....");
})