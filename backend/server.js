const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./routes')
const bodyParser = require('body-parser');
const { login } = require('./controllers/authController')

mongoose.connect("mongodb+srv://Arnob:bonrA@techweb.6zzxtnh.mongodb.net/?retryWrites=true&w=majority", { dbName: 'Job_Data' })
    .then(() => {
        app.listen(5000, () => {
            console.log("Success");
        })
    })
    .catch((err) => {
        console.log(err);
    })
// app.listen(5000,()=>{
//     console.log("Success");
// })
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors(corsOptions));
app.use(express.json())
app.use(cors());
app.use('/', routes)
//app.use('/', routes)
app.post('/login', login)



app.use('/images', express.static('images'));