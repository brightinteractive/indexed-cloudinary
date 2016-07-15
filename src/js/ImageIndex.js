export default class ImageIndex {
    constructor(host, index='newimages', Client = require('elasticsearch').Client) {
        this.client = new Client({host});
    }

    search(queryString) {
        return this.client.search({
            index,
            type: 'image',
            body: {
                query: {
                    query_string: {
                        query: queryString
                    }
                }
            }
        }).then(resp => resp.hits.hits);
    }
}