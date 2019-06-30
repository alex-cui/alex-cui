/*eslint-env browser*/

var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];

    this.options = {numLeaves: 20};

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetLeaf = function(leaf) {

      // place leaf towards the top left
      leaf.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf.y = -10;
      leaf.z = Math.random()*200;
      if (leaf.x > this.width) {
        leaf.x = this.width + 10;
        leaf.y = Math.random()*this.height/2;
      }
      // at the start, the leaf can be anywhere
      if (this.timer == 0) {
        leaf.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf.rotation.axis = 'Y';
        leaf.rotation.x = Math.random()*180 + 90;
      } else {
        leaf.rotation.axis = 'Z';
        leaf.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;

      return leaf;
    }

    this._updateLeaf = function(leaf) {
      var xSpeed = leaf.xSpeedVariation;
      leaf.x -= xSpeed;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
      if (leaf.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf.rotation.x + 'deg)';
      }
      leaf.el.style.webkitTransform = t;
      leaf.el.style.MozTransform = t;
      leaf.el.style.oTransform = t;
      leaf.el.style.transform = t;

      // reset if out of view
      if (leaf.x < -10 || leaf.y > this.height + 10) {
        this._resetLeaf(leaf);
      }
    }

  }

LeafScene.prototype.init = function() {
    for (var i = 0; i < this.options.numLeaves && init; i++) {
      var leaf = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetLeaf(leaf);
      this.leaves.push(leaf);
      this.world.appendChild(leaf.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";

    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
}

LeafScene.prototype.render = function() {
    for (var i = 0; i < this.leaves.length && init; i++) {
    
      this._updateLeaf(this.leaves[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
}

// start up leaf scene
var leafContainer = document.querySelector('.falling-leaves'),
  leaves = new LeafScene(leafContainer);

var init = true;

leaves.init();
leaves.render();

function toggle() {
    if (init) {

        init = false;
    }
    else {
        init = true;
    }
    
}


