# videojs-qualityselector

Simple plugin that displays a dropdown with a list of possible videos based on its resolution, also changes the source when the user selects a desired option

![alt tag](https://raw.githubusercontent.com/manelpb/videojs-qualityselector/master/screenshot.png)

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

  player.qualityselector({
        sources: [
          { format: 'highres', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4'},
          { format: 'hd1080', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4'},
          { format: 'hd720', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4'},
          { format: 'large', src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4'},
          { format: 'medium', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4'},
          { format: 'small', src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_1mb.mp4', type: 'video/mp4'},
          { format: 'auto', src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4', type: 'video/mp4'}
        ],
        formats: [
          { code: 'highres', name: 'High' },
          { code: 'hd1080', name: '1080p' },
          { code: 'hd720', name: '720p' },
          { code: 'large', name: '480p' },
          { code: 'medium', name: '360p' },
          { code: 'small', name: '240p' },
          { code: 'auto', name: 'Auto' }
        ],

        onFormatSelected: function(format) {
          console.log(format);
        }
      });
</script>
```

### Sources

An array of video sources matching the formats

### Formats

An array of possible formats, it should contains a code and name


## License

MIT. Copyright (c) Emmanuel Alves / http://github.com/manelpb

Thanks to http://www.sample-videos.com/ to provide simple example videos in different resolutions


[videojs]: http://videojs.com/
