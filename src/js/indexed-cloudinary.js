import ImageIndex from './ImageIndex';
import ImageTransformer from './ImageTransformer';
import Image from './Image';

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
                thumbItem: 5
            });
        });
}

export function changeWallpaper({indexHost, searchTerms, cloudName, transformationOptions}, {$, Cloudinary, ElasticSearch} = {}) {
    if (!$) $ = require('jquery');
    
    const imageIndex = new ImageIndex(indexHost, ElasticSearch);
    const hitsPromise = imageIndex.search(searchTerms);
    const imageTransformer = new ImageTransformer(cloudName, transformationOptions, Cloudinary);

    return hitsPromise
        .then(hits => hits.map(hit => new Image(imageTransformer, hit)))
        .then(images => images[Math.floor(Math.random() * images.length)])
        .then(image => {
            $('body')
                .css('background-image', `url("${image.url}")`)
                .css('background-size', 'cover')
                .css('background-attachment', 'fixed')
        });
}
