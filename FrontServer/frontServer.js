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

//Cat Table
app.get("/cats/", async (req, res) => {
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

app.get("/cats/create", (req, res) => {
    res.render("Cat/create");
});

app.post("/cats/create", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
                    color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.post(base_url + '/cats/', data);
        res.redirect("/cats/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cats/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/cats/' + req.params.id);
        res.render("Cat/update", { cat: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/cats/update/:id", async (req, res) => {
    try{
        const data = {name: req.body.name, breed: req.body.breed, age: req.body.age,
            color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.put(base_url + '/cats/' + req.params.id, data);
        res.redirect("/cats/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cats/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/cats/' + req.params.id);
        res.redirect("/cats/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

//Customer Table
app.get("/customers/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers');
        res.render("Customer/customers", {customers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/customer/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers/' + req.params.id);
        res.render("Customer/customer", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/create", (req, res) => {
    res.render("Customer/create");
});

app.post("/customers/create", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.post(base_url + '/customers/', customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/customers/' + req.params.id);
        res.render("Customer/update", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/customers/update/:id", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.put(base_url + '/customers/' + req.params.id, customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/customers/' + req.params.id);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});

