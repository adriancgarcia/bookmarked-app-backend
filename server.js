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
//DATABASE CONNECTION ///////
///////////////////////////
mongoose.connect(DATABASE_URL, {

});

//CONNECTION EVENTS
mongoose.connection
.on("open", () => console.timeLog("you are connected to Mongoose"))
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

//Index//
app.get("/bookmarks", async(req,res) => {
    try{
        const bookmark = await Bookmarks.find({})
        res.json(bookmark)
    }catch (error){
        res.status(400).json({error})
    }
});

// Destroy - Delete - /bookmarks/:id - delete a single bookmark
app.delete("/bookmarks/:id", async (req, res) => {
    try {
        // delete the bookmark
        const bookmark = await Bookmarks.findByIdAndDelete(req.params.id)
        // send the deleted bookmark as json
        res.status(204).json(bookmark)
    } catch (error) {
        res.status(400).json({error})
    }
})

// UPDATE - PUT 
app.put("/bookmarks/:id", async (req, res) => {
    try {
        const bookmark = await
        Bookmarks.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            });
            res.json(bookmark);
    } catch (error) {
        res.status(400).json({error});
    }
})

//Create//
app.post("/bookmarks", async (req,res) => {
    try{
        const bookmark = await Bookmarks.create(req.body)
        res.json(bookmark)
    }catch (error){
        res.status(400).json({error})
    }
});

// Show - Get - /bookmarks/:id - get a single bookmark
app.get("/bookmarks/:id", async (req, res) => {
    try {
        // get a bookmark from the database
        const bookmark = await Bookmarks.findById(req.params.id)
        // return the bookmark as json
        res.json(bookmark)
    } catch (error) {
        res.status(400).json({error})
    }
})

app.get ("/", (req, res) => {
    res.send("hello, world");
});


// Listener///////
app.listen (PORT, ()=> console.log(`Listening on PORT ${PORT}`));