const request = require('request')
const key = 'db1a2b95b05bc18e2bc1dd583e8c3e51'

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a  ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast