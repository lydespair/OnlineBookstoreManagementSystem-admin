<template>
  <div class="layout-header-container d-flex justify-content-between align-items-center p-3">
    <!-- 左侧 logo 和 标题区域 -->
    <div class="layout-header-left d-flex align-items-center user-select-none">
      <!-- logo -->
      <img class="layout-header-left-img" src="../../assets/Top.png" alt="">
      <!-- 标题 -->
      <h4 class="layout-header-left-title ml-3">网上书店管理系统</h4>
    </div>

    <!-- 右侧按钮区域 -->
    <div class="layout-header-right">
      <el-button type="danger" @click="logout" round>退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}

.layout-header-left-img {
  height: 50px;
}
</style>