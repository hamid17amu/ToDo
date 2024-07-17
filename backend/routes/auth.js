const express = require('express');
const router = express.Router();
const db = require("../database");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const genToken = (userID)=>{
    const data={
        user:{
            id:userID
        }
    }
    return jwt.sign(data, JWT_SECRET);
}


const JWT_SECRET = 'hello!ndia';


router.get('/create/table',(req, res) => {
    let q = 'CREATE TABLE user(id int AUTO_INCREMENT,name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(201).json("TABLE CREATED");
    });
});

router.post('/createuser',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
    body('name', 'Enter a valid Name').isLength({min: 3})
],async (req,res)=>{
    let success = false;
    const result = validationResult(req);
    if (result.isEmpty()) {

        try{
            let q = "INSERT INTO user(name, email, password) VALUES (?, ?, ?)";
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            db.query(q,[req.body.name, req.body.email, secPass], (err, result)=>{
                if(err) {
                    if(err.errno===1062) return res.status(400).json({success: success, error: 'Email already exists!'})
                    else return res.status(500).json(err);
                }
                else{
                    const authToken = genToken(result.insertId);

                    console.log(authToken);
                    success = true;
                    return res.json({success: success, authToken: authToken});
                }

            })

        }
        
        catch(error){
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
    else res.send({ errors: result.array() });
});

router.post('/login',[
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter the Password').exists()
    ], (req,res) =>{
        const result = validationResult(req);
        let success=false;
        
        if (result.isEmpty()){
            const {email, password} = req.body;
            // console.log(req.body);

            try{
                let q = `SELECT * FROM  user WHERE email='${email}'`;
                db.query(q,async (err,data)=>{
                    if(err) return res.status(400).send("err");

                    if(data.length>0){
                        const passComp = await bcrypt.compare(password, data[0].password);
                        
                        if(passComp){
                            const authToken = genToken(data[0].id)
                            // console.log(authToken);
                            success = true;
                            return res.json({success: success, authToken: authToken});
                        }
                        else{
                            return res.status(400).json({success: success, error: "Enter correct credentials"});
                        }
                        
                        // return res.send(data);
                    }
                    else{
                        return res.status(400).json({success: success, error: "Enter correct credentials"});
                    }
                })
    
            }
    
            catch(error){
                console.log(error.message);
                return res.status(500).send("Internal Server Error");
            }
        }
    
        else return res.status(400).send({ errors: result.array() });
    });

    router.get('/getuser', fetchUser, async (req,res) =>{
        try {
            let userID=req.user.id;
            let q = `SELECT name, email FROM user WHERE id=${userID}`;
            
            db.query(q,(err,result)=>{
                if(err) return res.status(500).send(err);
    
                res.json(result);
            })
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    });
        
    router.post('/changepassword', fetchUser, (req, res)=>{
        let success = false;
        try{
            const {oldPass, newPass} = req.body;
            let userID=req.user.id;
    
            // let user = await User.findById(userID).select('+password');
            let q = `SELECT password FROM user WHERE id=${userID}`;
            db.query(q, async(err,data)=>{
                if(err) return res.status(500).send(err);
                const passComp = bcrypt.compare(oldPass, data[0].password);
                if(!passComp){
                    return res.status(400).json({success: success, error: "Old password is incorrect"});
                }
                // console.log();
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(newPass, salt);

                let up = `UPDATE user SET password='${secPass}' WHERE id=${userID}`
                db.query(up,(err,result)=>{
                    if(err) return res.status(400).send(err)
                    const authToken = genToken(userID);
                    success = true;        
                    return res.json({success: success, authToken: authToken});

                })
            })    
    
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    
    })

module.exports = router;