//npm package
const request = require('request');

const geoCode = (address, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVkcmljaW91cyIsImEiOiJja2RhNXc2NGkwMDFlMnhtcDE5Ym42OTQ4In0.MA9W0L-buLRQVjJYHawbdw&limit=1`;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callBack("Unable to connect to location services", undefined);
        } else if (body.features.length === 0) {
            callBack("Unable to find the location", undefined);
        } else {
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    });
}

module.exports = geoCode;



