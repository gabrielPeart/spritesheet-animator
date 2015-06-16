# spritesheet-animator

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)


## Usage

[![NPM](https://nodei.co/npm/spritesheet-animator.png)](https://www.npmjs.com/package/spritesheet-animator)

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

## License

MIT, see [LICENSE.md](http://github.com/miguelmoraleda/moduleTest/blob/master/LICENSE.md) for details.
