import videojs from 'video.js';

class QualitySelector {
	constructor(player) {
		this.player = player;
		this.sources = [];
		this.callback = undefined;
		this.containerDropdownElement = undefined;
		this.defaults = {};
	}

  /**
   * event on selected the quality
   */
  onQualitySelect(quality) {
		if(this.callback) {
      this.callback(quality);
		};

		if(this.sources) {
			// tries to find the source with this quality
			let source = this.sources.find(source => source.format == quality.code);

			if(source) {
        this.player.src({ src: source.src, type: source.type });

        this.player.on("loadedmetadata", () => {
          this.player.play();
				});
			}
		}

    this.onToggleDropdown();
	};

  /**
   * show or hide the dropdown
   */
	onToggleDropdown() {
		if(this.containerDropdownElement.className.indexOf("show") == -1) {
			this.containerDropdownElement.className += " show";
		} else {
			this.containerDropdownElement.className = this.containerDropdownElement.className.replace(" show", "");
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
  onPlayerReady(options) {
		this.containerDropdownElement = document.createElement("div");
    this.containerDropdownElement.className = "vjs-quality-dropdown";

		let containerElement = document.createElement("div");
		containerElement.className = "vjs-quality-container";

		let buttonElement = document.createElement("button");
		buttonElement.className = "vjs-brand-quality-link";
		buttonElement.onclick = (event) => this.onToggleDropdown(event);
		buttonElement.innerText = options.text || "Quality";

		let ulElement = document.createElement("ul");

		if(!options.formats) {
			options.formats = [{ code: 'auto', name: 'Auto' }];
		}

		if(options.onFormatSelected) {
      this.callback = options.onFormatSelected;
		}

		if(options.sources) {
      this.sources = options.sources;
		}

		options.formats.map((format) => {
			let liElement = document.createElement("li");

			let linkElement = document.createElement("a");
			linkElement.innerText = format.name;
			linkElement.setAttribute("href", "#");
			linkElement.addEventListener("click", (event) => {
				event.preventDefault();
				this.onQualitySelect(format);
			});

			liElement.appendChild(linkElement);
			ulElement.appendChild(liElement);
		});

    this.containerDropdownElement.appendChild(ulElement);
		containerElement.appendChild(this.containerDropdownElement);
		containerElement.appendChild(buttonElement);

    this.player.controlBar.el().insertBefore(containerElement, this.player.controlBar.fullscreenToggle.el());

    this.player.addClass('vjs-qualityselector');
	};
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
const qualityselector = function(options) {
  this.ready(() => {
  	const player = this;
  	let qualityControl = new QualitySelector(player);
    qualityControl.onPlayerReady(videojs.mergeOptions(qualityControl.defaults, options));
  });
};

// Register the plugin with video.js.
videojs.registerPlugin('qualityselector', qualityselector);

// Include the version number.
qualityselector.VERSION = '__VERSION__';

export default qualityselector;
