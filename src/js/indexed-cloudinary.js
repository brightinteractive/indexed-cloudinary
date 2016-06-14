import ImageIndex from './ImageIndex';
import ImageTransformer from './ImageTransformer';
import Image from './Image';

const arrowLeft = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" version="1.1" x="0px" y="0px">
    <g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1">
        <g fill="#FFF">
            <path d="M30,0 C13.4622,0 0,13.452 0,29.9898 C0,46.5372 13.4622,60 30,60 C46.5378,60 60,46.5372 60,29.9898 C60,13.452 46.5378,0 30,0 L30,0 Z M30,54.5424 C16.4652,54.5424 5.4576,43.5342 5.4576,29.9898 C5.4576,16.455 16.4652,5.4576 30,5.4576 C43.5348,5.4576 54.5424,16.455 54.5424,29.9898 C54.5424,43.5348 43.5348,54.5424 30,54.5424 L30,54.5424 Z M30,54.5424"></path>
            
            <path d="M30.6923545,42.3129124 C31.615146,43.2290292 33.1117881,43.2290292 34.0333392,42.3129124 C34.9561307,41.3972061 34.9561307,39.9107234 34.0333392,38.9941959 L24.8931555,30 L34.0337527,21.0061121 C34.9565441,20.0904059 34.9565441,18.6035125 34.0337527,17.6873956 C33.5727704,17.2295425 32.9674985,17 32.3630536,17 C31.7586086,17 31.1533368,17.2295425 30.6923545,17.6873956 L19.9665574,28.3407958 C19.0433525,29.2569126 19.0433525,30.7429847 19.9665574,31.6595122 L30.6923545,42.3129124 Z M30.6923545,42.3129124">
            </path>
        </g>
    </g>
</svg>`; 

const arrowRight = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" version="1.1" x="0px" y="0px">
    <g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1">
        <g fill="#FFF">
            <path d="M30,0c16.538,0 30,13.452 30,29.99c0,16.547 -13.462,30.01 -30,30.01c-16.538,0 -30,-13.463 -30,-30.01c0,-16.538 13.462,-29.99 30,-29.99ZM30,54.542c13.535,0 24.542,-11.008 24.542,-24.552c0,-13.535 -11.007,-24.532 -24.542,-24.532c-13.535,0 -24.542,10.997 -24.542,24.532c0,13.545 11.007,24.552 24.542,24.552Z"/>
            <path d="M29.308,42.313c-0.923,0.916 -2.42,0.916 -3.341,0c-0.923,-0.916 -0.923,-2.402 0,-3.319l9.14,-8.994l-9.141,-8.994c-0.923,-0.916 -0.923,-2.402 0,-3.319c0.461,-0.457 1.067,-0.687 1.671,-0.687c0.604,0 1.21,0.23 1.671,0.687l10.725,10.654c0.924,0.916 0.924,2.402 0,3.319l-10.725,10.653Z"/>
        </g>
    </g>
</svg>`;

export function displayCarousel(elementSelector, {indexHost, searchTerms, cloudName, transformationOptions}, {$, Cloudinary, ElasticSearch} = {}) {
    if (!$) $ = require('jquery');

    const imageIndex = new ImageIndex(indexHost, ElasticSearch);
    const hitsPromise = imageIndex.search(searchTerms);
    const imageTransformer = new ImageTransformer(cloudName, transformationOptions, Cloudinary);
    const div = $(elementSelector);

    return hitsPromise
        .then(hits => hits.map(hit => new Image(imageTransformer, hit)))
        .then(images => images.map(image => image.toHtml()))
        .then(imageListItems => imageListItems.join(''))
        .then(imagesHtml => `<ul>${imagesHtml}</ul>`)
        .then(carouselHtml => {
            const carousel = $.parseHTML(carouselHtml);
            div.append(carousel);
            $(carousel).lightSlider({
                gallery: true,
                item: 1,
                loop: true,
                slideMargin: 0,
                thumbItem: 5,
                prevHtml: arrowLeft,
                nextHtml: arrowRight
            });
        })
        .catch(error => console.error(error));
}

export function changeWallpaper(creditSelector, {indexHost, searchTerms, cloudName, transformationOptions, ratingsUrl}, {$, Cloudinary, ElasticSearch} = {}) {
    if (!$) $ = require('jquery');

    const imageIndex = new ImageIndex(indexHost, ElasticSearch);
    const hitsPromise = imageIndex.search(searchTerms);
    const imageTransformer = new ImageTransformer(cloudName, transformationOptions, Cloudinary);

    return hitsPromise
        .then(hits => hits.map(hit => new Image(imageTransformer, hit)))
        .then(images => images[Math.floor(Math.random() * images.length)])
        .then(image => {
            if(image) {
                $('body')
                    .css('background-image', `url("${image.url}")`)
                    .css('background-size', 'cover')
                    .css('background-attachment', 'fixed');

                displayRatingStars($, image, creditSelector, ratingsUrl);

                $(creditSelector)
                    .show()
                    .append(`<div class="c-rating__credit"><strong>${image.title}</strong><br/>${image.description()}</div>`);
            }
        })
        .catch(error => console.error(error));
}

function displayRatingStars($, image, creditSelector, ratingsUrl) {
    function sendRatingToServer(value) {
        $.post(`${ratingsUrl}/rated-items/${image.id}/ratings`, {
            rating: value,
            url: window.location.href
        }, () => console.log('Rating submitted successfully.'));
    }

    const ratingStars = $.parseHTML(image.ratingHtml());
    $(creditSelector).append(ratingStars);

    $(`${creditSelector} select`).barrating({
        theme: 'bootstrap-stars',
        onSelect: (value) => {
            $(`#${image.id}-container`).hide();
            sendRatingToServer(value);
        }
    });
}
