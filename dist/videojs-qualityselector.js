/**
 * videojs-qualityselector
 * @version 0.0.3
 * @copyright 2017 Emmanuel Alves <manel.pb@gmail.com>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsQualityselector = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var QualitySelector = (function () {
	function QualitySelector(player) {
		_classCallCheck(this, QualitySelector);

		this.player = player;
		this.sources = [];
		this.callback = undefined;
		this.containerDropdownElement = undefined;
		this.defaults = {};
	}

	/**
  * A video.js plugin.
  *
  * In the plugin function, the value of `this` is a video.js `Player`
  * instance. You cannot rely on the player being in a "ready" state here,
  * depending on how the plugin is invoked. This may or may not be important
  * to you; if not, remove the wait for "ready"!
  *
  * @function qualityselector
  * @param    {Object} [options={}]
  *           An object of options left to the plugin author to define.
  */

	/**
  * event on selected the quality
  */

	_createClass(QualitySelector, [{
		key: "onQualitySelect",
		value: function onQualitySelect(quality) {
			var _this = this;

			if (this.callback) {
				this.callback(quality);
			};

			if (this.sources) {
				// tries to find the source with this quality
				var source = this.sources.find(function (source) {
					return source.format == quality.code;
				});

				if (source) {
					this.player.src({ src: source.src, type: source.type });

					this.player.on("loadedmetadata", function () {
						_this.player.play();
					});
				}
			}

			this.onToggleDropdown();
		}
	}, {
		key: "onToggleDropdown",

		/**
   * show or hide the dropdown
   */
		value: function onToggleDropdown() {
			if (this.containerDropdownElement.className.indexOf("show") == -1) {
				this.containerDropdownElement.className += " show";
			} else {
				this.containerDropdownElement.className = this.containerDropdownElement.className.replace(" show", "");
			}
		}
	}, {
		key: "onPlayerReady",

		/**
   * Function to invoke when the player is ready.
   *
   * This is a great place for your plugin to initialize itself. When this
   * function is called, the player will have its DOM and child components
   * in place.
   *
   * @function onPlayerReady
   * @param    {Player} player
   * @param    {Object} [options={}]
   */
		value: function onPlayerReady(options) {
			var _this2 = this;

			this.containerDropdownElement = document.createElement("div");
			this.containerDropdownElement.className = "vjs-quality-dropdown";

			var containerElement = document.createElement("div");
			containerElement.className = "vjs-quality-container";

			var buttonElement = document.createElement("button");
			buttonElement.className = "vjs-brand-quality-link";
			buttonElement.onclick = function (event) {
				return _this2.onToggleDropdown(event);
			};
			buttonElement.innerText = options.text || "Quality";

			var ulElement = document.createElement("ul");

			if (!options.formats) {
				options.formats = [{ code: 'auto', name: 'Auto' }];
			}

			if (options.onFormatSelected) {
				this.callback = options.onFormatSelected;
			}

			if (options.sources) {
				this.sources = options.sources;
			}

			options.formats.map(function (format) {
				var liElement = document.createElement("li");

				var linkElement = document.createElement("a");
				linkElement.innerText = format.name;
				linkElement.setAttribute("href", "#");
				linkElement.addEventListener("click", function (event) {
					event.preventDefault();
					_this2.onQualitySelect(format);
				});

				liElement.appendChild(linkElement);
				ulElement.appendChild(liElement);
			});

			this.containerDropdownElement.appendChild(ulElement);
			containerElement.appendChild(this.containerDropdownElement);
			containerElement.appendChild(buttonElement);

			this.player.controlBar.el().insertBefore(containerElement, this.player.controlBar.fullscreenToggle.el());

			this.player.addClass('vjs-qualityselector');
		}
	}]);

	return QualitySelector;
})();

var qualityselector = function qualityselector(options) {
	var _this3 = this;

	this.ready(function () {
		var player = _this3;
		var qualityControl = new QualitySelector(player);
		qualityControl.onPlayerReady(_videoJs2["default"].mergeOptions(qualityControl.defaults, options));
	});
};

// Register the plugin with video.js.
_videoJs2["default"].registerPlugin('qualityselector', qualityselector);

// Include the version number.
qualityselector.VERSION = '0.0.3';

exports["default"] = qualityselector;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});