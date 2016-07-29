import videojs from 'video.js';

// Default options for the plugin.
const defaults = {};

let sources;
let callback;
let player;
let containerDropdownElement;

/**
* event on selected the quality
*/
const onQualitySelect = (quality) => {
	if(callback) {
		callback(quality);
	};

	if(sources) {
		// tries to find the source with this quality
		let source = sources.find(source => source.format == quality.code);

		if(source) {
			let currentTime = player.currentTime();

			player.src({ src: source.src, type: source.type });

			player.on("loadedmetadata", function() {
				player.play();	
			});			
		}
	}

	onToggleDropdown();
};

/**
* show or hide the dropdown
*/
const onToggleDropdown = () => {
		if(containerDropdownElement.className.indexOf("show") == -1) {
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
const onPlayerReady = (player, options) => {
	containerDropdownElement = document.createElement("div");
	containerDropdownElement.className = "vjs-quality-dropdown";

	let containerElement = document.createElement("div");
	containerElement.className = "vjs-quality-container";

	let buttonElement = document.createElement("button");
	buttonElement.className = "vjs-brand-quality-link";
	buttonElement.onclick = onToggleDropdown;
	buttonElement.innerText = "Quality";

	let ulElement = document.createElement("ul");

	if(!options.formats) {
		options.formats = [{ code: 'auto', name: 'Auto' }];
	}

	if(options.onFormatSelected) {
		callback = options.onFormatSelected;
	}

	if(options.sources) {
		sources = options.sources;
	}
	
	options.formats.map(function(format) {
		let liElement = document.createElement("li");

		let linkElement = document.createElement("a");
		linkElement.innerText = format.name;
		linkElement.setAttribute("href", "#");
		linkElement.addEventListener("click", function() {
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
const qualityselector = function(options) {
  this.ready(() => {
  	player = this;
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('qualityselector', qualityselector);

// Include the version number.
qualityselector.VERSION = '__VERSION__';

export default qualityselector;
