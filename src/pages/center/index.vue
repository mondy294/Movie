<template>
  <div class="big-box">
    <Topic></Topic>
    <div class="headImg">
      <div class="user">
        <div
          class="touxiang"
          @mouseenter="changephoto"
          @mouseleave="changephoto"
        >
          <img class="photo" :src="userinfo.user_pic" />
          <router-link to="/center/upload"
            ><div class="mask" ref="mask">更换头像</div></router-link
          >
        </div>
        <span class="nickname">我永远喜欢艾莉西亚qwq</span>
        <input
          type="text"
          placeholder="修改个性签名"
          class="space_user"
          v-model="tip"
        />
      </div>
    </div>
    <div class="nav">
      <a @mouseenter="move">主页</a>
      <a @mouseenter="move" @click="toMessage">动态</a>
      <a @mouseenter="move">投稿</a>
      <a @mouseenter="move">订阅视频</a>
      <a @mouseenter="move">设置</a>
      <div class="n" ref="s" style="left: 20px; width: 32px"></div>
    </div>
    <div>
      <router-view> </router-view>
    </div>
    <div class="footer-nav">
      <h1>你可以通过屏幕右侧二维码联系我们</h1>
    </div>
    <div class="connect">
      <img src="./images/erwei.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Topic from "../Home/Topic";
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      userinfo: {},
      tip: "",
      showmask: 1,
      b_b: 1,
    };
  },
  name: "Center",
  mounted() {
    this.getData();
    this.$bus.$on("regetdata", this.regetdata);
  },
  components: {
    Topic,
  },

  methods: {
    async getData() {
      try {
        let result = await this.$API.GetCenterInfo(
          qs.stringify({ id: this.id })
        );
        this.userinfo = result.message[0];
      } catch (error) {
        alert(error.message);
      }
    },
    changephoto() {
      if (this.$refs.mask.style.opacity == 1) {
        this.$refs.mask.style.opacity = 0;
      } else {
        this.$refs.mask.style.opacity = 1;
      }
    },
    move(event) {
      this.$refs.s.style.left = event.target.offsetLeft + "px";
      this.$refs.s.style.width = event.target.clientWidth + "px";
    },
    regetdata() {
      this.getData();
    },
    toMessage() {
      this.$router.push({
        name: "message",
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.footer-nav {
  position: relative;
  top: 200px;
  width: 100%;
  height: 200px;
  background-color: #c4e1f9;
  /* background-color: #fff; */
}
.footer-nav > h1 {
  position: absolute;
  top: 50px;
  left: 50px;
  color: #fff;
}
.connect > img {
  position: fixed;
  right: 10px;
  top: 360px;
  width: 300px;
}
.big-box {
  /* background-color: red; */
  width: 100%;
  background: url("https://s1.hdslb.com/bfs/static/stone-free/dyn-home/assets/background.png");
  background-attachment: fixed;
}
.headImg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 75px;
  width: 1283px;
  height: 192px;
  background-image: url("./images/head.webp");
}
.user {
  position: absolute;
  left: 20px;
  bottom: 16px;
  width: 1236px;
  height: 60px;
}
.nickname {
  position: absolute;
  left: 80px;
  font-size: 18px;
  font-weight: 700;
  vertical-align: middle;
  color: white;
}
.photo {
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 2px solid white;
  background-color: pink;
}
.touxiang {
  position: relative;
  display: inline-block;
}
.mask {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 8px;
  line-height: 60px;
  top: 0px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
}
.show_mask {
  display: none;
}
.space_user {
  box-sizing: border-box;
  background: transparent;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 12px;
  font-family: Microsoft Yahei;
  line-height: 26px;
  height: 26px;
  padding: 0 5px;
  position: relative;
  left: 20px;
  top: -10px;
  width: 730px;
  outline-style: none;
  transition: all 0.3s ease;
}
.space_user:hover {
  background-color: rgba(255, 255, 255, 0.3);
  /* border: 1px solid white; */
}
.space_user:focus {
  background-color: white;
  color: black;
}
.nav {
  position: relative;
  box-sizing: border-box;
  top: 280px;
  left: 50%;
  transform: translateX(-50%);
  width: 1283px;
  height: 66px;
  background-color: #fff;
  border-radius: 5px;
}
.nav > a {
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 66px;
  height: 100%;
  text-align: center;
  margin-right: 36px;
}
.nav > a:nth-child(1) {
  margin-left: 20px;
}
.nav > a:hover {
  color: #00a1d6;
}
.n {
  position: absolute;
  background: #00a1d6;
  height: 3px;
  bottom: -1px;
  transition: all 0.2s ease;
}

.box_background {
  background-color: skyblue;
  /* border: 0px; */
}
</style>>
