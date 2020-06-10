require('dotenv').config()
const express= require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index")
});
app.post("/",function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD,
        }
    });
    let mailOptions={
        form:"no-reply",
        to:email,
        subject:"This is auto generated mail form nodemailer",
        text:"Hey "+name+" you are awesome!"
    }
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log(err);
            res.redirect("/")
        }else{
            console.log(data);
            res.redirect("/")
        }
    })
})
app.listen(3000,function(){
    console.log("server spinning");
})
