export default class ImageIndex {
    constructor(host, Client = require('elasticsearch').Client) {
        this.client = new Client({host});
    }

    search(tags) {
        const terms = tags.map(tag => {
            return {
                term: {
                    keywords: tag
                }
            }
        });

        return this.client.search({
            index: 'images',
            type: 'image',
            body: {
                query: {
                    constant_score: {
                        filter: {
                            and: terms
                        }
                    }
                }
            }
        }).then(resp => resp.hits.hits);
    }
}