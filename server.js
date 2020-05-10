const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");


require('dotenv').config();

const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/admin', (req, res) => {
    const data = [{
        "projectName": "portfolio",
        "githubUrl": "http://github.com/mitalletap/mitalletap-portfolio",
        "demoUrl": "http://www.mitalletap.io",
        "image": "https://s3.us-east-2.amazonaws.com/mitalletap.io/ahsoka.jpg",
        "description": "This is my portfolio! Check it out!"
    },
    {
        "projectName": "twitter",
        "githubUrl": "http://github.com/mitalletap/social-media-website",
        "demoUrl": "http://www.mitalletap.com",
        "image": "https://s3.us-east-2.amazonaws.com/mitalletap.io/maul.jpg",
        "description": "Twitter App!"
    },
    {
        "projectName": "flight app",
        "githubUrl": "http://github.com/mitalletap/uh-sdp-flight-app",
        "demoUrl": "http://www.mitalletap.io",
        "image": "https://s3.us-east-2.amazonaws.com/mitalletap.io/obi-wan.jpeg",
        "description": "Flight App!"
    },
    {
        "projectName": "blog",
        "githubUrl": "http://github.com/mitalletap/Saas",
        "demoUrl": "http://www.mitalletap.com",
        "image": "https://s3.us-east-2.amazonaws.com/mitalletap.io/rex.jpeg",
        "description": "Blog"
    },
    {
        "projectName": "http://www.mitalletap.io",
        "githubUrl": "http://github.com/mitalletap/mitalletap-portfolio",
        "demoUrl": "mitalletap.io",
        "image": "https://s3.us-east-2.amazonaws.com/mitalletap.io/anakin.jpeg",
        "description": "Mitalletap.io!"
    }]
    res.json(data);
});

app.use(express.static(path.join(__dirname, "client", "build")));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
}) 