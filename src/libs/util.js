import Main from '@/views/Main.vue'
import MenuUtils from '@/libs/MenuUtils1'

let util = {}
util.title = function (title) {
  title = title || '数字录播系统'
  window.document.title = title
}

util.inOf = function (arr, targetArr) {
  let res = true
  arr.map(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false
    }
  })
  return res
}

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

util.showThisRoute = function (itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess)
  } else {
    return itAccess === currentAccess
  }
}

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null
  }
  // debugger;
  let routerObj = null
  for (let item of routers) {
    if (item.name === name) {
      return item
    }
    routerObj = util.getRouterObjByName(item.children, name)
    if (routerObj) {
      return routerObj
    }
  }
  return null
}

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return item.title.i18n//vm.$t(item.title.i18n)
  } else {
    return item.title
  }
}

util.setCurrentPath = function (vm, name) {
  let title = ''
  let isOtherRouter = false
  // 其中toadd里面包括了otherRouter信息
  let data = JSON.parse(localStorage.getItem('loginRes'))
  if (data) {
    // console.log('刷新', data.user.permissions)
    let tempArr = []
    MenuUtils(tempArr, data.user.permissions)
    var id2index = []
    for (let i = 0; i < tempArr.length; i++) {
      id2index[tempArr[i].id] = i
    }
    var finalRouter = []
    for (let item of tempArr) {
      // console.log(item)
      if (item) {
        if (item.parentId !== '0') {
          // console.log(initROUTER[item.name])
          // 通过item的parentId进行children的拼装
          if (tempArr[id2index[item.parentId]] !== undefined && !Object.prototype.hasOwnProperty.call(tempArr[id2index[item.parentId]],'children')) {
            // item.children = []
            tempArr[id2index[item.parentId]].children = []
          }
          if (tempArr[id2index[item.id]].id) {
            tempArr[id2index[item.parentId]].children.push(tempArr[id2index[item.id]])
          }
        } else {
          finalRouter.push(tempArr[id2index[item.id]])
        }
      }
    }
  }

  var toadd = [{
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        title: {
          i18n: 'home'
        },
        name: 'home_index',
        component: () => import('@/views/home/home.vue')
      }
    ]
  }]

  for (let item of finalRouter) {
    // console.log('util', item)
    toadd.push(item)
  }

  toadd.forEach(item => {
    item.children.forEach(child => {
      if (child.children && child.children.length > 0) {
        child.children.forEach(cchild => {
          if (cchild.name === name) {
            title = util.handleTitle(vm, cchild)
            if (item.name === 'otherRouter') {
              isOtherRouter = true
            }
          }
        })
      } else if (child.name === name) {
        title = util.handleTitle(vm, child)
        if (item.name === 'otherRouter') {
          isOtherRouter = true
        }
      }
    })
  })

  let currentPathArr = []
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: util.handleTitle(
          vm,
          util.getRouterObjByName(
            toadd,
            'home_index'
          )
        ),
        path: '',
        name: 'home_index'
      }
    ]
  } else if (
    (name.indexOf('_index') >= 0 || isOtherRouter) &&
    name !== 'home_index'
  ) {
    currentPathArr = [
      {
        title: util.handleTitle(
          vm,
          util.getRouterObjByName(
            toadd,
            'home_index'
          )
        ),
        path: '/home',
        name: 'home_index'
      },
      {
        title: title,
        path: '',
        name: name
      }
    ]
  } else {
    let level3 = false // 是否为三级菜单
    let currentPathObj = toadd.filter(item => {
      let i = 0
      let childArr = item.children
      let len = childArr.length
      while (i < len) {
        if (childArr[i].name === name) {
          return true
        }
        let j = 0
        let cchildArr = childArr[i].children
        if (cchildArr && cchildArr.length > 0) {
          let clen = cchildArr.length
          while (j < clen) {
            if (cchildArr[j].name === name) {
              level3 = true
              return true
            }
            j++
          }
        }
        i++
      }
      return false
    })[0]
    if (
      currentPathObj.children &&
      currentPathObj.children.length <= 1 &&
      currentPathObj.name === 'home'
    ) {
      currentPathArr = [
        {
          title: '首页', // 首页
          path: '',
          name: 'home_index'
        }
      ]
    } else {
      // 三级菜单时
      if (level3) {
        let level2Num = null
        let level3Num = null
        let find = false
        for (let m = 0; m < currentPathObj.children.length; m++) {
          if (
            !currentPathObj.children[m].children ||
            currentPathObj.children[m].children.length === 0
          ) {
            continue
          }
          for (
            let n = 0;
            n < currentPathObj.children[m].children.length;
            n++
          ) {
            if (
              currentPathObj.children[m].children[n].name === name
            ) {
              level2Num = m
              level3Num = n
              find = true
              break
            }
          }

          if (find) {
            break
          }
        }

        currentPathArr = [
          {
            title: '首页', // 首页
            path: '/home',
            name: 'home_index'
          },
          {
            title: currentPathObj.title,
            path: '',
            // path: currentPathObj.path,
            name: currentPathObj.name
          },
          {
            title: currentPathObj.children[level2Num].title,
            path: '',
            // path:
            //     currentPathObj.path +
            //     '/' +
            //     currentPathObj.children[level2Num].path,
            name: currentPathObj.children[level2Num].name
          },
          {
            title:
              currentPathObj.children[level2Num].children[level3Num].title,
            path:
              currentPathObj.path + '/' + currentPathObj.children[level2Num].path + '/' + currentPathObj.children[level2Num].children[level3Num].path,
            name:
              currentPathObj.children[level2Num].children[level3Num].name
          }
        ]
      } else {
        // 二级菜单时
        let childObj = currentPathObj.children.filter(child => {
          return child.name === name
        })[0]
        currentPathArr = [
          {
            title: '首页', // 首页
            path: '/home',
            name: 'home_index'
          },
          {
            title: currentPathObj.title,
            path: '',
            name: currentPathObj.name
          },
          {
            title: childObj.title,
            path: currentPathObj.path + '/' + childObj.path,
            name: name
          }
        ]
      }
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr)

  return currentPathArr
}

