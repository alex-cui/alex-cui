/*eslint-env browser*/

var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];
    this.options = {numLeaves: 30};
    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    this._resetLeaf = function(leaf) {
      // place leaf towards the top left
      leaf.x = this.width * 2 - Math.random()*this.width*2;
      leaf.y = -10;
      leaf.z = Math.random()*200;

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

      // changes speed of leaves falling down
      leaf.ySpeed = Math.random() + 7;

      return leaf;
    }

    this._updateLeaf = function(leaf) {
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
      if (leaf.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf.rotation.x + 'deg)';
      }
      leaf.el.style.webkitTransform = t;
      leaf.el.style.MozTransform = t;
      leaf.el.style.oTransform = t;
      leaf.el.style.transform = t;7
    }
  }

LeafScene.prototype.init = function() {
    for (var i = 0; i < this.options.numLeaves; i++) {
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
    for (var i = 0; i < this.leaves.length; i++) {
      this._updateLeaf(this.leaves[i]);
    }
    requestAnimationFrame(this.render.bind(this));
}

// start up leaf scene
var leafContainer = document.querySelector('.falling-leaves'),
  leaves = new LeafScene(leafContainer);

leaves.render();

function toggle() {
    leaves.init();
}

var p1 = false;
var p2 = false;
var p3 = false;
var p4 = false;

function toggleZoom(flag) {
    var element = document.getElementById(flag);
    
    console.log(flag);
    if (flag == "p1") {
        if (p1) 
            element.classList.remove("zoomIn");
        else 
            element.classList.add("zoomIn");
        p1 = !p1;
    } 
    else if (flag == "p2") {
        if (p2) 
            element.classList.remove("zoomIn");
        else 
            element.classList.add("zoomIn");
        p2 = !p2;
    } 
    else if (flag == "p3") {
        if (p3) 
            element.classList.remove("zoomIn");
        else 
            element.classList.add("zoomIn");
        p3 = !p3;
    } 
    else if (flag == "p4") {
        if (p4) 
            element.classList.remove("zoomIn");
        else 
            element.classList.add("zoomIn");
        p4 = !p4;
    } 
    
} 

$(function(){  // $(document).ready shorthand
//  $('#home').fadeIn('slow');
  $('#home').animate({'opacity':'1'},500);
});

//$(document).ready(function() {
//
//    /* Every time the window is scrolled ... */
//    $(window).scroll( function(){
//
//        /* Check the location of each desired element */
//        $('.fade-in').each( function(i){
//
//            var bottom_of_object = $(this).position().top + $(this).outerHeight();
//            var bottom_of_window = $(window).scrollTop() + $(window).height();
//
//            /* If the object is completely visible in the window, fade it it */
//            if( bottom_of_window > bottom_of_object ){
//
//                $(this).animate({'opacity':'1'},500);
//
//            }
//
//        }); 
//
//    });
//
//});