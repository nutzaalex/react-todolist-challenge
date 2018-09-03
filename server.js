const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

let todoList = [{id: 0, item: 'initialTodo'}];
let id = 1;

app.get('/', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.json(todoList);
});

app.put('/new', function (req, res) {
    if (req.body.item) {
        todoList.push({id: id, item: req.body.item});
        res.setHeader("Content-Type", "application/json");
        res.json({id: id, item: req.body.item});
        id++;
    } else {
        res.status(400).json({error: 'Something went wrong!'});
    }
});

app.delete('/delete', function (req, res) {
    let deletedTodo = todoList.find(todo => (todo.id == req.body.id && todo.item === req.body.item));
    if (deletedTodo) {
        let index = todoList.indexOf(deletedTodo);
        todoList.splice(index, 1);
        res.setHeader("Content-Type", "application/json");
        res.json(req.body);
    } else {
        res.status(400).json({error: 'Something went wrong!'});
    }
});

app.put('/update', function (req, res) {
    let check = false;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == req.body.id) {
            todoList[i].item = req.body.item;
            check = true;
            res.setHeader("Content-Type", "application/json");
            res.json({id: req.body.id, item: req.body.item});
        }
    }
    if (!check) {
        res.status(400).json({error: 'Something went wrong!'});
    }
});

app.listen(9000, function () {
    console.log("The server is listening on port 9000!");
});