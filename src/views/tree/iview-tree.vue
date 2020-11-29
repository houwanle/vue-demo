<template>
  <div class="contentCommon">
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">
            <Icon type="ios-film-outline" />
            {{ title }}
          </p>

          <div class="treeContent">
            <Row>
              <Col span="4">
                <!-- <div class="treeBg">
                 <Tree :data="data1" @on-select-change="clickTree" v-if="isRouterAlive"></Tree>
              </div> -->
                <Card>
                  <p slot="title">城市树</p>
                  <div>
                    <Tree
                      show-checkbox
                      :check-strictly='true'
                      :data="data1"
                      @on-select-change="clickTree"
                      :render="renderContent"
                      v-if="isRouterAlive"
                    ></Tree>
                  </div>
                </Card>
              </Col>
              <Col span="18" offset="1">
                <Card>
                  <p slot="title">与树关联的信息</p>
                  <div>
                    {{ treeInfos }}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>

    <Video :key="refresh" v-if="videoshow" />
  </div>
</template>
<script>
// import DCD from '../doDatas/doCityDatas'
export default {
  created () {
    // const mixdata = [
    //   {
    //     name: '河南省',
    //     id: 1,
    //     parentID: 1111
    //   },
    //   {
    //     name: '河北省',
    //     id: 2,
    //     parentID: 1111
    //   },
    //   {
    //     name: '郑州',
    //     id: 12,
    //     parentID: 1
    //   },
    //   {
    //     name: '荥阳县',
    //     id: 123,
    //     parentID: 12,
    //     info: 'message'
    //   },
    //   {
    //     name: '荥阳2县',
    //     id: 124,
    //     parentID: 12,
    //     info: 'message'
    //   },
    //   {
    //     name: '荥阳1村',
    //     id: 1241,
    //     parentID: 123,
    //     info: 'message'
    //   },
    //   {
    //     name: '焦作',
    //     id: 13,
    //     parentID: 1
    //   },
    //   {
    //     name: '焦作县',
    //     id: 133,
    //     parentID: 13,

    //     info: 'message'
    //   },
    //   {
    //     name: '焦作2县',
    //     id: 134,
    //     parentID: 13,
    //     info: 'message'
    //   },
    //   {
    //     name: '焦作1村',
    //     id: 1341,
    //     parentID: 133,
    //     info: 'message'
    //   }
    // ]

    // const city = new DCD({ mixdata, openFirstItem: true })
    // this.data1 = city.turnToTree().children

    // render (创建元素方法h,{根，当前节点，当前数据})
    // render 里面的 h 相当于create 一个元素 可以是 原生也可以是 组件 按照正常写法给里面补充属性就好，[]中括号表示该元素的子元素
    // 格式为：h (span { span's property },[span's children also use h(span)]) 这样子层层嵌套 ，button 单独写一个
    //  $set ：实例创建之后添加新的属性到实例上，它不会触发视图更新 需要用到set
    const data5 = [
      {
        title: 'father',
        expand: true,
        render: (h, { root, node, data }) => {
          return h(
            'span',
            {
              style: {
                display: 'inline-block',
                width: '100%'
              },
              class: 'fuck'
            },
            [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    marginRight: '32px'
                  }
                },
                [
                  h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                      icon: 'ios-add',
                      type: 'primary'
                    }),
                    style: {
                      width: '64px',
                      marginLeft: '10px'
                    },
                    on: {
                      click: () => {
                        this.treeAppend(data)
                      }
                    }
                  })
                ]
              )
            ]
          )
        },
        // render
        children: [
          {
            title: '1-1',
            expand: true,
            children: [
              {
                title: '1-1-1',
                expand: true
              },
              {
                title: '1-1-2',
                expand: true
              }
            ]
          }
        ]
      }
      // end
    ]
    this.data1 = data5
  },

  data () {
    return {
      title: '树结构案例',
      refresh: 0,
      videoshow: true,
      isRouterAlive: true,
      data1: [],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      treeInfos: ''
    }
  },

  mounted () {},
  methods: {
    clickTree (arr, item) {
      this.treeInfos = item.name
    },
    renderContent (h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            },
            [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-add'
                }),
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.treeAppend(data)
                  }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-remove'
                }),
                on: {
                  click: () => {
                    this.treeRemove(root, node, data)
                  }
                }
              })
            ]
          )
        ]
      )
    },
    // renderContent
    treeAppend (data) {
      const children = data.children || []
      console.log(children)
      children.push({
        title: 'appended',
        expand: true
      })
      // 给data的属性 children 赋予一个新的值children
      this.$set(data, 'children', children)
    },
    // treeAppend
    treeRemove (root, node, data) {
      const parentKey = root.find((el) => el === node).parent
      const parent = root.find((el) => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  }
}
</script>
<style lang="less">
.treeBg {
  background: goldenrod;
  padding: 6px;
  box-sizing: border-box;
}
</style>