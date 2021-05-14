let Guild = require("./Schemas/Guild");
let mongoose = require("mongoose");
let User = require("./Schemas/User");
/**
 * @param {number} guildID Discord ID of Guild | Number
 */


module.exports.GetGuild = async(guildID) => {
    let guild = await Guild.findOne({id: guildID});
    if(!guild){
        guild = await Guild({
            id: guildID,
        });
        guild.save();
    }


    return guild;
}
/**
 * @param {number} userID Discord ID of User | Number
 */
module.exports.GetUser = async(userID) => {
    let user = await User.findOne({id: userID});
    if(!user){
        user = await Guild({
            id: userID,
        });
        user.save();
    }


    return user;
}
/**
 * @param {string} token Access_Token
 * @returns {boolean} Returns if the Access_Token is valid or not
 */

 module.exports.GetAccess_Token = async(access_token) => {
     let user = await User.findOne({access_token: access_token});
     if(user) return true;
     else return false;
 }

/**
 * @returns {boolean}
 */

module.exports.LoadData  = async() => {
    mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


return true;
}