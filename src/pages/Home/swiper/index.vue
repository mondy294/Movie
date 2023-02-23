<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imglist" :key="index">
        <img :src="item" />
      </div>
    </div>

    <div class="swiper-pagination"></div>

    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Swiper",
  data() {
    return {};
  },
  props: ["imglist"],
  mounted() {
    var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
      loop: true, // 循环模式选项

      autoplay: true,

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        //点击分页器也能让轮播图滚动
        clickable: true,
      },

      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },
    });
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-slide > img {
  width: 100%;
  height: 100%;
}
</style>