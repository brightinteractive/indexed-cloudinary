import {Cloudinary} from 'cloudinary-core';

export default class ImageTransformer {
    constructor(cloudName, options) {
        this.cloudinary = Cloudinary.new({cloud_name: cloudName});
        this.options = options;
    }

    transformedUrl(id) {
        return this.cloudinary.url(id, this.options)
    }
}