<template>
  <div>
    <Topic></Topic>
    <TypeNav></TypeNav>
    <Login></Login>
    <Swiper></Swiper>
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