require("dotenv").config();
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const dbUrl = 'http://localhost:3000';

const sequelize = new Sequelize ('database' ,'username' ,'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Catshop.sqlite'
});


const Cat = sequelize.define('cat', {
    cat_id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        primaryKey: true
    } ,
    name: {
        type: Sequelize.STRING ,
        allowNull: false
    } ,
    breed: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    availability: {
        type: Sequelize.STRING ,
        allowNull: false
    }
});

const Customers = sequelize.define('customers', {
    customer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING ,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.INTEGER ,
        allowNull: false
    }
});

const order = sequelize.define('order', {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    order_date: {
        type: Sequelize.DATE ,
        allowNull: false
    },
    total_amount: {
        type: Sequelize.INTEGER ,
        allowNull: false
    }
});

const orderDetails = sequelize.define('orderDetails', {
    detail_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    cat_id: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER ,
        allowNull: false
    },
    unitPrice: {
        type: Sequelize.INTEGER ,
        allowNull: false
    }
});

sequelize.sync();

//cats Table
app.get('/cats' ,(req ,res) => {
    Cat.findAll().then(cats => {
        res.json(cats);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/cats/:id' ,(req,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            res.json(cat);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/cats' ,(req ,res) => {
    Cat.create(req.body).then(cat => {
        res.send(cat);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/cats/:id' , (req ,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            cat.update(req.body).then(() => {
                res.send(cat);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/cats/:id' ,(req ,res) => {
    Cat.findByPk(req.params.id).then(cat => {
        if(!cat) {
            res.status(404).send('Cat not found');
        }else {
            cat.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

//customers Table
app.get('/customers' ,(req ,res) => {
    Customers.findAll().then(customers => {
        res.json(customers);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/customers/:id' ,(req,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Customer not found');
        }else {
            res.json(customer);
        }
    }).catch (err => {
        res.status(500).send(err);
    });
});

app.post('/customers' ,(req ,res) => {
    Customers.create(req.body).then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/customers/:id' , (req ,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Cat not found');
        }else {
            cat.update(req.body).then(() => {
                res.send(customer);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/customers/:id' ,(req ,res) => {
    Customers.findByPk(req.params.id).then(customer => {
        if(!customer) {
            res.status(404).send('Customer not found');
        }else {
            customer.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port ,() => console.log(`Listening on port ${port}...`));