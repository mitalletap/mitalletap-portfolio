const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    project_name: String,
    file_name: String,
    github_url: String,
    demo_url: String,
    description: String,
    image_url: String,
});

module.exports = mongoose.model('Project', ProjectSchema);