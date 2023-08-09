//////////////////////////////
// DEPENDENCIES
/////////////////////////////
// get.env variables
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL
const { PORT = 8000 } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// IMPORT MIDDLEWARE
const cors = require("cors")
const morgan = require("morgan")

////////////////////////////
//DATABSE CONNECTION ///////
///////////////////////////
mongoose.connect(DATABASE_URL, {

});

//CONNECTION EVENTS
mongoose.connection
.on("oppen", () => console.timeLog("you are connected to Mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error));

////////////////////////////
// MODELS
///////////////////////////
const BookmarksSchema = new mongoose.Schema({
    title: String,
    url: String,
});

const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema);

////////////////////////////
// MIDDLEWARE
////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.get ("/", (req, res) => {
    res.send("hello, world");
});


// Listener///////
app.listen (PORT, ()=> console.log(`Listening on PORT ${PORT}`));