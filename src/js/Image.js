export default class Image {
    constructor(imageTransformer, indexedImage) {
        this.id = indexedImage._id;
        this.url = imageTransformer.transformedUrl(this.id);
        this.title = indexedImage._source.title;
        this.alt = indexedImage._source.altText;
        this.credit = indexedImage._source.credit;
        this.linkBack = indexedImage._source.linkBack;
        this.owner = indexedImage._source.owner;
    }

    displayAlt() {
        return this.alt ? this.alt : '';
    }

    displayTitle() {
        return this.title ? this.title : '';
    }

    description() {
        if (this.shouldCredit()) {
            return this.credit;
        } else if (this.shouldLinkBack()) {
            return `Taken by <a href="${this.linkBack}" target="_blank">${this.owner}</a>`;
        } else {
            return '';
        }
    }

    shouldCredit() {
        return this.credit !== undefined;
    }

    shouldLinkBack() {
        return this.owner !== undefined;
    }

    toHtml() {
        return `<li data-thumb="${this.url}"><img src="${this.url}" alt="${this.displayAlt()}"/><p class="image-description"><strong>${this.displayTitle()}</strong></p><p class="image-description">${this.description()}</p></li>`
    }

    ratingHtml() {
        return `<div id="${this.id}-container" class="c-rating__stars">
        Rate this background:
        <select id="${this.id}" class="rating" name="rating">
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>`
    }
}