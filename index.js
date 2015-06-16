var Tween = require('gsap'),
    Signal = require('signals');

var PAUSED = 0;
var PLAYING = 1;

function SpriteAnimator() {
    console.log('SpriteAnimator()');

    this.inited = false;

    this.lastFrame = 0;
    this.currentFrame = 0;
    this.totalFrames = 0;
    this.fps = 24;
    this.scale = 1;
    this.loop = false;
    this.playDirection = 1;
    this.files = {};
    this._frame = -1;
    this.frames = [];
    this.sheetContainerList = [];
    this.sheetDivs = [];
    this.content = null;

    this.onComplete = new Signal();
    this.onRepeat = new Signal();

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onAnimationComplete = this.onAnimationComplete.bind(this);
    this.onAnimationUpdate = this.onAnimationUpdate.bind(this);
    this.onAnimationRepeat = this.onAnimationRepeat.bind(this);
}

SpriteAnimator.prototype = {
    init: function (options, done) {
        //console.log('SpriteAnimator.init(), options: ',options);

        this.options = options;
        this.sprite = options.sprite;

        if (this.sprite.meta.image.indexOf('images') < 0) {
            this.image = options.folder + this.sprite.meta.image;
        } else {
            this.image = this.sprite.meta.image.replace('../', '');
        }
        //console.log('image: ',this.image);

        this.frames = this.sprite.frames;
        this.lastFrame = this.frames.length - 1;
        this.totalFrames = this.frames.length;
        this.scale = (options.scale || this.sprite.meta.scale);
        this.scale = Math.round(this.scale * 10) / 10;

        console.log('scale: ', this.scale);
        console.log('backgroundImage: ', this.image);
        console.log('dims: ', {w: this.sprite.frames[0].frame.w, h: this.sprite.frames[0].frame.h});

        this.container = options.parentEl;
        //this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        //this.container.style.zIndex = 1;
        var frameWidth = this.sprite.frames[0].frame.w;
        var frameHeight = this.sprite.frames[0].frame.h;

        this.container.style.width = frameWidth * this.scale + 'px';
        this.container.style.height = frameHeight * this.scale + 'px';

        this.frames = this.sprite.frames;
        this.lastFrame = this.frames.length - 1;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.top = 0;
        this.el.style.left = 0;
        this.el.style.backgroundImage = 'url(' + this.image + ')';
        //this.el.style.backgroundSize = (this.sprite.meta.size.w)+'px ' + (this.sprite.meta.size.h)+'px';
        //this.el.style.backgroundSize = (this.sprite.meta.size.w*this.scale)+'px ' + (this.sprite.meta.size.h*this.scale)+'px';
        var dimsScale = 100 / this.scale;
        /*this.el.style.height = 150+'%';
         this.el.style.width = 150+'%';*/
        this.el.style.height = dimsScale + '%';
        this.el.style.width = dimsScale + '%';
        this.el.style.zIndex = 1;
        //this.el.style.visibility = 'hidden';
        this.el.style.overflow = 'hidden';

        var cssOrigin = '0 0';

        this.el.style['transform-origin'] = cssOrigin;
        this.el.style.webkitTransformOrigin = cssOrigin;
        this.el.style['-ms-transform-origin'] = cssOrigin;
        this.el.style['-moz-transform-origin'] = cssOrigin;

        var cssScale = 'scale(' + this.scale + ', ' + this.scale + ') translate3d(0,0,0)';
        //var cssScale = 'scale(.5, .5)';

        this.el.style['transform'] = cssScale;
        this.el.style.webkitTransform = cssScale;
        this.el.style['-ms-transform'] = cssScale;
        this.el.style['-moz-transform'] = cssScale;

        this.container.appendChild(this.el);

        if (typeof done == 'function')   done();

        this.inited = true;

        //this.goToFrame(0);

    },
    goToFrame: function (frameNum, done) {
        if (frameNum < 0 || this.frames.length < 0 || this.frames.length - 1 < frameNum) return;
        var frame = this.frames[frameNum];
        var frameDetails = frame.frame;
        //var scale = this.scale;
        //this.el.style.backgroundPosition = (-frameDetails.x*scale) + 'px ' + (-frameDetails.y*scale) + 'px';
        this.el.style.backgroundPosition = (-frameDetails.x) + 'px ' + (-frameDetails.y) + 'px';
        this._frame = frameNum;

        if (typeof done == 'function')   done();


        this.inited = true;

        return this;
    },
    play: function (delay, loop, reverse) {
        delay = delay || 0;
        this.loop = (loop === true);
        this.playDirection = (reverse) ? -1 : 1;
        this.playState = PLAYING;
        var duration = this.frames.length / this.fps;
        var startFrame = (reverse) ? this.lastFrame : 0;
        var endFrame = (reverse) ? 0 : this.lastFrame;
        if (this.animationTween) this.animationTween.kill();
        this.animationTween = Tween.fromTo(this, duration, {_frame: startFrame}, {
            _frame: endFrame,
            delay: delay,
            onUpdate: this.onAnimationUpdate,
            ease: Linear.easeNone,
            roundProps: '_frame',
            onComplete: this.onAnimationComplete,
            onRepeat: this.onAnimationRepeat,
            repeat: (loop) ? -1 : 0
        });
    },
    playReverse: function (delay, loop) {
        this.play(delay, loop, true);
    },
    onAnimationUpdate: function () {
        this.goToFrame(this._frame);
    },
    onAnimationComplete: function () {
        this.goToFrame(this._frame);
        this.onComplete.dispatch();
    },
    onAnimationRepeat: function () {
        this.onRepeat.dispatch();
        if (!this.loop) {
            this.stop();
        }
    },
    stop: function () {
        this.playState = PAUSED;
        if (this.animationTween) this.animationTween.kill();
    },
    destroy: function () {
        if (this.animationTween) this.animationTween.kill();
        this.animationTween = null;
        this.onComplete.removeAll();
        this.onRepeat.removeAll();
        this.onComplete = null;
        this.onRepeat = null;
        this.frames = null;
        this.sprite = null;
        this.image = null;
        this.el.style.backgroundImage = 'data:image/gif;base64,' +
            'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
        this.el.parentNode.removeChild(this.el);
        this.container = null;
        console.log('SpriteAnimator.destroy()');
    }
};


module.exports = SpriteAnimator;
