
import lazyLoading from './lazyLoading'
export default (routers, data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers, data)
}
function generaMenu (routers, data) {
  // console.log('后台返回的数据：', data)
  data.forEach((item, index) => {
    // let menu = Object.assign({},item)
    let menu = {}
    let urlArr = item.opurl.split('/')
    if (item.parentId === '0') {
      menu.path = '/' + urlArr[urlArr.length - 1]
    } else {
      menu.path = urlArr[urlArr.length - 1]
    }
    menu.name = urlArr[urlArr.length - 1]
    menu.title = item.name
    // console.log(menu.path)
    let count_ = urlArr[urlArr.length - 1].split('-')
    // console.log(count_.length)
    if (count_.length === 1) {
      // menu.component = lazyLoading('main-components/void-single-page')
    } else if (count_.length === 2) {
      // menu.component = lazyLoading('Main')
    } else if (count_.length === 3) {
      menu.component = lazyLoading(count_[0] + '-' + count_[1] + '/' + menu.name)
    } else {
      menu.component = lazyLoading(count_[0] + '-' + count_[1] + '/' + menu.name)
    }
    menu.parentId = item.parentId
    menu.id = item.id
    // menu.component = lazyLoading(menu.component)
    // if(!item.leaf){
    //   menu.children = []
    //   generaMenu(menu.children,item.children)
    // }
    routers.push(menu)
  })
}
