<!-- 树形表格 -->
<template>
  <a-table
      :columns="columns" 
      :data-source="tabData" 
      :customRow="tableClick"
      expandRowByClick
      :row-selection="{selectedRowKeys: selectedRowKeys, onSelectAll: onSelectAll, onSelect: onSelect}" 
    />
</template>

<script>
/** 引入ant-design-vue的Table */
import Vue from "vue";
import Table from 'ant-design-vue/lib/table'; // 加载 JS
import 'ant-design-vue/lib/table/style/css'; // 加载 CSS  ant-design-vue
Vue.use(Table);

export default {
  data () {
    return {
      columns: [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        },
      ],
      tabData: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park',
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  address: 'New York No. 3 Lake Park',
                },
              ],
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      address: 'London No. 3 Lake Park',
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      address: 'London No. 4 Lake Park',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],

      selectedRowKeys:[],
      expandRowByClick:false,
    }
  },

  /** 方法集合 */
  methods: {
    onSelectAll(selected) {
      if (selected) {
        const tabData = this.tabData;
        const arr = [];
        setVal(tabData, arr);
        this.selectedRowKeys = arr;
      } else {
        this.selectedRowKeys = [];
      }

      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v.key);
          if (v.children) {
            setVal(v.children, arr);
          }
        });
      }
    },

    onSelect(record, selected) {
      const set = new Set(this.selectedRowKeys);
      const tabData = this.tabData;
      const key = record.key;
      if (selected) {
        set.add(key);
        record.children && setChildCheck(record.children);
        setParentCheck(key);
      } else {
        set.delete(key);
        record.children && setChildUncheck(record.children);
        setParentUncheck(key);
      }
      
      this.selectedRowKeys = Array.from(set);
      // 设置父级选择
      function setParentCheck(key) {
        let parent = getParent(key);
        if (parent) {
          set.add(parent.key);
          setParentCheck(parent.key);
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(key) {
        let childHasCheck = false,
        parent = getParent(key);
        if (parent) {
          let childlist = parent.children;
          childlist.forEach(function(v) {
            if (set.has(v.key)) {
              childHasCheck = true;
            }
          });
          if (!childHasCheck) {
            set.delete(parent.key);
            setParentUncheck(parent.key);
          }
        }
      }
      // 获取当前对象的父级
      function getParent(key) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].key === key) {
            return null;
          }
        }
        return _getParent(tabData);
        function _getParent(list) {
          let childlist,
          isExist = false;
          for (let i = 0; i < list.length; i++) {
            if ((childlist = list[i].children)) {
              childlist.forEach(function(v) {
                if (v.key === key) {
                  isExist = true;
                }
              });
              if (isExist) {
                return list[i];
              }
              if (_getParent(childlist)) {
                return _getParent(childlist);
              }
            }
          }
        }
      }
      // 设置child全选
      function setChildCheck(list) {
        list.forEach(function(v) {
          set.add(v.key);
          v.children && setChildCheck(v.children);
        });
      }
      // 设置child取消
      function setChildUncheck(list) {
        list.forEach(function(v) {
          set.delete(v.key);
          v.children && setChildUncheck(v.children);
        });
      }
    },

    /** 点击a-table中的行后，展开或关闭其子行 */
    tableClick(record, index){
      return {
        style:{
          cursor:'pointer',
        },
        on: {
          click: () => {
            // console.log(record,index);
            this.expandRowByClick = !this.expandRowByClick;
          }
        }
      }
    },


  },

  /** 生命周期-创建完成（可以访问当前this实例）*/
  created(){

  },

  /** 生命周期 - 挂载完成（可以访问DOM元素）*/
  mounted(){

  },
  /** 生命周期 - 创建之前 */
  beforeCreate(){

  },
  /** 生命周期 - 挂载之前 */
  beforeMount(){

  },
  /** 生命周期 - 更新之前 */
  beforeUpdate(){

  },
  /** 生命周期 - 更新之后 */
  updated(){

  },
  /** 生命周期 - 销毁之前 */
  beforeDestroy(){

  },
  /** 生命周期 - 销毁完成 */
  destroyed(){

  },
  /** 如果页面有keep-alive缓存功能，该函数会触发 */
  activated(){

  }
}

</script>
<style scoped>
</style>