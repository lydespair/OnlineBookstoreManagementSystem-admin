<template>
    <div class="layout-aside-container">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="gotowelcome" style="width: 250px">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2" style="width: 250px">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="2-1" @click="gotousers" style="width: 250px">
            <i class="el-icon-s-custom"></i>用户列表
          </el-menu-item>
      </el-submenu>
      <el-submenu index="3" style="width: 250px">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>图书管理</span>
        </template>
          <el-menu-item index="3-1" @click="gotobooks" style="width: 250px">
            <i class="el-icon-reading"></i>图书列表
          </el-menu-item>
      </el-submenu>
      <el-submenu index="4" style="width: 250px">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="4-1" @click="gotoorders" style="width: 250px">
            <i class="el-icon-sell"></i>订单列表
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="5" @click="gotosettings" style="width: 250px">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
  name: "MyAside",
  methods: {
    gotosettings() {
      this.$router.push('/home/settings')
    },
    gotowelcome() {
      this.$router.push('/home/welcome')
    },
    gotousers() {
      this.$router.push('/home/users')
    },
    gotobooks() {
      this.$router.push('/home/books')
    },
    gotoorders() {
      this.$router.push('/home/orders')
    },
    handleOpen() {

    },
    handleClose() {
      
    }
  }
};
</script>

<style lang="less" scoped>
.layout-aside-container {
  width: 250px;
  height: 100%;
  border-right: 1px solid #eaeaea;
}

.menu {
  list-style-type: none;
  padding: 0;
  .menu-item {
    line-height: 50px;
    font-weight: bold;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:hover {
      background-color: #efefef;
      cursor: pointer;
    }
    a {
      display: block;
      color: black;
      padding-left: 30px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}

</style>