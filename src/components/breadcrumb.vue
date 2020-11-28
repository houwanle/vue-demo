<template>
  <div class="mianbaoxie mg20">
    <Breadcrumb separator='>'>
      <BreadcrumbItem v-for="(item, index) in list" :key="index" :to="item.path">
        {{ item.name }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 容器
    }
  },
  watch: {
    $route () {
      // 监听路由变化
      this.list = []
      this.list = this.$route.matched
    }
  },
  mounted () {
    // 刷新时
    this.list = this.$route.matched
  }
}
</script>

<style>
</style>