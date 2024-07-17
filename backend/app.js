const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
require("dotenv").config();
var cors = require('cors')
app.use(cors())


app.use('/api/todo', require('./routes/todoRoute'))
app.use('/api/auth',require('./routes/auth'))


app.listen(5000,()=>{
    console.log("server running on port 5000");
});