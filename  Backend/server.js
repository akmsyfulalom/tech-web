const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./routes')

mongoose.connect("mongodb+srv://Arnob:bonrA@techweb.6zzxtnh.mongodb.net/?retryWrites=true&w=majority", { dbName: 'news-data' })
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
    origin: 'http://localhost:3000', // Allow access from this origin
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cors());
app.use('/jobs', routes)
app.use('/', routes)


app.use('/images', express.static('images'));