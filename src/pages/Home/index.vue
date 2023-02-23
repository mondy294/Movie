<template>
  <div>
    <Topic></Topic>
    <TypeNav></TypeNav>
    <Login></Login>
    <Swiper :imglist="img"></Swiper>
    <Mainarea></Mainarea>
  </div>
</template>

<script>
import Topic from "../Home/Topic";
import Swiper from "../Home/swiper";
import Mainarea from "../Home/mainarea";
import TypeNav from "../Home/TypeNav";
import Login from "../Home/Login";

export default {
  name: "Home",
  data() {
    return {
      img: ["./images/科幻.jpg", "./images/动作.jpg"],
    };
  },
  components: {
    Topic,
    Swiper,
    Mainarea,
    TypeNav,
    Login,
  },
};
</script>

<style scoped>
html {
  overflow: hidden;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>