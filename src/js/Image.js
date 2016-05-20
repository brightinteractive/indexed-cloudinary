export default class Image {
    constructor(imageTransformer, indexedImage) {
        this.url = imageTransformer.transformedUrl(indexedImage._id);
        this.title = indexedImage._source.title;
        this.alt = indexedImage._source.altText;
        this.credit = indexedImage._source.credit;
        this.linkBack = indexedImage._source.linkBack;
        this.owner = indexedImage._source.owner;
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
        return `<li data-thumb="${this.url}"><img src="${this.url}" alt="${this.alt}"/><p class="image-description"><strong>${this.title}</strong></p><p class="image-description">${this.description()}</p></li>`
    }
}