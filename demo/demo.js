import * as indexedCloudinary from '../index';

var indexHost = 'https://holiday-weather-new:z2jco6zqxycnrclgorrnncrynpwxbsqi@bifur-eu-west-1.searchly.com';
var filters = {category: 'tenerife', sections: 'beach'};
var wallpaperFilters = {category: 'tenerife', suitableForWallpaper: 'true'};
var cloudName = "hj7ggro7s";

$(document).ready(function () {
    var queryString = indexedCloudinary.objectToQueryString(filters);
    indexedCloudinary.displayCarousel('#carousel', {
            indexHost: indexHost,
      index: 'newimages',
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
      index: 'newimages',
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
