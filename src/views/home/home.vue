<!-- 首页 -->
<style lang="less">
.welcome {
  .ivu-card-body {
    height: 100%
  }
}

.home-card {
   padding: 0;
  .ivu-card-body {
    padding: 0;
  }
}

.home-card_1 {
  background-image: url('../../images/home.png');
  background-size: cover;
  background-position: center;
}
</style>
<template>
  <div class="welcome">
    <Row>
      <Col>
        <Card class='home-card'>
          <div style="display:flex;justify-content:center;align-items:center;height:90%;">
            <img class="home-img" src="../../images/home.png" alt="">
          </div>
          <!-- <img class="home-img" src="../../images/home.png" alt=""> -->
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  /** 方法集合 */
  methods: {

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