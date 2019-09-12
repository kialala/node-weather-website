const request = require('request')
const key='pk.eyJ1Ijoia2lhbGFsYSIsImEiOiJjanp5Z2E3YXEwbXNuM2NxZHlqaHJwYTUxIn0.Fsezf4j9x_HY4DtFO6DAPA'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode