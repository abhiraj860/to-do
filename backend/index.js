const express = require('express');
const mongoose = require('mongoose');
const {createTodo, updateTodo} = require('./types.js');
const app = express();

app.use(express.json());

app.get('/todo', async (req, res)=>{
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
    const create = await Todo.create({
        title,
        description
    });
});

app.post('/todos', (req, res)=>{

});

app.put('/completed', (req, res)=>{
    const payload = req.body;
    const parsePayload = updateTodo.safeParse(payload);
    if(!parsePayload.success) {
        res.status(400).json({
            msg: 'You sent the wrong id'
        });
        return;
    }
    const id = payload.id;
});