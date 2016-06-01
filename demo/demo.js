import * as indexedCloudinary from '../index';

var indexHost = "https://paas:9e10152fc1e85865228bd1980e3fd55a@bifur-eu-west-1.searchly.com";
var searchTerms = ['tenerife'];
var cloudName = "hgawxotji";

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

    indexedCloudinary.changeWallpaper('#credit', {
                indexHost: indexHost,
                searchTerms: searchTerms.concat(['wallpaper']),
                cloudName: cloudName,
                transformationOptions: {
                    quality: 80
                },
                ratingsUrl: 'http://hw-ratings-dev.herokuapp.com'
            }
    );
});
