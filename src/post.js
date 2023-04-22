const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    creator : String,
});

const PostMessage=mongoose.model('PostMessage',postSchema);
module.exports=PostMessage;