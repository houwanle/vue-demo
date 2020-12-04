<template>
  <div class="sliderMenu">
    <Menu
      :active-name="$route.name"
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
              innerText: '个人信息',
              linkUrl: '/basic-info/mine-info'
            },
          ]
        },
        {
          name: 4,
          iconType: 'ios-navigate',
          innerText: '表单功能',
          menuItemList: [
            {
              name: '4-1',
              innerText: '动态表单',
              linkUrl: '/form/dynamic-form'
            },
          ]
        },
        {
          name: 2,
          iconType: 'ios-navigate',
          innerText: '树形结构',
          menuItemList: [
            {
              name: '2-1',
              innerText: 'iView-Tree',
              linkUrl: '/tree/iview-tree'
            },
            {
              name: '2-2',
              innerText: '树形表格',
              linkUrl: '/tree/ant-design-tree'
            },
          ]
        },
        {
          name: 3,
          iconType: 'ios-navigate',
          innerText: '足迹地图',
          menuItemList: [
            {
              name: '3-1',
              innerText: 'echart-map',
              linkUrl: '/map/echart-map'
            },
            
          ]
        },
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