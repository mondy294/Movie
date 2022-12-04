<template>
  <div class="upload_box">
    <div class="old" v-show="isupdata">
      <input type="file" ref="img" @change="getyulan" />
      <div class="change_img" @click="changeimg">
        <span>选择本地文件</span>
      </div>
      <span></span>
      <div class="touxiang">
        <img :src="userinfo.user_pic" />
        <p>当前头像</p>
      </div>
    </div>
    <CutDown :imgURL="imgURL"></CutDown>
  </div>
</template>

<script>
import qs from "qs";
import CutDown from "./Cut";

export default {
  name: "upload",
  components: {
    CutDown,
  },
  data() {
    return {
      isupdata: 1,
      imgURL: "",
      id: localStorage.getItem("id"),
      userinfo: {},
    };
  },
  mounted() {
    this.getData();
    this.$bus.$on("reback", this.reback);
    this.$bus.$on("reget", this.reget);
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
    changeimg() {
      this.$refs.img.click();
    },
    p() {
      const fileObj = this.$refs.img.files[0];
      const imgURL = window.URL.createObjectURL(fileObj);
      this.imgURL = imgURL;
      console.log(imgURL);
    },
    getyulan() {
      this.isupdata = 0;
      if (this.$refs.img.files[0] != {}) {
        const fileObj = this.$refs.img.files[0];
        const imgURL = window.URL.createObjectURL(fileObj);
        this.imgURL = imgURL;
      }
      let data = { isupdata: this.isupdata, imgURL: this.imgURL, id: this.id };
      this.$bus.$emit("getimg", data);
    },
    reback(data) {
      this.isupdata = data;
    },
    reget() {
      this.getData();
    },
  },
};
</script>

<style scoped>
.upload_box {
  position: relative;
  top: 285px;
  left: 50%;
  transform: translateX(-50%);
  width: 1283px;
  height: 700px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
input {
  display: none;
}
button {
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  width: 140px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #f1f2f5;
}
.change_img {
  cursor: pointer;
  float: left;
  margin-top: 100px;
  margin-left: 15px;
  border-radius: 5px;
  width: 178px;
  height: 84px;
  background: #f1f2f5;
}
.change_img > span {
  line-height: 84px;
  margin-left: 42px;
}
.touxiang {
  position: absolute;

  text-align: center;
  top: 93px;
  right: 10px;
  border: 0px;
  width: 98px;
  height: 98px;
  border-radius: 49px;
}
.touxiang > img {
  position: absolute;
  left: 0px;
  width: 98px;
  height: 98px;
  border-radius: 49px;
}
.old {
  position: absolute;
  width: 401px;
  height: 318px;
  left: 50%;
  transform: translateX(-50%);
}
.old > span {
  position: absolute;
  display: inline-block;
  left: 230px;
  margin-top: 50px;
  width: 2px;
  height: 182px;
  background-color: #e5e9ef;
}
.touxiang > p {
  position: absolute;
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -25px;
}
.yulan {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.event > img {
  width: 100%;
  height: 100%;
}

.mask {
  width: 50%;
  height: 50%;
  background-color: rgba(0, 255, 0, 0.3);
  position: absolute;
  left: 45.5px;
  top: 45.5px;
  display: none;
}
.event {
  position: absolute;
  top: 46px;
  box-sizing: border-box;
  width: 182px;
  height: 182px;
  border-radius: 5px;
}
.event:hover .mask {
  display: block;
}
.cropper {
  width: 500px;
  height: 500px;
}
.updataimg {
  cursor: pointer;
}
</style>