
//面向过程
// ! function () {
//   var imgs = $('.imgWrap > img')
//   var size = $('.imgWrap > img').length
//   var n = 0

//   setInterval(() => {
//     makeLeave(getImgNode(n)).one('transitionend', (e) => {
//       makeEnter($(e.currentTarget))
//     })
//     makeCurrent(getImgNode(n + 1))
//     n = getValue(++n)
//   }, 3000)

//   function getValue(x) {
//     return x >= size ? 0 : x < 0 ? size - 1 : x
//   }

//   function getImgNode(index) {
//     return imgs.eq(getValue(index))
//   }

//   function makeLeave($node) {
//     return $node.removeClass('current').addClass('leave')
//   }

//   function makeCurrent($node) {
//     return $node.removeClass('enter').addClass('current')
//   }

//   function makeEnter($node) {
//     return $node.removeClass('leave').addClass('enter')
//   }
// }


//面向对象
function Slide($slide) {
  this.imgs = $('.imgWrap > img')
  this.size = $('.imgWrap > img').length
  this.n = 0
  this.$slide = $slide

  this.init()
}

Slide.prototype.init = function(){
  let _this = this
  setInterval(() => {
    _this.makeLeave(_this.getImgNode(_this.n)).one('transitionend', (e) => {
      _this.makeEnter($(e.currentTarget))
    })
    _this.makeCurrent(_this.getImgNode(_this.n + 1))
    _this.n = _this.getValue(++_this.n)
  }, 3000)
}

Slide.prototype.getValue = function(x){
  let _this = this
  return x >= _this.size ? 0 : x < 0 ? _this.size - 1 : x
}

Slide.prototype.getImgNode = function(index) {
  let _this = this
  return _this.imgs.eq(_this.getValue(index))
}

Slide.prototype.makeLeave = function($node) {
  return $node.removeClass('current').addClass('leave')
}

Slide.prototype.makeCurrent = function($node) {
  return $node.removeClass('enter').addClass('current')
}

Slide.prototype.makeEnter = function($node) {
  return $node.removeClass('leave').addClass('enter')
}


! function () {
  let $slide = new Slide($('.slide'))
}.call()