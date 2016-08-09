import {expect} from 'chai'
import jsdom from 'jsdom';

import {displayCarousel, changeWallpaper} from '../indexed-cloudinary';

describe("displayCarousel", () => {
  it("should render", () => stubDom().then(window => {
    const stubs = {
      $: window.jQuery,
      Cloudinary,
      ElasticSearch
    };
    
    return displayCarousel("#carousel", {searchTerms: ['tag1', 'tag2']}, stubs);
  }));
})

describe("changeWallpaper", () => {
  it("should render", () => stubDom().then(window => {
    const stubs = {
      $: window.jQuery,
      Cloudinary,
      ElasticSearch
    };
    
    return changeWallpaper('#credits', {searchTerms: ['tag1', 'tag2']}, stubs);
  }));
})


/** Mocks */

function stubDom() {
  const markup = `
  <!doctype html>
  <html>
    <head></head>
    <body>
      <div id='carousel'></div>
      <div id='credits'></div>
    </body>
  </html>
  `
  const scripts = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/lightslider/dist/js/lightslider.min.js'
  ];
  
  return new Promise((resolve, reject) => {
    jsdom.env(markup, scripts, (err, window) => {
      if (err) {
        reject(err);
        
      } else {
        resolve(window);
      }
    });
  });
}

class ElasticSearch {
  constructor() {
    
  }

  queryStringSearch({q, index}) {
    return Promise.resolve({
      hits: {
        hits: [
          {
            _id: "1",
            _source: {
              title: "title",
              altText: "alt",
              credit: "credit",
              linkBack: "linkBack",
              owner: "owner"
            }
          }
        ]
      }
    });
  }
}

class Cloudinary {
  static new() {
    return new Cloudinary();
  }
  
  url() {
    return "http://transformedUrl.com"
  }
}
