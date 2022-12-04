<template>
  <div>
    <div class="content">
      <img src="https://sqimg.qq.com/qq_product_operations/im/2015/brand.png" />
    </div>
    <div
      v-for="(img, index) in imgList"
      :key="index"
      class="bc-img"
      :style="{ backgroundImage: 'url(' + img.img + ')' }"
      @click="toCategory(img.id, img.name)"
    >
      <p>{{ img.text }}</p>
    </div>
    <div class="wenzi"></div>
    <!-- <div class="bc-img1" @click="toCategory(17)">
      <p>科幻电影</p>
    </div>
    <div class="wenzi"></div>
    <div class="bc-img2" @click="toCategory(22)">
      <p>战争电影</p>
    </div>
    <div class="wenzi"></div>
    <div class="bc-img3" @click="toCategory(25)">
      <p>动画电影</p>
    </div>
    <div class="wenzi"></div>
    <div class="bc-img4" @click="toCategory(10)">
      <p>悬疑电影</p>
    </div>
    <div class="wenzi"></div>
    <div class="bc-img5" @click="toCategory"></div>
    <div class="wenzi"></div> -->
  </div>
</template>

<script>
export default {
  name: "Mainarea",
  data() {
    return {
      imgList: [
        { img: "../images/科幻.jpg", text: "科幻电影", id: 17, name: "科幻" },
        { img: "../images/战争.jpg", text: "战争电影", id: 22, name: "战争" },
        { img: "../images/动画.jpg", text: "动画电影", id: 25, name: "动画" },
        { img: "../images/悬疑.jpg", text: "悬疑电影", id: 10, name: "悬疑" },
        { img: "../images/科幻.jpg", text: "科幻电影", id: 17, name: "科幻" },
      ],
    };
  },
  methods: {
    toCategory(id, name) {
      this.$router.push({
        name: "category",
        params: { type: id, name: name },
      });
    },
  },
};
</script>
d
<style scoped>
.nav {
  width: 100%;
  position: fixed;
  z-index: 200;
  height: 150px;
}
div > p {
  color: white;
  text-align: center;
  font-size: 20vh;
  line-height: 600px;
  letter-spacing: 100px;
}
.crossbanner {
  height: 739px;
  background-color: skyblue;
}
.content {
  height: 321px;
}
.content > img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.wenzi {
  height: 584px;
  background-color: #fff;
}
.bc-img {
  margin-bottom: 600px;
  width: 100%;
  height: 600px;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
div[class^="bc-"] {
  cursor: pointer;
}
</style>