webpackHotUpdate("main",{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/css/ScrollSnap.css":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/assets/css/ScrollSnap.css ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".container {\n    top: 0;\n    left: 0;\n    position: absolute;\n    display: grid;\n    height: 100%;\n    grid-template-columns: 100% 100%;\n    overflow-x: hidden;\n    overflow-y: hidden;\n    width: 100%;\n    z-index: 10;\n    padding: 0px;\n}\n\n#carousel.snap {\n    scroll-snap-type: x mandatory;\n    -webkit-overflow-scrolling: touch; /* Needed to work on iOS Safari */\n    -ms-scroll-snap-type: x mandatory;\n    scroll-snap-points-x: repeat(100%);\n    -ms-scroll-snap-points-x: repeat(100%);\n}\n\n  .page1{\n    width: 100%;\n    height: 100%;\n    position: relative;\n    display: flex;\n      flex-direction: column;\n      scroll-snap-align: start;\n  }\n  \n  .page2{\n    width: 100%;\n    height: 100vh;\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    scroll-snap-align: start;\n    background-color: white;\n  }\n\n\n.scroll-div{\n    height: 100%;}\n\n@media only screen and (max-width:1023px){\n    .page2{\n        height: 93vh;\n    }\n    .container{\n        grid-template-columns: auto;\n        grid-template-rows: 100% 100%;\n        height: 93vh;\n        overflow-y: scroll;\n    }\n\n    #carousel.snap{\n    scroll-snap-type: none;\n    -webkit-overflow-scrolling: none; /* Needed to work on iOS Safari */\n    scroll-snap-type: none;\n    -ms-scroll-snap-type: none;\n    scroll-snap-points-x: none;\n    -ms-scroll-snap-points-x: none;\n    }\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

})
//# sourceMappingURL=main.f966082f27bead85f785.hot-update.js.map