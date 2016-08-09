import fetch from 'isomorphic-fetch';

export default class ESClient {

  constructor(config) {
    this.config = config;
  }

  queryStringSearch({ q, index }) {
    const query = encodeURIComponent(q);

    return fetch(`${this.config.host}/${index}/_search?q=${query}`, {
      cors: true,
      headers: new Headers({
        Authorization: `Basic ${btoa(this.config.auth)}`,
      }),
    })
      .then(r => r.json());
  }
}
