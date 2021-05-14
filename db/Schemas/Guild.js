let mongoose = require("mongoose");

module.exports = mongoose.model("Guild", mongoose.Schema({
    id: { type: String},
    prefix: { type: String, default: 't!'},
    log: { type: String, default: 'false'},
}))