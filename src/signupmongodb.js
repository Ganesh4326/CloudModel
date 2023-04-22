const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://ganesh4326:ganesh4326@cluster0.ta0injl.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err)
})

const SignUpSchema=new mongoose.Schema({
    firstname:{
        type:String,
        requires:true
    },
    lastname:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        requires:true
    },
    password:{
        type:String,
        requires:true
    },
    repassword:{
        type:String,
        requires:true
    },
    country:{
        type:String,
        requires:true
    }
})

const collection=new mongoose.model("Collection1",SignUpSchema)

module.exports=collection