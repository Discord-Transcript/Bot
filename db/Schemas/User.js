let mongoose = require("mongoose");

module.exports = mongoose.model("User", mongoose.Schema({
    id: { type: String},
    access_token: { type: String},
    
}))