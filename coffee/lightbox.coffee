(($) ->
  jQuery.fn.lightbox = (options) ->
    defaults =
      backgroundColor: 'rgba(0, 0, 0, .8)'
    settings = $.extend({}, defaults, options)

    images = []
    current = 0
    box = $(@)

    box.append '<div class="lightbox-image"></div>'
    boxImage = $('.lightbox-image', box)

    target = $ box.data 'target'
    if target.length == 0
      return

    target.each (index) ->
      img = $(@)
      slide = {}
      slide.image = img.data('src-big') or img.attr 'src'
      images.push slide

      img.css
        cursor: 'pointer'

      img.click (event) ->
        showImage index

    boxShow = ->
      disableScroll()
      box.css
        display: 'block'

    boxHide = ->
      enableScroll()
      box.css
        display: 'none'

    showImage = (index) ->
      if index < 0 or index >= images.length
        index = 0
      current = index
      image = images[current].image

      boxImage.css
        backgroundImage: "url(#{image})"

      next = new Image();
      next.src = images[(current + 1) % images.length].image
      prev = new Image();
      prev.src = images[(current - 1 + images.length) % images.length].image

      boxShow()

    nextImage = ->
      current = (current + 1) % images.length
      showImage current

    prevImage = ->
      current = (current - 1 + images.length) % images.length
      showImage current

    box.click (event) ->
      if event.clientX > $(window).width() / 2
        nextImage()
      else
        prevImage()

    $(window).keydown (event) ->
      if event.which == 27 # ESC
        boxHide()
      if event.which == 39 # Right
        event.preventDefault()
        nextImage()
      if event.which == 37 # Left
        prevImage()

    # Disable scrolling: http://stackoverflow.com/a/4770179/8418

    # left: 37, up: 38, right: 39, down: 40,
    # spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    keys = {37: 1, 38: 1, 39: 1, 40: 1}

    preventDefault = (e) ->
      e = e or window.event
      if e.preventDefault
        e.preventDefault()
      e.returnValue = false

    preventDefaultForScrollKeys = (e) ->
      if keys[e.keyCode]
        preventDefault e
        return false

    disableScroll = ->
      if window.addEventListener
        window.addEventListener 'DOMMouseScroll', preventDefault, false
      window.onwheel = preventDefault
      window.onmousewheel = document.onmousewheel = preventDefault
      window.ontouchmove = preventDefault
      document.onkeydown = preventDefaultForScrollKeys

    enableScroll = ->
      if window.removeEventListener
        window.removeEventListener 'DOMMouseScroll', preventDefault, false
      window.onmousewheel = document.onmousewheel = null
      window.onwheel = null
      window.ontouchmove = null
      document.onkeydown = null

    return @
) jQuery
