# spritesheet-animator

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![NPM](https://nodei.co/npm/spritesheet-animator.png)](https://www.npmjs.com/package/spritesheet-animator)

## Install

```bash
$ npm install spritesheet-animator
```

## Usage

```
var dataFile = JSON.parse(fs.readFileSync(__dirname + '/particle_hover.json', 'utf8'));

this.spriteAnimation = new SpritesheetAnimator();

this.spriteAnimation.init({
  sprite: dataFile,	//tp json file
  parentEl: animationContainer, //container
  folder: 'test/'
});
this.spriteAnimation.play(0, true);
```

## Testing before using?

```js
git clone https://github.com/Jam3/spritesheet-animator
cd spritesheet-animator
npm install
beefy test/browserTest.js -o
```

## Release History

* 1.0.0 First stable version
* 0.0.0 Experimental phase


## License

MIT, see [LICENSE.md](http://github.com/miguelmoraleda/moduleTest/blob/master/LICENSE.md) for details.
