<template>
  <div class="topic">
    <div class="logo"></div>
    <a class="active" @click="tohome">首页</a>
    <a
      href="#"
      class="active"
      id="category"
      @mouseenter="showType"
      @mouseleave="shutType"
      >电影分类
    </a>
    <a href="#" class="active">动态</a>
    <a class="active" @click="register">注册</a>
    <a href="#" class="active">QQ安全</a>
    <a class="active" @click="login" v-show="!token">登录</a>
    <UserPic></UserPic>
  </div>
</template>

<script>
import "animate.css";
import UserPic from "./userpic";
import { defaultImg } from "@/assets/index";
export default {
  components: { UserPic },
  data() {
    return {
      timer: null,
      token: localStorage.getItem("Token"),
    };
  },
  name: "Topic",
  computed: {
    defaultImg() {
      return defaultImg.src;
    },
    pic: {
      get() {
        return localStorage.getItem("pic") || this.defaultImg;
      },
      set(value) {
        return value;
      },
    },
  },
  mounted() {
    this.$bus.$on("okk", this.clear);
    this.$bus.$on("getInfo", this.getInfo);
  },
  methods: {
    showType() {
      this.$bus.$emit("getShow");
    },
    shutType() {
      this.timer = setTimeout(() => {
        this.$bus.$emit("getShow");
      }, 100);
    },
    clear() {
      clearTimeout(this.timer);
    },

    register() {
      this.$router.push("/register");
    },
    login() {
      this.$bus.$emit("showModel");
    },
    getInfo(result) {
      this.token = result.token;
    },
    tohome() {
      this.$router.replace("/home");
    },
  },
};
</script>

<style scoped>
#category {
  position: relative;
}
.active {
  background-color: transparent;
}
.topic {
  /* background-color: #fff; */
  position: absolute;
  z-index: 100;
  width: 100%;
  margin: 0px;
  padding: 0;
  height: 75px;
}

.topic :nth-child(4) {
  margin-right: 250px;
}
.topic > a:nth-child(n + 2) {
  font-size: 24px;
  width: 100px;
  height: 75px;
  text-align: center;
}
a:hover {
  transform: scale(1.2);
}
div,
a {
  display: inline-block;
  line-height: 75px;
  font-size: 1.125em;
  transition: all 0.5s;
  /* margin-left: 10px;
  margin-right: 10px;
  padding: 0 5px; */
}
.logo {
  margin-left: 470px;
  margin-top: 17px;
  padding-top: 76px;
  width: 106px;
  float: left;
  /* background: url("https://sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo_b.png")
    no-repeat; */
}
a {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
</style>