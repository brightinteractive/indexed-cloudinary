import fetch from 'isomorphic-fetch';

export default class ESClient {

  constructor(config) {
    this.config = config;
  }

  search({ index, type, body }) {
    return fetch(`${this.config.host}/${index}/${type}/_search`, {
      method: 'POST',
      cors: true,
      headers: new Headers({
        Authorization: `Basic ${btoa(this.config.auth)}`,
      }),
      body: JSON.stringify(body),
    })
      .then(r => r.json());
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
