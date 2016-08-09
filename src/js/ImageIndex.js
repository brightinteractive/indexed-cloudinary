import ESClient from './es-client'

export default class ImageIndex {
    constructor(host, auth, index = 'images', Client = ESClient) {
        this.client = new Client({host, auth});
        this.index = index;
    }

    search(queryString) {
        return this.client.queryStringSearch({q: queryString, index: this.index})
          .then(resp => resp.hits.hits);
    }
}