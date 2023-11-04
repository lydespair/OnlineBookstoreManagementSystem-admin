<template>
  <section>
  <!-- 管理员登录 -->
  <div class="container"   style="margin-top: 88px">
    <div class="user singinBx">
      <div class="imgBx"><img src="../assets/1.jpg"></div>
      <div class="formBx">
        <form action="">
          <h2>管理员登录</h2>
          <input v-model="admin.adminName" type="text" id="name" placeholder="用户名" />
          <input v-model="admin.adminPwd" type="password" id="password" placeholder="密码" />
          <input type="button" value="登录" @click="login"/>
          <p class="signup"><a href="#" @click="topggleForm">普通用户登录</a></p>
        </form>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      admin: {}
    }
  },
  methods: {
    topggleForm() {
      this.$router.push('login')
    },
    async login() {

      const { data: res } = await this.$http.post("/admins/login", this.admin);
      
      if (res.code === 1) {
        localStorage.setItem("token", res.token);
        this.$router.push("/home/welcome");
      } else {
        localStorage.removeItem("token");
      }
    },
  }
}
</script>

<style lang="less">
.login-container {
  background-color: #35495e;
  height: 100%;
  .login-box {
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    .form-login {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.form-control {
  flex: 1;
}

.avatar-box {
  position: absolute;
  width: 100%;
  top: -65px;
  left: 0;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50% !important;
    box-shadow: 0 0 6px #efefef;
  }
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* 设置整个表单参数 (父盒子)*/

section {
  position: relative;
  min-height: 100vh;
  background: #ffefd5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

section .container {
  position: relative;
  width: 800px;
  height: 500px;
  background: #fff;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

section .container .user {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

/* 更改图片  （左侧）*/
section .container .imgBx {
  position: relative;
  width: 50%;
  height: 100%;
  /* background: #fff; */
  transition: 0.5s;
}

section .container .user .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧表单盒子 */

section .container .user .formBx {
  position: relative;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  transition: 0.5s;
}

/* h2 */

section .container .user .formBx form h2 {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase; /*大小*/
  letter-spacing: 2px; /* 间距*/
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
  color: #555;
}

/* 表单文字属性 */

section .container .user .formBx form input {
  position: relative;
  width: 100%;
  padding: 10px;
  background: #f5f5f5;
  color: #333;
  border: none;
  outline: none;
  box-shadow: none;
  margin: 8px 0;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 300;
}

/* 为登录设置样式 */

section .container .user .formBx form input[type="button"] {
  max-width: 100px;
  background: #ffdab9;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: 0.5s;
  border-radius: 5px;
  border-color: #ffdab6;
}

/* 没有账号时 */

section .container .user .formBx form .signup {
  position: relative;
  margin-top: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #555;
  text-transform: uppercase;
  font-weight: 300;
}

section .container .user .formBx form .signup a {
  font-weight: 600;
  text-decoration: none;
  color: #ffdab9;
}
section .container .singupBx {
  pointer-events: none;
}

section .container.active .singupBx {
  pointer-events: initial;
}

section .container .singupBx .formBx {
  left: 100%;
}

section .container.active .singupBx .formBx {
  left: 0;
}

section .container .singupBx .imgBx {
  left: -100%;
}

section .container.active .singupBx .imgBx {
  left: 0;
}

section .container .singinBx .formBx {
  left: 0;
}

section .container.active .singinBx .formBx {
  left: 100%;
}

section .container .singinBx .imgBx {
  left: 0;
}

section .container.active .singinBx .imgBx {
  left: 100%;
}

@media (max-width: 991px) {
  section .container {
    max-width: 400px;
  }

  section .container .imgBx {
    display: none;
  }
}

</style>

