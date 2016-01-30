/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint browser:true */
	/*!
	* FitVids 1.1
	*
	* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
	* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
	* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
	*
	*/
	
	function extend() {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (arguments[i].hasOwnProperty(key)) {
	        arguments[0][key] = arguments[i][key];
	      }
	    }
	  }
	  return arguments[0];
	}
	
	function matches(element, selector) {
	  var matchFn = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector || function (selector) {
	    var node = this,
	        nodes = (node.parentNode || node.document).querySelectorAll(selector),
	        i = -1;
	    while (nodes[++i] && nodes[i] != node);
	    return !!nodes[i];
	  };
	  return matchFn.call(element, selector);
	}
	
	var fitVids = function (elementSelector, options) {
	  var settings = {
	    customSelector: null,
	    ignore: null
	  };
	
	  if (!document.getElementById('fit-vids-style')) {
	    // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
	    var head = document.head || document.getElementsByTagName('head')[0];
	    var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
	    var div = document.createElement("div");
	    div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
	    head.appendChild(div.childNodes[1]);
	  }
	
	  if (options) {
	    settings = extend(settings, options);
	  }
	
	  var elements = document.querySelectorAll(elementSelector);
	  var element;
	  for (var i = 0; i < elements.length; i++) {
	    element = elements[i];
	
	    var selectors = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', 'object', 'embed'];
	
	    if (settings.customSelector) {
	      selectors.push(settings.customSelector);
	    }
	
	    var ignoreList = '.fitvidsignore';
	
	    if (settings.ignore) {
	      ignoreList = ignoreList + ', ' + settings.ignore;
	    }
	
	    var allVideos = element.querySelectorAll(selectors.join(','));
	    allVideos = Array.prototype.slice.call(allVideos);
	
	    for (var j = allVideos.length - 1; j >= 0; j--) {
	      if (matches(allVideos[j], 'object object') || matches(allVideos[j], ignoreList)) {
	        allVideos.splice(j, 1);
	      }
	    }
	
	    var video;
	    for (var j = 0; j < allVideos.length; j++) {
	      video = allVideos[j];
	      if (matches(video.parentNode, ignoreList)) {
	        continue; // Disable FitVids on this video.
	      }
	
	      if (video.tagName.toLowerCase() === 'embed' && matches(video.parentNode, 'object') || matches(video.parentElement, '.fluid-width-video-wrapper')) {
	        continue;
	      }
	
	      if (!video.style.height && !video.style.width && (isNaN(video.getAttribute('height')) || isNaN(video.getAttribute('width')))) {
	        video.setAttribute('height', 9);
	        video.setAttribute('width', 16);
	      }
	
	      var height = video.tagName.toLowerCase() === 'object' || video.getAttribute('height') && !isNaN(parseInt(video.getAttribute('height'), 10)) ? parseInt(video.getAttribute('height'), 10) : video.offsetHeight,
	          width = !isNaN(parseInt(video.getAttribute('width'), 10)) ? parseInt(video.getAttribute('width'), 10) : video.offsetWidth,
	          aspectRatio = height / width;
	
	      if (!video.getAttribute('id')) {
	        var videoID = 'fitvid' + j;
	        video.setAttribute('id', videoID);
	      }
	
	      var wrapper = document.createElement('div');
	      wrapper.className = 'fluid-width-video-wrapper';
	      video.parentNode.insertBefore(wrapper, video);
	      wrapper.appendChild(video);
	      wrapper.style.paddingTop = aspectRatio * 100 + '%';
	
	      video.removeAttribute('height');
	      video.removeAttribute('width');
	    }
	  }
	};
	
	/* harmony default export */ exports["default"] = fitVids

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fitvids__ = __webpack_require__(0);
	
	
	// Basic FitVids Test
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__fitvids__["default"](".container");
	// Custom selector and No-Double-Wrapping Prevention Test
	/* harmony import */ __WEBPACK_IMPORTED_MODULE_0__fitvids__["default"](".container", {
	  customSelector: "iframe[src^='http://socialcam.com']"
	});

/***/ }
/******/ ]);
//# sourceMappingURL=tests.bundle.js.map