const express=require('express')

const app=express();

app.post('/api/feedback',(req,res)=>{
    const studentName=req.query.studentName;
    const courseName=req.query.courseName;
    const message=req.query.message;
    const rating=Number(req.query.rating);

    if(!studentName){
        return res.status(400).json({messge:"Student name is required"});
    }

    if(!courseName){
        return res.status(400).json({messge:"Course name is required"});
    }

    if(!message){
        return res.status(400).json({messge:"Message is required"});
    }

    if(!rating || rating >5 || rating <1){
        return res.status(400).json({messge:"Rating is invalid"});
    }

    const student={
        studentName:studentName,
        courseName:courseName,
        message:message,
        rating:rating
    }

    //insert into database
});

app.get('/api/feedback',(req,res)=>{
    const page=req.query.page;
    const limit=req.query.limit;

    //return with feedbackrecord with current page and total nu ber of records


});

app.patch('api/feedback/:id',(req,res)=>{
    const id=req.params.id;
    const status=req.query.status;

    //input into mongodb afetr finding id and is not present give back error

})