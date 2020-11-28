<style lang="less">
@import './main.less';
</style>

<template>
  <div class="layout">
    <Layout>
      <Header></Header>
      <Layout>
        <Sider hide-trigger >
          <Menu></Menu>
        </Sider>
        <Content>
          <Breadcrumb></Breadcrumb>
          <router-view />
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  </div>
</template>
<script>
import Menu from '../components/menu';
import Breadcrumb from '../components/breadcrumb';

export default {
  name: 'Main',
  components: {
    Menu,
    Breadcrumb
  }
    
}
</script>