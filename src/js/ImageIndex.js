export default class ImageIndex {
    constructor(host, index='images', Client = require('elasticsearch').Client) {
        this.client = new Client({host});
        this.index = index;
    }

    search(queryString) {
        return this.client.search({
            index: this.index,
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