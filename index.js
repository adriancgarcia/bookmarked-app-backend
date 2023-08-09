//Index//
app.get("/bookmarks", async(req,res) => {
    try{
        const bookmark = await Bookmarks.find({})
        res.json(bookmark)
    }catch (error){
        res.status
    }
});

//Create//
app.post("/bookmarks", async (req,res) => {
    try{
        const bookmark = await bookmark.create(req.body)
        res.json(bookmark)
    }catch (error){
        res.status(400).json({error})
    }
});

//index
