var fs = require('fs');
var domready = require('domready');
var SpriteAnim = require('sprite-anim');

var SpritesheetAnimator = require('../index.js');

domready(function () {
  var dataFile = JSON.parse(fs.readFileSync(__dirname + '/particle_hover.json', 'utf8'));

  var body = document.getElementsByTagName("body")[0];

  var domContainer = document.createElement("div");
  domContainer.style.position = 'relative';
  domContainer.style.left = '200px';
  body.appendChild(domContainer);


  this.spriteAnimation = new SpritesheetAnimator();

  this.spriteAnimation.init({
  	sprite: dataFile,	//tp json file
  	parentEl: domContainer, //container
  	folder: 'test/'
  });
  this.spriteAnimation.play(0, true);

})
