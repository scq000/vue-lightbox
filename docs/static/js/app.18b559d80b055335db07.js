webpackJsonp([0,2],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(9)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(12),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jquery.lightbox.js v1.3
 * https://github.com/duncanmcdougall/Responsive-Lightbox
 * Copyright 2016 Duncan McDougall and other contributors; @license Creative Commons Attribution 2.5
 *
 * Options:
 * margin - int - default 50. Minimum margin around the image
 * nav - bool - default true. enable navigation
 * blur - bool - default true. Blur other content when open using css filter
 * minSize - int - default 0. Min window width or height to open lightbox. Below threshold will open image in a new tab.
 *
 */
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
})(this, function ($) {
    $.fn.lightbox = function (options) {
        const opts = {
            margin: 50,
            nav: true,
            blur: true,
            minSize: 0
        };

        var plugin = {
            items: [],
            lightbox: null,
            image: null,
            current: null,
            locked: false,
            caption: null,

            init(items) {
                plugin.items = items;
                const id = `lightbox-${Math.floor(Math.random() * 100000 + 1)}`;

                $('body').append(`<div id="${id}" class="lightbox" style="display:none;">` + '<a href="#" class="lightbox__close lightbox__button"></a>' + '<a href="#" class="lightbox__nav lightbox__nav--prev lightbox__button"></a>' + '<a href="#" class="lightbox__nav lightbox__nav--next lightbox__button"></a>' + '<div href="#" class="lightbox__caption"><p></p></div>' + '</div>');

                plugin.lightbox = $(`#${id}`);

                plugin.caption = $('.lightbox__caption', plugin.lightbox);

                if (plugin.items.length > 1 && opts.nav) {
                    $('.lightbox__nav', plugin.lightbox).show();
                } else {
                    $('.lightbox__nav', plugin.lightbox).hide();
                }

                plugin.bindEvents();
            },

            loadImage() {
                if (opts.blur) {
                    $('body').addClass('blurred');
                }
                $('img', plugin.lightbox).remove();
                plugin.lightbox.fadeIn('fast').append('<span class="lightbox__loading"></span>');

                const img = $(`<img src="${$(plugin.current).attr('href')}" draggable="false">`);

                $(img).on('load', () => {
                    $('.lightbox__loading').remove();
                    plugin.lightbox.append(img);
                    plugin.image = $('img', plugin.lightbox).hide();
                    plugin.resizeImage();
                    plugin.setCaption();
                });
            },

            setCaption() {
                const caption = $(plugin.current).data('caption');
                if (!!caption && caption.length > 0) {
                    plugin.caption.fadeIn();
                    $('p', plugin.caption).text(caption);
                } else {
                    plugin.caption.hide();
                }
            },

            resizeImage() {
                let ratio, wHeight, wWidth, iHeight, iWidth;
                wHeight = $(window).height() - opts.margin;
                wWidth = $(window).outerWidth(true) - opts.margin;
                plugin.image.width('').height('');
                iHeight = plugin.image.height();
                iWidth = plugin.image.width();
                if (iWidth > wWidth) {
                    ratio = wWidth / iWidth;
                    iWidth = wWidth;
                    iHeight = Math.round(iHeight * ratio);
                }
                if (iHeight > wHeight) {
                    ratio = wHeight / iHeight;
                    iHeight = wHeight;
                    iWidth = Math.round(iWidth * ratio);
                }

                plugin.image.width(iWidth).height(iHeight).css({
                    top: `${($(window).height() - plugin.image.outerHeight()) / 2}px`,
                    left: `${($(window).width() - plugin.image.outerWidth()) / 2}px`
                }).show();
                plugin.locked = false;
            },

            getCurrentIndex() {
                return $.inArray(plugin.current, plugin.items);
            },

            next() {
                if (plugin.locked) {
                    return false;
                }
                plugin.locked = true;
                if (plugin.getCurrentIndex() >= plugin.items.length - 1) {
                    $(plugin.items[0]).click();
                } else {
                    $(plugin.items[plugin.getCurrentIndex() + 1]).click();
                }
            },

            previous() {
                if (plugin.locked) {
                    return false;
                }
                plugin.locked = true;
                if (plugin.getCurrentIndex() <= 0) {
                    $(plugin.items[plugin.items.length - 1]).click();
                } else {
                    $(plugin.items[plugin.getCurrentIndex() - 1]).click();
                }
            },

            bindEvents() {
                $(plugin.items).click(function (e) {
                    if (!plugin.lightbox.is(':visible') && ($(window).width() < opts.minSize || $(window).height() < opts.minSize)) {
                        $(this).attr('target', '_blank');
                        return;
                    }
                    const self = $(this)[0];
                    e.preventDefault();
                    plugin.current = self;
                    plugin.loadImage();

                    // Bind Keyboard Shortcuts
                    $(document).on('keydown', e => {
                        // Close lightbox with ESC
                        if (e.keyCode === 27) {
                            plugin.close();
                        }
                        // Go to next image pressing the right key
                        if (e.keyCode === 39) {
                            plugin.next();
                        }
                        // Go to previous image pressing the left key
                        if (e.keyCode === 37) {
                            plugin.previous();
                        }
                    });
                });

                // Add click state on overlay background only
                plugin.lightbox.on('click', function (e) {
                    if (this === e.target) {
                        plugin.close();
                    }
                });

                // Previous click
                $(plugin.lightbox).on('click', '.lightbox__nav--prev', () => {
                    plugin.previous();
                    return false;
                });

                // Next click
                $(plugin.lightbox).on('click', '.lightbox__nav--next', () => {
                    plugin.next();
                    return false;
                });

                // Close click
                $(plugin.lightbox).on('click', '.lightbox__close', () => {
                    plugin.close();
                    return false;
                });

                $(window).resize(() => {
                    if (!plugin.image) {
                        return;
                    }
                    plugin.resizeImage();
                });
            },

            close() {
                $(document).off('keydown'); // Unbind all key events each time the lightbox is closed
                $(plugin.lightbox).fadeOut('fast');
                $('body').removeClass('blurred');
            }

        };

        $.extend(opts, options);

        plugin.init(this);
    };
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Lightbox__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Lightbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Lightbox__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
    name: 'app',
    data() {
        return {};
    },
    components: {
        Lightbox: __WEBPACK_IMPORTED_MODULE_0__components_Lightbox___default.a
    }
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

const $ = __webpack_require__(0);
__webpack_require__(4);
__webpack_require__(7);

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'lightbox',
    props: {
        options: {
            type: Object,
            required: false
        }
    },
    mounted() {
        $(this.$el).find('a').lightbox(this.options);
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(11),
  /* scopeId */
  "data-v-1cb22c1e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "gallery"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('h1', [_vm._v("Without Options")]), _vm._v(" "), _c('lightbox', _vm._l((4), function(n) {
    return _c('div', {
      staticClass: "thumbnail"
    }, [_c('a', {
      attrs: {
        "href": 'static/' + n + '.jpg'
      }
    }, [_c('img', {
      attrs: {
        "src": 'static/' + n + '.jpg'
      }
    })])])
  })), _vm._v(" "), _c('h1', [_vm._v("With Option")]), _vm._v(" "), _c('lightbox', {
    attrs: {
      "options": {
        margin: 20,
        nav: false,
        blur: true,
        minSize: 480
      }
    }
  }, _vm._l((4), function(n) {
    return _c('div', {
      staticClass: "thumbnail"
    }, [_c('a', {
      attrs: {
        "href": 'static/' + n + '.jpg'
      }
    }, [_c('img', {
      attrs: {
        "src": 'static/' + n + '.jpg'
      }
    })])])
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ })
],[15]);