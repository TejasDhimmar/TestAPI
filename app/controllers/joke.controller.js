const { success, error } = require('../utils/restResponse');
const axios = require('axios');

const jokes = async (req, res) => {
    axios.get("https://api.chucknorris.io/jokes/random").then(async joke => {
        return res.send(success(joke.data, "Random Joke"))
    }).catch(e => {
        console.log(e);
        return res.send(error(process.env.SERVER_ERROR));
    })
}

module.exports = {
    jokes
}