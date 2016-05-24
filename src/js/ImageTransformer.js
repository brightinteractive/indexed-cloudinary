export default class ImageTransformer {
    constructor(cloudName, options, Cloudinary = require('cloudinary-core').Cloudinary) {
        this.cloudinary = Cloudinary.new({cloud_name: cloudName});
        this.options = options;
    }

    transformedUrl(id) {
        return this.cloudinary.url(id, this.options)
    }
}
