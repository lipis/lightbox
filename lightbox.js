(function() {
  (function($) {
    return jQuery.fn.lightbox = function(options) {
      var box, boxClose, boxHide, boxImage, boxShow, current, defaults, disableScroll, enableScroll, images, keys, nextImage, prevImage, preventDefault, preventDefaultForScrollKeys, settings, showImage, target;
      defaults = {
        backgroundColor: 'rgba(0, 0, 0, .8)'
      };
      settings = $.extend({}, defaults, options);
      images = [];
      current = 0;
      box = $(this);
      box.append('<div class="lightbox-image"><a class="lightbox-close" href="">×</a></div>');
      boxImage = $('.lightbox-image', box);
      boxClose = $('.lightbox-close', box);
      target = $(box.data('target'));
      if (target.length === 0) {
        return;
      }
      target.each(function(index) {
        var img, slide;
        img = $(this);
        slide = {};
        slide.image = img.data('src-big') || img.attr('src');
        images.push(slide);
        img.css({
          cursor: 'pointer'
        });
        return img.click(function(event) {
          return showImage(index);
        });
      });
      boxShow = function() {
        disableScroll();
        return box.css({
          display: 'block'
        });
      };
      boxHide = function() {
        enableScroll();
        return box.css({
          cursor: 'default',
          display: 'none'
        });
      };
      showImage = function(index) {
        var image, next, prev;
        if (index < 0 || index >= images.length) {
          index = 0;
        }
        current = index;
        image = images[current].image;
        boxImage.css({
          backgroundImage: "url(" + image + ")"
        });
        next = new Image();
        next.src = images[(current + 1) % images.length].image;
        prev = new Image();
        prev.src = images[(current - 1 + images.length) % images.length].image;
        return boxShow();
      };
      nextImage = function() {
        current = (current + 1) % images.length;
        return showImage(current);
      };
      prevImage = function() {
        current = (current - 1 + images.length) % images.length;
        return showImage(current);
      };
      box.click(function(event) {
        if (event.clientX > $(window).width() / 2) {
          return nextImage();
        } else {
          return prevImage();
        }
      });
      box.on('mousemove', function(event) {
        if (event.clientX > $(window).width() / 2) {
          return box.css({
            cursor: 'e-resize'
          });
        } else {
          return box.css({
            cursor: 'w-resize'
          });
        }
      });
      boxClose.click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        return boxHide();
      });
      $(window).keydown(function(event) {
        if (event.which === 27) {
          boxHide();
        }
        if (event.which === 39) {
          event.preventDefault();
          nextImage();
        }
        if (event.which === 37) {
          return prevImage();
        }
      });
      keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
      };
      preventDefault = function(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        return e.returnValue = false;
      };
      preventDefaultForScrollKeys = function(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
      };
      disableScroll = function() {
        if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove = preventDefault;
        return document.onkeydown = preventDefaultForScrollKeys;
      };
      enableScroll = function() {
        if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        return document.onkeydown = null;
      };
      return this;
    };
  })(jQuery);

}).call(this);
