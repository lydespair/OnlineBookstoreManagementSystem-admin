<template>
    <div style="margin: 30px 300px; text-align: center">
        <h1>个人信息</h1>

        <el-descriptions title="用户信息" border>
            <el-descriptions-item label="用户 ID">
                <template slot="label">
                    <i class="el-icon-user"></i> 用户 ID
                </template>
                <el-input v-model="user.userId"></el-input>
            </el-descriptions-item>

            <el-descriptions-item label="用户名">
                <template slot="label">
                    <i class="el-icon-user"></i> 用户名
                </template>
                <el-input v-model="user.userName"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i> 手机号
                </template>
                <el-input v-model="user.tel"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="居住地">
                <template slot="label">
                    <i class="el-icon-location-outline"></i> 地址
                </template>
                <el-input v-model="user.address"></el-input>
            </el-descriptions-item>
            <el-descriptions-item label="备注">
                <template slot="label">
                    <i class="el-icon-tickets"></i> 备注
                </template>
                <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
                <template slot="label">
                    <i class="el-icon-message"></i> 邮箱
                </template>
                <el-input v-model="user.email"></el-input>
            </el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" style="margin-top: 50px; width: 100px" @click="save">修改</el-button>
    </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      user: {}
    }
  },
  methods: {
    load(){
      this.$http.get('/users/exact', {
        params: {
          userId: localStorage.getItem('user')
        }
      }).then(res => {
        this.user = res.data.data
        console.log(this.user)
      })
    },
    save() {
      this.$message({
        type: "success",
        message: "修改成功!",
      })
      this.$http.put('/users', this.user).then(res => {
        this.load()
      })
    }
  },
  created() {
    this.load()
  }
};
</script>

<style>
</style>