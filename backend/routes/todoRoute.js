const express = require('express');
const router = express.Router();
const db = require("../database");
const fetchUser = require('../middleware/fetchUser');

router.get('/create/database',(req,res)=>{
    let q = 'CREATE DATABASE todolist';

    db.query(q,(err,data)=>{
        if(err) {
            return res.json(err);}
        return res.status(201).json("DB Created");
    })
});

router.get('/create/table',(req, res) => {
    let q = 'CREATE TABLE todolist(id int AUTO_INCREMENT,user_id int, Date DATE, Task VARCHAR(255), Completed BOOLEAN, PRIMARY KEY(id), FOREIGN KEY(user_id) REFERENCES user(id))';
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(201).json("TABLE CREATED");
    });
});

router.get('/show/todo',fetchUser,(req, res) => {
    const q = `SELECT * FROM todolist WHERE user_id=${req.user.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});

router.get('/show/bydate/:date',fetchUser,(req, res) => {
    const q = `SELECT * FROM todolist WHERE user_id=${req.user.id} AND Date='${req.params.date}'`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});


router.get('/show/completed',fetchUser,(req, res) => {
    const q = `SELECT * FROM todolist WHERE user_id=${req.user.id} AND Completed=1`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});

router.get('/show/notcompleted',fetchUser,(req, res) => {
    const q = `SELECT * FROM todolist WHERE user_id=${req.user.id}  AND Completed=0`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});

router.post('/add/todo',fetchUser,(req,res)=>{
    const q = "INSERT INTO todolist (user_id, Date, Task, Completed) VALUES (?, ?, ?, ?)";
    console.log(req.body);

    if(!req.body.task) return res.status(400).json({ error: "Task is a required field.", body: req.body });

    const { date, task } = req.body;

    const values = [req.user.id, date, task, false];

    db.query(q, values, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})

router.get('/delete/todo/:id',fetchUser,(req,res)=>{
    const q = `DELETE FROM todolist WHERE id=${req.params.id} AND user_id=${req.user.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ data: "todo deleted" });
    });
})

router.post('/update/todo/:id',fetchUser,(req,res)=>{
    console.log(req.body);
    const { Date, Task, Completed} = req.body;
    const q = `UPDATE todolist SET ? where id=${req.params.id} AND user_id=${req.user.id}`;

    db.query(q, { Date,Task, Completed }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
        // return res.status(200).json(req.body);
    });
})

router.get('/update/completed/:id/:completed',fetchUser,(req,res)=>{

    const q = `UPDATE todolist SET Completed=${req.params.completed} where id=${req.params.id} AND user_id=${req.user.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
})


module.exports = router;