const express = require('express');
const mongoose = require('mongoose');
const {createTodo, updateTodo} = require('./types.js');
const {todo} = require('./db.js');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/todo', async (req, res)=>{
    const payload = req.body;
    const parsePayload = createTodo.safeParse(payload);
    if(!parsePayload.success) {
        res.status(400).json({
            msg: 'You sent the wrong input'
        });
        return;
    }
    const title = payload.title;
    const description = payload.description;
    const completed = false;
    const create = await todo.create({
        title,
        description,
        completed
    });
    res.json({
        msg: 'Todo Created'
    });
});

app.get('/todos', async (req, res)=>{
    const todos = await todo.find({});
    res.status(200).send({
        todos
    });
});

app.put('/completed', async (req, res)=>{
    const payload = req.body;
    const parsePayload = updateTodo.safeParse(payload);
    if(!parsePayload.success) {
        res.status(400).json({
            msg: 'You sent the wrong id'
        });
        return;
    }
    const _id = payload.id;
    await todo.findOneAndUpdate({
        _id
    }, {
        completed: true
    });
    res.status(200).json({
        msg: "Marked as completed"
    });
});

app.listen(3000);