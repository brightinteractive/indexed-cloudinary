import * as indexedCloudinary from '../index';

var indexHost = "https://holiday-weather:ude7tgz3eftfgltovjg2mm9uol728kl0@bifur-eu-west-1.searchly.com";
var searchTerms = ['tenerife'];
var cloudName = "hj7ggro7s";

$(document).ready(function () {
    indexedCloudinary.displayCarousel('#carousel', {
                indexHost: indexHost,
                searchTerms: searchTerms,
                cloudName: cloudName,
                transformationOptions: {
                    width: 600,
                    height: 400,
                    crop: 'fill',
                    quality: 80
                }
            }
    );

    var result = indexedCloudinary.changeWallpaper('#credit', {
                indexHost: indexHost,
                searchTerms: searchTerms.concat(['wallpaper']),
                cloudName: cloudName,
                transformationOptions: {
                    quality: 80
                },
                ratingsUrl: 'http://hw-ratings-dev.herokuapp.com'
            }
    );

    result.then(function(wallpaperHasChanged) { if(wallpaperHasChanged) {console.log("Wallpaper changed!")}})
});
