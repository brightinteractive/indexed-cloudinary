import 'lightslider';

import * as api from './src/js/indexed-cloudinary';

if (typeof module !== 'undefined') {
  module.exports = api;
   
} else {
  window.indexedCloudinary = api;
}
