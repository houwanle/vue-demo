<template>
  <div class="sliderMenu">
    <Menu
      active-name="1-1"
      :theme="theme"
      width="auto"
      :open-names="[]"
      @on-select="clickMenuItem"
    >
      <Submenu v-for="(item, index) in navList" :key="index" :name="item.name">
        <template slot="title">
          <Icon :type="item.iconType"></Icon>{{ item.innerText }}
        </template>
        <MenuItem
          v-for="(c_item, c_index) in item.menuItemList"
          :key="c_index"
          :name="c_item.name"
          :to="c_item.linkUrl"
          >{{ c_item.innerText }}</MenuItem
        >
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoUrl: '',
      theme: 'dark',
      navList: [
        {
          name: 1,
          iconType: 'ios-navigate',
          innerText: '基本资料',
          menuItemList: [
            {
              name: '1-1',
              innerText: '树结构',
              linkUrl: '/Tree'
            },
            {
              name: '1-2',
              innerText: '日志列表',
              linkUrl: '/DairyList'
            },
            {
              name: '1-3',
              innerText: '视频',
              linkUrl: '/VideoPage'
            }
          ]
        },
        // {
        //   name: 2,
        //   iconType: 'ios-keypad',
        //   innerText: '测试JS',
        //   menuItemList: [
        //     {
        //       name: '2-1',
        //       innerText: 'js基础',
        //       linkUrl: '/BasicJs'
        //     },
        //     {
        //       name: '2-2',
        //       innerText: '子菜单2'
        //     },
        //     {
        //       name: '2-3',
        //       innerText: '子菜单3'
        //     }
        //   ]
        // },
        // {
        //   name: 3,
        //   iconType: 'ios-analytics',
        //   innerText: '测试css3',
        //   menuItemList: [
        //     {
        //       name: '3-1',
        //       innerText: '炫酷css',
        //       linkUrl: '/CoolCss'
        //     },
        //     {
        //       name: '3-2',
        //       innerText: '子菜单2'
        //     },
        //     {
        //       name: '3-3',
        //       innerText: '子菜单3'
        //     }
        //   ]
        // },
        // {
        //   name: 4,
        //   iconType: 'ios-archive',
        //   innerText: '测试组件',
        //   menuItemList: [
        //     {
        //       name: '4-1',
        //       innerText: '组件传值',
        //       linkUrl: '/PureChild'
        //     },
        //     {
        //       name: '4-2',
        //       innerText: '子路由',
        //       linkUrl: '/FatherRouter'
        //     },
        //     {
        //       name: '4-3',
        //       innerText: '动态form',
        //       linkUrl: '/DongTaiForm'
        //     }
        //   ]
        // },
        // {
        //   name: 5,
        //   iconType: 'ios-archive',
        //   innerText: 'work-page',
        //   menuItemList: [
        //     {
        //       name: '5-1',
        //       innerText: '订单管理',
        //       linkUrl: '/order-manage-search'
        //     },
        //     {
        //       name: '5-2',
        //       innerText: '授权页面',
        //       linkUrl: '/ShouQuan'
        //     },
        //     {
        //       name: '5-3',
        //       innerText: '上传图片',
        //       linkUrl: '/UploadImage'
        //     },
        //     {
        //       name: '5-4',
        //       innerText: '三营演示site',
        //       linkUrl: '/YanShi'
        //     },
        //     {
        //       name: '5-5',
        //       innerText: '录播系统',
        //       linkUrl: '/LuBo'
        //     }
        //   ]
        // },
        // {
        //   name: 6,
        //   iconType: 'ios-archive',
        //   innerText: 'Echarts',
        //   menuItemList: [
        //     {
        //       name: '6-1',
        //       innerText: '地图',
        //       linkUrl: '/EchartMap'
        //     },
        //     {
        //       name: '6-2',
        //       innerText: 'none',
        //       linkUrl: '/ShouQuan'
        //     },
        //     {
        //       name: '6-3',
        //       innerText: 'none',
        //       linkUrl: '/UploadImage'
        //     }
        //   ]
        // },
        // {
        //   name: 7,
        //   iconType: 'ios-archive',
        //   innerText: '常用插件',
        //   menuItemList: [
        //     {
        //       name: '7-1',
        //       innerText: '拖拽-vue-slicksort',
        //       linkUrl: '/SlickSort'
        //     },
        //     {
        //       name: '7-2',
        //       innerText: 'codepenCropper',
        //       linkUrl: '/CodePenCropper'
        //     },
        //     {
        //       name: '7-3',
        //       innerText: 'better-scroll',
        //       linkUrl: '/BetterScroll'
        //     }
        //   ]
        // }
      ]
    }
  },
  methods: {
    clickMenuItem (menuItemName) {
      console.log(menuItemName)
    }
  }
}
</script>

<style>
</style>