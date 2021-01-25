/* 해당 파일만 no-global-assign ESLint 옵션을 비활성화 함 */
/* eslint-disable no-global-assign */
require = require('esm')(module /*, options*/);
module.exports = require('./main.js');
