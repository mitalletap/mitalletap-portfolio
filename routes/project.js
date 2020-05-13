const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
mongoose.set('useFindAndModify', false);
var Project = require('../models/project.model')

function isValid(object) {
    return object.username.toString().length > 0 && object.message.toString().length > 0;
}


router.get('/test', (req, res) => {
    res.send("Hello");
})


router.get('/all', (req, res) => {
    Project.find({}, function (err, post) {
        if(err) {
            res.json("Soemthing went wrong")
            next();
        } else {
            console.log("RESULT: " + post);
            res.json(post);
        }
    });
})


router.post('/', (req, res) => {
        const newProject = new Project({
            _id: new mongoose.Types.ObjectId(),
            project_name: req.body.project_name,
            file_name: req.body.file_name,
            github_url: req.body.github_url,
            demo_url: req.body.demo_url,
            description: req.body.description,
            image_url: req.body.image_url,
        });
        newProject.save().then(() => console.log("Saved " + newPost.message)).catch((err) => console.log(err));
})

module.exports = router;