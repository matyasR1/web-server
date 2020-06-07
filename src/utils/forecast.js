const request = require('postman-request')

const forecast = (longitude, latitude, fn) => {
    const url = `http://api.weatherstack.com/current?access_key=43b085c6c55947b484a93fe204f23959&query=${longitude,latitude}&units=m`

    request({url, json:true}, (error, {body}) => {
        if(error){
            fn('unable to connect to weather api')
        } else if(body.error){
            fn('unable to find')
        } else {
            fn(undefined, `${body.current.weather_descriptions[0]}. Its ${body.current.temperature} outside, but it feels like fkn ${body.current.feelslike}. Vítr fouká jak crazy rychlostí ${body.current.wind_speed} km/h. shut up`)
        } 
    })
}

module.exports = forecast