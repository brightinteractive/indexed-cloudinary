export default class Image {
    constructor(imageTransformer, indexedImage) {
        const additionalOptions = {
          x: indexedImage._source.cropX == '0' ? '0.0' : indexedImage._source.cropX,
          y: indexedImage._source.cropY == '0' ? '0.0' : indexedImage._source.cropY,
          width: indexedImage._source.cropWidth == '1' ? '1.0' : indexedImage._source.cropWidth,
          height: indexedImage._source.cropHeight == '1' ? '1.0' : indexedImage._source.cropHeight,
            crop: "crop"
        };
        this.id = indexedImage._id;
        this.url = imageTransformer.transformedUrl(this.id, additionalOptions);
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
        return this.title || ''
    }

    titleLength() {
        return this.displayTitle().length;
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
        return `
            <li data-thumb="${this.url}">
                <div class="image-description-container">
                    <p class="image-description">
                        ${this.displayTitle()}
                    </p>
                    <p class="image-description">
                        ${this.description()}
                    </p>
                </div>
                <img src="${this.url}" alt="${this.displayAlt()}"/>
            </li>
        `;
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