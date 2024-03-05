const express = require('express');
const axois = require('axios');
const app = express();
var bodyParser = require('body-parser');
const { default: axios } = require('axios');

const base_url = "http://localhost:3000";

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/views'));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats');
        res.render("Cat/cats", {cats: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/cat/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats/' + req.params.id);
        res.render("Cat/cat", { cat: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/create", (req, res) => {
    res.render("Cat/create");
});

app.post("/create", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
                    color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.post(base_url + '/cats/', data);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/cats/' + req.params.id);
        res.render("Cat/update", { cat: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/update/:id", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
            color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.put(base_url + '/cats/' + req.params.id, data);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/cats/' + req.params.id);
        res.redirect("/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});

