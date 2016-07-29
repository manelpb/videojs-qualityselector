# videojs-qualityselector

Simple plugin that displays a dropdown with a list of possible videos based on its resolution, also changes the source when the user selects a desired option

## Installation

```sh
npm install --save videojs-qualityselector
```

## Usage

To include videojs-qualityselector on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-qualityselector.min.js"></script>
<script>
  var player = videojs('my-video');

  player.qualityselector();
</script>
```

### Browserify

When using with Browserify, install videojs-qualityselector via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-qualityselector');

var player = videojs('my-video');

player.qualityselector();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-qualityselector'], function(videojs) {
  var player = videojs('my-video');

  player.qualityselector();
});
```


## License

MIT. Copyright (c) Emmanuel Alves / http://github.com/manelpb

Thanks to http://www.sample-videos.com/ to provide simple example videos in different resolutions


[videojs]: http://videojs.com/
