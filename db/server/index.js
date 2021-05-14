let express = require("express");
let config = require("../../config.json");
let db = require("../index");


module.exports.start = async() => {


let app = express();


app.use(async function(req, res, next) {

    if(req.query.token){
        let det = await db.GetAccess_Token(req.query.token);
        if(det) return next();


    }
    if(req.headers.authorization === process.env.DB_TOKEN) return next();
    else {
        return res.status(401).send({
            errorstatus: 401,
            message: `Invalid Authorization`
        })
    }
})



app.get("/", async(req,res) => {
    res.send("DB Api is Online")
})


app.post("/schema/user", async(req,res) => {
    

   await db.GetUserAndUpdate(req.query.userID, req.query.access_token);

    res.status(200).send({
        status:200,
        message: `Schema Updated`
    });
});

app.post("/schema/guild", async(req,res) => {
    let id = req.query.id;
    let guildDB = await db.GetGuild(id);


    if(req.query.prefix){
        guildDB.prefix = req.query.prefix.replace("%20"," ");
    }
    if(req.query.log){
        guildDB.log = req.query.log.replace("%20", " ");
    }

    

    res.status(200).send({
        status:200,
        message: `Schema Updated`
    });

    setTimeout(function() {
        guildDB.save();
    }, 3000)
})



app.listen(process.env.PORT || 3000)

}