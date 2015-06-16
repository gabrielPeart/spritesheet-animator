var fs = require('fs');
var domready = require('domready');

var SpritesheetAnimator = require('../index.js');

domready(function () {

  var body = document.getElementsByTagName("body")[0];

  var animationContainer = document.createElement("div");
  animationContainer.style.position = 'relative';
  body.appendChild(animationContainer);

  var dataFile = JSON.parse(fs.readFileSync(__dirname + '/particle_hover.json', 'utf8'));

  this.spriteAnimation = new SpritesheetAnimator();

  this.spriteAnimation.init({
  	sprite: dataFile,	//tp json file
  	parentEl: animationContainer, //container
  	folder: 'test/'
  });
  this.spriteAnimation.play(0, true);

})
