<template>
  <transition
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInUp"
    leave-active-class="animate__backOutUp"
  >
    <div
      class="box"
      v-show="show"
      @mouseenter="keepShow"
      @mouseleave="shutDown"
    >
      <div class="left">
        <div v-for="i in n" :key="i">{{ i }}</div>
      </div>
      <div class="right">
        <div v-for="i in n" :key="i">
          <a href="#" v-for="i in category" :key="i">科幻</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "animate.css";
export default {
  data() {
    return {
      n: 5,
      category: 15,
      show: 0,
    };
  },
  name: "TypeNav",
  mounted() {
    this.$bus.$on("getShow", this.getShow);
  },
  methods: {
    getShow() {
      this.show = !this.show;
    },
    keepShow() {
      this.show = 1;
      this.$bus.$emit("okk");
    },
    shutDown() {
      this.show = 0;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.box {
  width: 900px;
  height: 500px;
  background-color: white;
  position: absolute;
  z-index: 2;
  top: 75px;
  left: 676px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  border-right: 1px solid black;
  box-sizing: border-box;
}
.left > div {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.left > div:hover {
  background-color: skyblue;
}
.right {
  float: left;
  width: 700px;
  height: 100%;
}
.right > div {
  width: 100%;
  height: 100px;
}
.right a {
  float: left;
  margin-left: 20px;
  font-size: 20px;
  margin-top: 18px;
}
</style>