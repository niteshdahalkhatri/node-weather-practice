//npm package
const request = require('request');


const forecast = (longitude, latitude, callBack) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${longitude}&lon=${latitude}&units=metric&exclude=hourly,minutely,daily&appid=f895604d24e7f413cab8492b2f61334a`;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callBack("Unable to connect to weather forecast service", undefined);
        } else if (body.message) {
            callBack("Unable to find the location weather", undefined);
        } else {
            callBack(undefined, {
                temp: body.current.temp,
                humid: body.current.humidity
            })
        }

    });
}

module.exports = forecast;