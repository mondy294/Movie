<template>
  <div class="box" @mouseenter="showlist" @mouseleave="shutshow" ref="box">
    <img :src="pic" alt="" :class="{ big: isbig }" />
    <div class="list" v-show="show" ref="list">
      <span @click="toCenter" class="center">个人中心</span>
      <span @click="loginOut" v-show="token">退出登录</span>
    </div>
  </div>
</template>

<script>
import { defaultImg } from "@/assets/index";
import qs from "qs";
export default {
  name: "UserPic",
  data() {
    return {
      userinfo: {},
      id: localStorage.getItem("id"),
      isbig: 0,
      show: 0,
      token: localStorage.getItem("Token"),
      prepic: localStorage.getItem("pic"),
    };
  },
  computed: {
    pic: {
      get() {
        return this.prepic || defaultImg.src;
      },
    },
  },
  mounted() {
    this.$bus.$on("getid", this.getid);
    this.$bus.$on("reloading", this.reloading);
  },
  methods: {
    showlist() {
      this.isbig = 1;
      this.show = 1;
      setTimeout(() => {
        this.$refs.list.style.opacity = 1;
      }, 10);
      this.$refs.box.style.top = 25 + "px";
    },
    shutshow() {
      this.$refs.list.style.opacity = 0;
      this.isbig = 0;
      setTimeout(() => {
        this.show = 0;
      }, 500);
      this.$refs.box.style.top = 15 + "px";
    },
    loginOut() {
      localStorage.removeItem("Token", "");
      localStorage.removeItem("pic", "");
      localStorage.removeItem("id", "");
      this.$router.replace("home");
      location.reload();
    },
    toCenter() {
      if (this.token) {
        this.$router.push("/center");
      } else {
        alert("您还未登录");
      }
    },
    getid(result) {
      this.id = result.user.id;
      this.token = result.token;
    },
    async getData() {
      try {
        let result = await this.$API.getUserInfo(qs.stringify({ id: this.id }));
        if (result.status == 1) {
          this.prepic = result.message[0].user_pic;
        }
      } catch (error) {
        alert(error.message);
      }
    },
    reloading() {
      this.getData();
    },
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  cursor: pointer;
  text-align: center;
  top: 15px;
  margin-left: 40px;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  transition: all 0.5s;
}
.box > img {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 25px;
  transition: all 0.5s;
  z-index: 20;
}
.list {
  position: absolute;
  opacity: 0;
  top: 30px;
  right: -122px;
  border-radius: 8px;
  width: 300px;
  height: 380px;
  background-color: #fff;
  transition: all 0.5s;
  z-index: -5;
}
.big {
  transform: scale(2);
}
.list > span {
  display: inline-block;
  cursor: pointer;
  line-height: 50px;
  width: 100%;
  height: 50px;
  transition: all 0.5s;
}
.center {
  margin-top: 50px;
}
.list > span:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>