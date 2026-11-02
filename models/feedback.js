const mongoose=require("mongoose");

const feedbackSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
    
});


module.exports=mongoose.model("feedback",feedbackSchema)