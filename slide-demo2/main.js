! function () {
  var imgs = $('.imgWrap > img')
  var imgWidth = imgs.eq(1).width()
  var n = 0
  var timer = null

  $('.imgWrap').append(imgs.first().clone())
  $('.imgWrap').prepend(imgs.last().clone())

  $('.imgWrap').css({
    left: '-' + imgWidth + 'px'
  })

  start()

  function start() {
    timer = setInterval(() => {
      changeTo(++n)
    }, 1000)
  }

  function changeTo(index) {
    $('.imgWrap').animate({
        left: '-' + imgWidth * n + 'px'
      },
      500,
      () => {
        if (++index == 4) {
          n = 0
          $('.imgWrap').css({
            left: '0'
          })
        }
      })
  }
}.call()