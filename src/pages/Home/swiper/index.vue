<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" id="cross1">
        <img
          src="https://downv6.qq.com/qqweb/QQ_1/picture2/898pc%E5%89%8D%E6%99%AF.png"
        />
      </div>
      <div class="swiper-slide" id="cross2">
        <img src="https://sqimg.qq.com/mapp/im_qq_com/pc-feture.png" />
      </div>
    </div>

    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Swiper",
  data() {
    return {};
  },
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
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
    });
  },
};
</script>

<style scoped>
#cross1 > img {
  position: absolute;
  left: 42%;
  transform: translateX(-50%);
  transform: scale(2);
  bottom: 45px;
}
#cross2 > img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px;
}
#cross1 {
  background: url("https://qzonestyle.gtimg.cn/aoi/sola/20190627155257_hfDit78vGr.jpeg");
}
#cross2 {
  background: url("https://sqimg.qq.com/mapp/im_qq_com/pc_bg.jpg");
}
.swiper-container {
  width: 100%;
  height: 940px;
}
</style>