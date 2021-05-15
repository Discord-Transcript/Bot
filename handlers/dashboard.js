let axios = require("axios");

async function PostStats(users, guilds) {
    let obj = {
        users:users,
        guilds:guilds
    }
    let request = await axios.default({
        method: 'post',
        url: `${process.env.DASHBOARD_URL}/requsts/postStats`,
        headers: {
            Authorization: process.env.Authorization
        },
        data: obj
    });


}

module.exports = {PostStats}