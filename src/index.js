const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
app.use(express.static(path.join(__dirname,"views")))

const nodemailer=require("nodemailer");

const collection=require("./signupmongodb")
const collection2=require("./post")
const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.set("view engine","html")

app.set("views",templatePath) 
app.use(express.urlencoded({
    extended:false
}))

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.get("/compute",(req,res)=>{
    res.render("compute");
})
app.get("/storage",(req,res)=>{
    res.render("storage");
})
app.get("/compute-engine",(req,res)=>{
    res.render("compute-engine");
})
app.get("/deploy",(req,res)=>{
    res.render("deploy");
})
app.get("/after-deploy",(req,res)=>{
    res.render("after-deploy");
})

function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  }
  

app.post("/signup",async (req,res)=>{

    const data={
        firstname:req.body.firstname,
        lastname:req.body.lasttname,
        email:req.body.email,
        password:req.body.password,
        repassword:req.body.repassword,
        country:req.body.country
    }

    if(validatePassword(data.password)==false){
        res.send(`
            <script>
              alert('Password must contain a lowercase letter, an uppercase letter, a number and it should be 8 characters atleast!');
              window.location.href = '/signup'; // Redirect back to the registration page
            </script>
          `)
    }

    try {
        const emailToCheck = data.email;
        const user = await collection.findOne({ email: emailToCheck }).exec();
        if (user) {
            res.send(`
            <script>
              alert('Email is already registered!');
              window.location.href = '/signup'; // Redirect back to the registration page
            </script>
          `)
        } 
      } catch (err) {
        console.error(err);
      }


    if(data.password===data.repassword){
        await collection.insertMany([data])
        res.render("home",{name: data.firstname})
    }
    else{
        res.send(`
            <script>
              alert('Passwords not matched!');
              window.location.href = '/signup'; // Redirect back to the registration page
            </script>
          `)
    }
})

app.post("/login",async (req,res)=>{
    try{
        const check=await collection.findOne({email:req.body.email})

        if(check.password===req.body.password){
            res.render("home",{name:check.firstname})
        }
        else{
            res.send("user doesn't exist")
        }
    }
    catch{
        res.send("wrong details")
    }
})

app.post("/deploy",async (req,res)=>{
    console.log("G")
    try{
        const d={
            creator:req.body.creator
        }
        await collection2.insertMany([d])
        res.render("after-deploy",{creator: d.creator})
    }
    catch (err) {
        console.error(err);
      }
})


app.listen(3000,()=>{
    console.log("port connected");
})

