/*
 * atvImg
 * Copyright 2015 Drew Wilson
 * http://drewwilson.com
 *
 * Modified by Edward Chu
 * https://github.com/chuyik
 *
 * -------------------
 *
 * This atvImg plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/**
 * [atvImg description]
 * @param  {Object} $img - Zepto/jQuery object of an image element
 * @param  {Object} options
 * @param  {[string]} options.layers - Urls of image layers
 */

function atvImg(options) {
  
  var $img = this

  var d = document,
    bd = d.getElementsByTagName('body')[0],
    win = window,
    supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

  var $box = $('<div />').addClass('atvImg')
    .width($img.width())
    .height($img.height())

  $img.wrap($box).remove()

  var layersData = []
  if (options && options.layers) {
    options.layers.forEach(function (layer) {
      // TODO: accept `layer` not only string type
      layersData.push({
        src: layer
      })
    })
  } else {
    layersData.push({
      src: $img.attr('src')
    })
  }

  var $container = $('<div />').addClass('atvImg-container'),
    $shine = $('<div />').addClass('atvImg-shine'),
    $shadow = $('<div />').addClass('atvImg-shadow'),
    $layers = $('<div />').addClass('atvImg-layers')

  for (var i = 0; i < layersData.length; i++) {
    var imgSrc = layersData[i].src,
      $layer = $('<div />').addClass('atvImg-rendered-layer')
        .attr('data-layer', i)
        .css('background-image', 'url(' + imgSrc + ')')

    $layers.append($layer)
  }

  $container
    .append($shadow, $layers, $shine)
    .appendTo($box)

  var w = $box.width()
  $box.css('transform', 'perspective(' + w * 2 + 'px)')

  if (supportsTouch) {
    win.preventScroll = false;

    (function (_box, _layers, _shine) {
      $box.on('touchmove', function (e) {
        if (win.preventScroll)
          e.preventDefault()

        processMovement(e, true, _box, _layers, _shine)
      })

      $box.on('touchstart', function (e) {
        win.preventScroll = true
        processEnter(e, _box)
      })

      $box.on('touchend', function (e) {
        win.preventScroll = false
        processExit(e, _box, _layers, _shine)
      })
    })($box[0], $layers.children(), $shine[0])

  } else {

    (function (_box, _layers, _shine) {
      $box.on('mousemove', function (e) {
        processMovement(e, false, _box, _layers, _shine)
      })
      $box.on('mouseenter', function (e) {
        processEnter(e, _box)
      })
      $box.on('mouseleave', function (e) {
        processExit(e, _box, _layers, _shine)
      })

    })($box[0], $layers.children(), $shine[0])
  }

  function processMovement(e, touchEnabled, elem, layers, shine) {

    var totalLayers = layers.length,
      bdst = bd.scrollTop,
      bdsl = bd.scrollLeft,
      pageX = (touchEnabled) ? e.touches[0].pageX : e.pageX,
      pageY = (touchEnabled) ? e.touches[0].pageY : e.pageY,
      offsets = elem.getBoundingClientRect(),
      w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
      h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
      wMultiple = 160 / w,
      offsetX = 0.52 - (pageX - offsets.left - bdsl) / w, //cursor position X
      offsetY = 0.52 - (pageY - offsets.top - bdst) / h, //cursor position Y
      dy = (pageY - offsets.top - bdst) - h / 2, //@h/2 = center of container
      dx = (pageX - offsets.left - bdsl) - w / 2, //@w/2 = center of container
      yRotate = (offsetX - dx) * (0.14 * wMultiple), //rotation for container Y
      xRotate = (dy - offsetY) * (0.2 * wMultiple), //rotation for container X
      imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)', //img transform
      arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
      angle = arad * 180 / Math.PI - 90, //convert rad in degrees
      strength = 2.5

    // get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }

    // container transform
    if (elem.firstChild.className.indexOf(' over') != -1) {
      imgCSS += ' scale3d(1.07,1.07,1.07)';
    }
    elem.firstChild.style.transform = imgCSS;
    
    // gradient angle and opacity for shine
    shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
    shine.style.transform = 'translateX(' + ((offsetX * totalLayers) - 0.1) + 'px) translateY(' + ((offsetY * totalLayers) - 0.1) + 'px)';  

    // parallax for each layer
    var revNum = totalLayers;

    for (var i = 0; i < totalLayers; i++) {
      layers[i].style.transform = 'translateX(' + (offsetX * revNum) * ((i * strength) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((i * strength) / wMultiple) + 'px)';
      revNum--;
    }
  }

  function processEnter(e, elem) {
    elem.firstChild.className += ' over';
  }

  function processExit(e, elem, layers, shine) {

    var container = elem.firstChild;

    container.className = container.className.replace(' over', '');
    container.style.transform = '';
    shine.style.cssText = '';

    for (var ly = 0; ly < layers.length; ly++) {
      layers[ly].style.transform = '';
    }

  }
}


// work with jQuery/Zepto

(function ($) {
  $.fn.atvImg = atvImg;
})(this.jQuery || this.Zepto);
