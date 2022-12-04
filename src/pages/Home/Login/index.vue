<template>
  <div>
    <div class="box" v-show="show">
      <div class="shut" @click="shut">X</div>
      <div class="title">密码登录</div>
      <input
        type="text"
        class="account"
        placeholder="请输入账号"
        v-model="account"
      />
      <input
        type="password"
        class="password"
        placeholder="请输入密码"
        v-model="password"
      />
      <el-button type="primary" round @click="login">登录</el-button>
      <div class="footer">
        <a>找回密码</a>
        <a @click="toRegister">注册账号</a>
        <a>意见反馈</a>
      </div>
    </div>
    <div class="mask" v-show="show"></div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      show: 0,
      account: "",
      password: "",
      token: "",
    };
  },
  mounted() {
    this.$bus.$on("showModel", () => {
      this.show = 1;
    });
  },
  methods: {
    async login() {
      try {
        let result = await this.$API.Login(
          qs.stringify({ username: this.account, password: this.password })
        );
        //登陆成功
        if (result.status == 0) {
          this.token = result.token;
          let pic = result.user.user_pic;
          let id = result.user.id;
          this.$bus.$emit("getInfo", result);
          this.$bus.$emit("getid", result);
          this.show = 0;
          localStorage.setItem("Token", this.token);
          localStorage.setItem("pic", pic);
          localStorage.setItem("id", id);
          this.$bus.$emit("reloading");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    shut() {
      this.show = 0;
    },
    toRegister() {
      this.$router.push("register");
    },
  },
};
</script>

<style scoped>
input {
  display: block;
}
a {
  cursor: pointer;
}
a:hover {
  color: skyblue;
}
.box {
  position: absolute;
  text-align: center;
  width: 618px;
  height: 346px;
  background-color: white;
  z-index: 5;
  top: 350px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.shut {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: gray;
  cursor: pointer;
}
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 18px;
}
.account {
  width: 250px;
  height: 16px;
  line-height: 16px;
  margin-top: 15px;
  margin-left: 178px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 13px;
  margin-bottom: 15px;
  padding: 10px 0px 10px 16px;
}
.password {
  width: 250px;
  height: 16px;
  line-height: 16px;
  margin-left: 178px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 13px;
  margin-bottom: 15px;
  padding: 10px 0px 10px 16px;
}
.el-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 85px;
  width: 250px;
}
.footer {
  position: absolute;
  bottom: 20px;
  display: flex;
  text-align: center;
  line-height: 50px;
  width: 100%;
  height: 50px;
  justify-content: center;
}
.footer > a {
  height: 100%;
  width: 100px;
}
.mask {
  position: fixed;
  width: 200vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 199;
}
</style>