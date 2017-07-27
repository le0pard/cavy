// general css, css-only components, third-party libraries
import './css/app.sass';
// general polifils
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Add to window
if (window && !window.Promise) window.Promise = Promise;
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
