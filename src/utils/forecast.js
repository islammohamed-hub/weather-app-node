const request = require('request');

const forecast = (latitude,longitude,callback) => {
    
    const url=`http://api.weatherstack.com/current?access_key=b28a4bdf5ec422adcff450d5d61b029f&query=${latitude},${longitude}`;
    
    request({ url , json:true} , (error,{body} = {}) => {
        if (error) {
            callback("Unable to connect to weather service")
        }else if (body.error) {
            callback("Unable to find location!")
        }else {
            callback(undefined,`${body.current.weather_descriptions[0]} & the current Temperature is ${body.current.temperature} but it feels like ${body.current.feelslike} & the humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports=forecast;