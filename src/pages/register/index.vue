<template>
  <div class="back">
    <div class="header">
      <div class="logo" @click="toHome"></div>
      <span class="lan">简体中文</span>
      <span class="suggest">意见反馈</span>
    </div>
    <div class="main">
      <h1>欢迎注册</h1>
      <form action="">
        <input
          type="text"
          class="account"
          placeholder="昵称"
          v-model="account"
        />
        <input
          type="password"
          class="psw1"
          placeholder="密码"
          v-model="password"
        />
        <input
          type="password"
          class="psw2"
          placeholder="确认密码"
          v-model="password1"
        />
        <div><input type="radio" class="agreement" />是否同意用户协议</div>
        <el-button type="primary" @click="register">立即注册</el-button>
      </form>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Register",
  data() {
    return {
      account: "",
      password: "",
      password1: "",
    };
  },
  methods: {
    toHome() {
      this.$router.push("home");
    },
    async register() {
      let result = await this.$API.Register(
        qs.stringify({ username: this.account, password: this.password })
      );
      if (result.status == 0) {
        alert("注册成功");
        this.$router.push("home");
      } else {
        alert(result.message);
      }
    },
  },
};
</script>

<style scoped>
.back {
  width: 100%;
  height: 100vh;
  background: url("./images/img-bg@2x.png") no-repeat;
  background-size: 100% 100vh;
}
.header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 3;
}
.logo {
  cursor: pointer;
  margin-left: 470px;
  margin-top: 17px;
  padding-top: 76px;
  width: 106px;
  float: left;
  background: url("https://sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo_b.png")
    no-repeat;
}
.lan {
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  line-height: 60px;
  right: 300px;
}
.suggest {
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  line-height: 60px;
  right: 150px;
}
.main {
  position: absolute;
  width: 320px;
  height: 390px;
  left: 50%;
  transform: translateX(-50%);
  top: 200px;
}
.main > form > input {
  box-sizing: border-box;
  display: block;
  width: 320px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid transparent;
  line-height: 1.3;
  margin-top: 30px;
}
.main > div {
  display: inline-block;
  margin-top: 10px;
}
button {
  display: block;
  width: 320px;
  margin-top: 20px;
  position: absolute;
}
</style>