import * as indexedCloudinary from '../index';

var indexHost = 'https://holiday-weather-images:e4fyljt9lltrbffuaxlrswjuivluj5sh@bifur-eu-west-1.searchly.com';
var filters = {category: 'brighton', sections: 'beach'};
var wallpaperFilters = {category: 'brighton', suitableForWallpaper: 'true'};
var cloudName = "hgzidbefh";

$(document).ready(function () {
    var queryString = indexedCloudinary.objectToQueryString(filters);
    indexedCloudinary.displayCarousel('#carousel', {
            indexHost: indexHost,
            queryString: queryString,
            cloudName: cloudName,
            transformationOptions: {
                width: 600,
                height: 400,
                crop: 'fill',
                quality: 80
            }
        }
    );


    var wallpaperQueryString = indexedCloudinary.objectToQueryString(wallpaperFilters);
    indexedCloudinary.changeWallpaper('#credit', {
            indexHost: indexHost,
            queryString: wallpaperQueryString,
            cloudName: cloudName,
            transformationOptions: {
                quality: 80
            },
            ratingsUrl: 'http://hw-ratings-dev.herokuapp.com'
        }
    ).then(function (succesful) {
        if (succesful) {
            console.log("Wallpaper changed!")
        }
    });
});
