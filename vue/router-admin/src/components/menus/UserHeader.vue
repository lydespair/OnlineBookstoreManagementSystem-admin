<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1" @click="gotoHome">首页</el-menu-item>
        <el-menu-item index="2" @click="gotoCart">购物车</el-menu-item>
        <el-menu-item index="3" @click="gotoOrder">我的订单</el-menu-item>
        <el-menu-item style="float: right">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-s-custom"></i>我的
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command=1>个人信息</el-dropdown-item>
                    <el-dropdown-item command=2>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: "UserHeader",
  data() {
    return {
      activeIndex: "",
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/index/userhome");
    },
    gotoCart() {
      this.$router.push("/index/cart");
    },
    gotoOrder() {
      this.$router.push("/index/order");
    },
    handleSelect() {

    },
    handleCommand(command) {
        if (command == 2) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          this.$router.push('/login')
        }
        else this.$router.push('/index/user')
    }
  },
};
</script>

<style lang="less" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>