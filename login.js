let express=require("express");
let exp=express();
let sql=require('mysql');
let bodyparser=require('body-parser');
let connect =sql.createConnection({
    host:'localhost',
    database:'login',
    user:'root',
    password:'root'
})
exp.use(bodyparser.urlencoded({extended:true}));

exp.get("/",function(req,res){
    res.sendFile(__dirname+"/sigin.html");
})
exp.get("/sigin.html",function(req,res){
    res.sendFile(__dirname+"/sigin.html");
})
exp.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
exp.post("/insert",function(req,res){
    const input={
        username:req.body.username,
        Emailid:req.body.email,
        password:req.body.password
    }
    let sql=`insert login.signup set ?`;
    connect.query(sql,input,function(err,result){
        if(err) throw err;
        res.redirect("/");
    })
})
exp.post("/sigin",function(req,res){
    let password=req.body.password;
   // let sql=`select * from login.signup where Emailid='$[req.body.email}' and password='$[req.body.password]'`;
   let sql = `select * from login.signup where Emailid="${req.body.email}" and password="${req.body.password}"`;

   connect.query(sql,function(err,result){
        if(err){ throw err;}
       // console.log(req.body.password);
       console.log(result);
       //res.send(result);
        if(result.length>0){
            res.send("valid");
        }
        else{
            res.send("Invalid");
        }
    })
})

exp.listen("3000",function(){
    console.log("Redy..");
})