import videojs from 'video.js';

class QualitySelector {
  constructor(player) {
    this.player = player;
    this.sources = [];
    this.callback = undefined;
    this.defaultFormat = undefined;
    this.containerDropdownElement = undefined;
    this.defaults = {};
    this.changeQualityName = true;
  }

	/**
	 * event on selected the quality
	 */
  onQualitySelect(quality) {
    if (this.callback) {
      this.callback(quality);
    }

    let source = this.setPlayerSource(quality.code);

    if (source) {
      this.player.on('loadedmetadata', () => {
        this.player.play();

        Array.from(this.containerDropdownElement.firstChild.childNodes).forEach(ele => {
          if (ele.dataset.code === quality.code) {
            ele.setAttribute('class', 'current');
          } else {
            ele.removeAttribute('class');
          }
        });
      });
      this.changeQualitySelectorLabel(quality.name);
    }

    this.onToggleDropdown();
  }

  /**
   * Set the main video source of the player with the given format code
   * @param {string} formatCode
   * @returns {Object} the source if the player has been updated
   */
  setPlayerSource(formatCode) {
    if (this.sources) {
      // tries to find the source with this quality
      let source = this.sources.find(ss => ss.format === formatCode);

      if (source) {
        this.player.src({ src: source.src, type: source.type });
        return source;
      }
    }
    return;
  }

  /**
   * Change the displayed quality label in the controlbar
   * @param {string} label
   */
  changeQualitySelectorLabel(label) {
    const player = document.getElementById(this.player.id_);
    const qualitySelector = player.getElementsByClassName('vjs-brand-quality-link');

    if (this.changeQualityName && qualitySelector && qualitySelector.length > 0) {
      qualitySelector[0].innerText = label;
    }
  }

	/**
	 * show or hide the dropdown
	 */
  onToggleDropdown() {
    if (this.containerDropdownElement.className.indexOf('show') === -1) {
      this.containerDropdownElement.className += ' show';
    } else {
      const className = this.containerDropdownElement.className.replace(' show', '');

      this.containerDropdownElement.className = className;
    }
  }

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
    this.containerDropdownElement = document.createElement('div');
    this.containerDropdownElement.className = 'vjs-quality-dropdown';

    let containerElement = document.createElement('div');

    containerElement.className = 'vjs-quality-container';

    let buttonElement = document.createElement('button');

    buttonElement.className = 'vjs-brand-quality-link';
    buttonElement.onclick = (event) => this.onToggleDropdown(event);
    buttonElement.innerText = 'Quality';

    let ulElement = document.createElement('ul');

    if (!options.formats) {
      options.formats = [{ code: 'auto', name: 'Auto' }];
    }

    if (options.onFormatSelected) {
      this.callback = options.onFormatSelected;
    }

    if (options.sources) {
      this.sources = options.sources;
    }

    if (options.defaultFormat) {
      this.defaultFormat = options.defaultFormat;
    }
    
    if (options.hasOwnProperty('changeQualityName')) {
      this.changeQualityName = options.changeQualityName;
    }

    options.formats.map((format) => {
      let liElement = document.createElement('li');

      liElement.dataset.code = format.code;
      if (format.code === this.defaultFormat) {
        liElement.setAttribute('class', 'current');
        buttonElement.innerText = format.name;
      }

      let linkElement = document.createElement('a');

      linkElement.innerText = format.name;
      linkElement.setAttribute('href', '#');
      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        this.onQualitySelect(format);
      });

      liElement.appendChild(linkElement);
      ulElement.appendChild(liElement);
    });

    this.containerDropdownElement.appendChild(ulElement);
    containerElement.appendChild(this.containerDropdownElement);
    containerElement.appendChild(buttonElement);

    const fullScreenToggle = this.player.controlBar.fullscreenToggle.el();

    this.player.controlBar.el().insertBefore(containerElement, fullScreenToggle);

    this.player.addClass('vjs-qualityselector');

    if (this.defaultFormat) {
      this.setPlayerSource(this.defaultFormat);
    }
  }
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a 'ready' state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for 'ready'!
 *
 * @function qualityselector
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const qualityselector = function(options) {
  this.ready(() => {
    let qualityControl = new QualitySelector(this);

    qualityControl.onPlayerReady(videojs.mergeOptions(qualityControl.defaults, options));
  });
};

// Register the plugin with video.js.
const registerPlugin = videojs.registerPlugin || videojs.plugin;

registerPlugin('qualityselector', qualityselector);

// Include the version number.
qualityselector.VERSION = '__VERSION__';

export default qualityselector;
