class Slide {
  constructor(options) {
    this.defaultOptions = {
      element: '',
      speed: 1200,
    }
    this.options = Object.assign({}, this.defaultOptions, options)
    this.imgWrap = $(`${this.options.element} .imgWrap`)
    this.imgs = this.imgWrap.children('img')
    this.buttons = $(`${this.options.element} .buttons`)
    this.spans = this.buttons.children('span')
    this.imgWidth = this.imgs.eq(1).width()
    this.n = 0 //轮播起始位置
    this.timer = null

    this.checkOptions().init().start()

  }

  checkOptions() {
    if (!this.options.element) {
      throw new Error('element is required!')
    }
    return this
  }

  init() {
    this.imgWrap.append(this.imgs.first().clone())
    this.imgWrap.prepend(this.imgs.last().clone())
    this.imgWrap.css({
      left: '-' + this.imgWidth + 'px',
    })
    this.bindEvents()
    this.spans.eq(this.n).addClass('active')
    return this
  }

  bindEvents() {
    //用户缩小页面时，停止计时器，防止出现bug
    $(document).on('visibilitychange', () => {
      if (document.hidden) {
        window.clearInterval(this.timer)
      } else {
        this.start()
      }
    })

    $(`${this.options.element}`).on('mouseover', () => {
      window.clearInterval(this.timer)
    })
    $(`${this.options.element}`).on('mouseleave', () => {
      this.start()
    })

    //绑定按钮事件
    for (var i = 0; i < this.spans.length; i++) {
      let _this = this
      _this.spans.eq(i).on('click', (function (i) {
        return function () {
          _this.n = i
          _this.changeTo(++_this.n)
        }
      })(i))
    }

  }

  start() {
    this.timer = setInterval(() => {
      this.changeTo(++this.n)
    }, this.options.speed)
    return this
  }

  changeTo(index) {
    this.spans.removeClass('active').eq(index-1).addClass('active')
    this.imgWrap.animate({
        left: '-' + this.imgWidth * this.n + 'px'
      },
      350,
      () => {
        if (++index == this.imgs.length + 1) {
          this.n = 0
          this.imgWrap.css({
            left: '0'
          })
        }
      })
  }
}

! function () {
  new Slide({
    element: '.slide',
  })
}.call()