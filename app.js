const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view-engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB").then(() => {
    console.log('connected');
});

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res)=>{
    Article.find({}).then((articles)=>{
        if (articles){
            res.json(articles);
        }
    }).catch((err)=>{
        console.log(err);
    });
});

app.post("/articles", (req, res)=>{
    Article.create({
        title: req.body.title,
        content: req.body.content
    }).then(()=>{
        res.json({articleAdded: true});
    }).catch((err)=>{
        console.log(err);
        res.json(err);
    });
})

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});