util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    let tag = null
    let tagsList = vm.$store.state.app.tagsList
    for (let m = 0; m < tagsList.length; m++) {
      if (tagsList[m].children) {
        for (let n = 0; n < tagsList[m].children.length; n++) {
          if (tagsList[m].children[n].name === name) {
            tag = tagsList[m].children[n]
            break
          }
        }
        if (tag !== null) {
          break
        }
      } else {
        if (tagsList[m].name === name) {
          tag = tagsList[m]
          break
        }
      }
    }

    // let tag = vm.$store.state.app.tagsList.filter(item => {
    //     if (item.children) {
    //         return name === item.children[0].name;
    //     } else {
    //         return name === item.name;
    //     }
    // });
    // tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('increateTag', tag)
    }
  }
  vm.$store.commit('setCurrentPageName', name)
}

util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length
  let i = 0
  let notHandle = true
  while (i < len) {
    if (
      routers[i].name === name &&
      routers[i].children &&
      routers[i].redirect === undefined
    ) {
      route.replace({
        name: routers[i].children[0].name
      })
      notHandle = false
      next()
      break
    }
    i++
  }
  if (notHandle) {
    next()
  }
}
util.fullscreenEvent = function (vm) {
  vm.$store.commit('initCachepage')
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist')
  // 全屏相关
}

// util.checkUpdate = function (vm) {
//     axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
//         let version = res.data.tag_name;
//         vm.$Notice.config({
//             duration: 0
//         });
//         if (semver.lt(packjson.version, version)) {
//             vm.$Notice.info({
//                 title: 'iview-admin更新啦',
//                 desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
//             });
//         }
//     });
// };

export default util
