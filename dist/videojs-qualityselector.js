/**
 * videojs-qualityselector
 * @version 0.0.2
 * @copyright 2017 Emmanuel Alves <manel.pb@gmail.com>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsQualityselector = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

// Default options for the plugin.
var defaults = {};

var sources = undefined;
var callback = undefined;
var player = undefined;
var containerDropdownElement = undefined;

/**
* event on selected the quality
*/
var onQualitySelect = function onQualitySelect(quality) {
	if (callback) {
		callback(quality);
	};

	if (sources) {
		// tries to find the source with this quality
		var source = sources.find(function (source) {
			return source.format == quality.code;
		});

		if (source) {
			var currentTime = player.currentTime();

			player.src({ src: source.src, type: source.type });

			player.on("loadedmetadata", function () {
				player.play();
			});
		}
	}

	onToggleDropdown();
};

/**
* show or hide the dropdown
*/
var onToggleDropdown = function onToggleDropdown() {
	if (containerDropdownElement.className.indexOf("show") == -1) {
		containerDropdownElement.className += " show";
	} else {
		containerDropdownElement.className = containerDropdownElement.className.replace(" show", "");
	}
};

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
var onPlayerReady = function onPlayerReady(player, options) {
	containerDropdownElement = document.createElement("div");
	containerDropdownElement.className = "vjs-quality-dropdown";

	var containerElement = document.createElement("div");
	containerElement.className = "vjs-quality-container";

	var buttonElement = document.createElement("button");
	buttonElement.className = "vjs-brand-quality-link";
	buttonElement.onclick = onToggleDropdown;
	buttonElement.innerText = options.text || "Quality";

	var ulElement = document.createElement("ul");

	if (!options.formats) {
		options.formats = [{ code: 'auto', name: 'Auto' }];
	}

	if (options.onFormatSelected) {
		callback = options.onFormatSelected;
	}

	if (options.sources) {
		sources = options.sources;
	}

	options.formats.map(function (format) {
		var liElement = document.createElement("li");

		var linkElement = document.createElement("a");
		linkElement.innerText = format.name;
		linkElement.setAttribute("href", "#");
		linkElement.addEventListener("click", function (event) {
			event.preventDefault();
			onQualitySelect(format);
		});

		liElement.appendChild(linkElement);
		ulElement.appendChild(liElement);
	});

	containerDropdownElement.appendChild(ulElement);
	containerElement.appendChild(containerDropdownElement);
	containerElement.appendChild(buttonElement);

	player.controlBar.el().insertBefore(containerElement, player.controlBar.fullscreenToggle.el());

	player.addClass('vjs-qualityselector');
};

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
var qualityselector = function qualityselector(options) {
	var _this = this;

	this.ready(function () {
		player = _this;
		onPlayerReady(_this, _videoJs2["default"].mergeOptions(defaults, options));
	});
};

// Register the plugin with video.js.
_videoJs2["default"].registerPlugin('qualityselector', qualityselector);

// Include the version number.
qualityselector.VERSION = '0.0.2';

exports["default"] = qualityselector;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});