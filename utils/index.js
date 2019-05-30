import pathToRegexp from 'path-to-regexp'

export function pathMatchRegexp (regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname)
}

// 防抖
export function debounce (fun, delay = 800) {
  var timer
  return function (event, ...params) {
    clearTimeout(timer)
    event.persist && event.persist()
    timer = setTimeout(() => {
      fun(event, ...params)
    }, delay)
  }
}

/**
 * 数组 移动内部元素
 * @param {要移动的数组} array
 * @param {当前下标} old_index
 * @param {目标下标} new_index
 */
export function arrayMove (array, old_index, new_index) {
  if (new_index >= array.length) {
    var k = new_index - array.length
    while (k-- + 1) {
      array.push(undefined)
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0])
}
// 上移
export function arrayMoveUp (array, old_index) {
  arrayMove(array, old_index, old_index - 1)
}
// 下移
export function arrayMoveDown (array, old_index) {
  arrayMove(array, old_index, old_index + 1)
}
