// general css, css-only components, third-party libraries
import './css/app.sass';
// general polifils
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
// Add to window
if (window && !window.Promise) window.Promise = Promise;
