const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("../models/feedback");

const app = express();

app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/feedbackDB")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });





app.post("/api/feedback", async (req, res) => {

    const { studentName, courseName, message, rating } = req.body;

    if (!studentName) {
        return res.status(400).json({
            message: "Student name is required"
        });
    }

    if (!courseName) {
        return res.status(400).json({
            message: "Course name is required"
        });
    }

    if (!message) {
        return res.status(400).json({
            message: "Message is required"
        });
    }

    if (!rating || rating > 5 || rating < 1) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    try {

        const feedback = await Feedback.create({
            studentName,
            courseName,
            message,
            rating
        });

        return res.status(201).json({
            message: "Feedback created successfully",
            feedback
        });

    } catch (err) {

        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});



app.get("/api/feedback", async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    try {

        const feedbackRecords = await Feedback
            .find()
            .skip(skip)
            .limit(limit);

        const totalRecords = await Feedback.countDocuments();

        return res.status(200).json({
            currentPage: page,
            totalRecords: totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            feedbackRecords
        });

    } catch (err) {

        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});



app.patch("/api/feedback/:id", async (req, res) => {

    const id = req.params.id;
    const { status } = req.body;

    try {

        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        feedback.status = status;

        await feedback.save();

        return res.status(200).json({
            message: "Feedback status updated successfully",
            feedback
        });

    } catch (err) {

        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});