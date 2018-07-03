class Slide {
  constructor(options) {
    this.defaultOptions = {
      element: '',
      speed: 1000,
    }
    this.options = Object.assign({}, this.defaultOptions, options)
    this.imgWrap = $(`${this.options.element}`)
    this.imgs = this.imgWrap.children('img')
    this.imgWidth = this.imgs.eq(1).width()
    this.n = 0
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
    return this
  }

  start() {
    this.timer = setInterval(() => {
      this.changeTo(++this.n)
    }, this.options.speed)
    return this
  }

  changeTo(index) {
    this.imgWrap.animate({
        left: '-' + this.imgWidth * this.n + 'px'
      },
      500,
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
    element: '.imgWrap'
  })
}.call()