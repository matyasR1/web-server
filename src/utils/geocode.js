const request = require('postman-request')

const geocode = (location, callback) => {

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWF0eWFzcjEiLCJhIjoiY2tiM25xb2p2MGF0NzJ4bzk1ZHZ2OXIzeSJ9.6TPBRyEP7JYXCGl-0V-IDw&limit=1`

    request({url:url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to service')
        } else if (body.features.length === 0){
            callback('unable to find')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode