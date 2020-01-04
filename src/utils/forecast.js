const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/34750fcb29ad7f93e39254d784573942/${longitude},${latitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`unable to connect to weather services`)
        } else if(body.error) { 
         callback(`Unable to find location. Try another search.`)
        } else {
            // const  { currently, daily } = response.body
             callback(undefined, 
             `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain for the rest of the day.`
             )
        } 
    })
}

module.exports = forecast