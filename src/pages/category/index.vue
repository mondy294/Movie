<template>
  <div>
    <Topic></Topic>
    <div class="nav">
      <div class="inp">
        <input type="text" class="search" />
        <button>搜索</button>
      </div>
    </div>
    <div class="content">
      <h1 class="title">电影分类排行榜--{{ type_name }}</h1>
      <a class="more" @click="show = !show">更多类型</a>
      <span
        class="iconfont"
        id="triangle"
        :class="{ spy: show }"
        @click="show = !show"
        >&#xe74b;</span
      >

      <div class="types" :class="{ types_high: !show }">
        <span
          v-show="!show"
          v-for="item in imgList"
          :key="item.id"
          @click="regetDate(item.id, item.name)"
          >{{ item.name }}</span
        >
      </div>

      <!-- <span class="iconfont" id="triangle">&#xe652;</span> -->
      <span class="line"> </span>
    </div>
    <div class="article">
      <div class="movie" v-for="film in this.movielist" :key="film.rank">
        <img :src="film.cover_url" alt="" class="movie-img" />
        <span class="rank_num">{{ film.rank }}</span>
        <a href="#">{{ film.title }}</a>
        <div class="director">{{ film.actors[0] }}</div>
        <div class="information">
          {{ film.release_date }}/{{ film.regions[0] }}/{{ film.types }}
        </div>
        <span class="stars">11111111</span>
        <span class="rating_num">{{ film.score }}</span>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import Topic from "../Home/Topic";
export default {
  data() {
    return {
      imgList: [
        { img: "../images/科幻.jpg", text: "科幻电影", id: 17, name: "科幻" },
        { img: "../images/战争.jpg", text: "战争电影", id: 22, name: "战争" },
        { img: "../images/动画.jpg", text: "动画电影", id: 25, name: "动画" },
        { img: "../images/悬疑.jpg", text: "悬疑电影", id: 10, name: "悬疑" },
        { img: "../images/科幻.jpg", text: "科幻电影", id: 27, name: "科幻" },
      ],
      show: 1,
      page: 0,
      type: this.$route.params.type || localStorage.getItem("type"),
      type_name: this.$route.params.name || localStorage.getItem("name"),
      start: 0,
      limit: 20,
      movielist: [],
    };
  },
  name: "Category",
  mounted() {
    localStorage.setItem(
      "type",
      this.$route.params.type || localStorage.getItem("type")
    );
    localStorage.setItem(
      "name",
      this.$route.params.name || localStorage.getItem("name")
    );
    this.getDoubanDate();
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    Topic,
  },
  methods: {
    regetDate(id, name) {
      this.type = id;
      localStorage.setItem("name", name);
      this.movielist = [];
      this.type_name = name;
      this.getDoubanDate();
    },
    async getDoubanDate() {
      let result = await this.$API.getDateInfo({
        type: this.type,
        interval_id: "100:90",
        start: this.start,
        limit: this.limit,
      });
      if (result.length != 0) {
        this.movielist.push.apply(this.movielist, result);
      }
      // 直接用axios发请求
      // axios
      //   .get("douban/j/chart/top_list", {
      //     params: {
      //       type: 11,
      //       interval_id: "100:90",
      //       start: 0,
      //       limit: 20,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
    },
    handleScroll() {
      // console.log(document.documentElement.scrollTop);
      // 边滚动边更新电影
      if (document.documentElement.scrollTop >= 1550 + 2150 * this.page) {
        this.page = this.page + 1;
        this.start = this.start + 20;
        this.getDoubanDate();
      }
    },
  },
};
</script>

<style scoped>
.nav {
  position: relative;
  top: 75px;
  width: 100%;
  height: 80px;
  background-color: #e3ebec;
}
.inp {
  position: absolute;
  width: 461px;
  height: 34px;
  background-color: #fff;
  border: 0.5px solid #e3ebec;
  border-radius: 5px;
  text-align: left;
  top: 20px;
  left: 590px;
}
.inp > input {
  margin-left: 8px;
  width: 96%;
  height: 30px;
  outline: none;
  text-align: left;
  border: 0px;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
}
.inp > button {
  position: absolute;
  width: 34px;
  height: 34px;
}
.content {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 1040px;
  height: 180px;
}
.title {
  font-size: 25px;
  color: #494949;
}
.line {
  box-sizing: border-box;
  display: inline-block;
  margin-top: 64px;
  width: 1040px;
  height: 1px;
  background-color: #494949;
}
.more {
  position: absolute;
  top: 0px;
  right: 10px;
  text-decoration: none;
  color: #37a;
  font-size: 13px;
}
.article {
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  width: 1040px;
}
.movie {
  float: left;
  position: relative;
  margin-left: 50px;
  margin-top: 25px;
  box-sizing: border-box;
  width: 450px;
  height: 191px;
  text-align: left;
  border-bottom: 1px dashed gray;
  cursor: pointer;
  box-sizing: border-box;
}
.movie-img {
  width: 101.25px;
  height: 141.75px;
}
.rank_num {
  position: absolute;
  right: 0px;
  top: 0px;
}
.movie a {
  position: absolute;
  top: 10px;
  left: 115px;
  font-size: 14px;
  text-decoration: none;
  color: #5c5c5c;
}
.director {
  display: inline-block;
  position: absolute;
  top: 40px;
  left: 115px;
  font-size: 14px;
}
.information {
  display: inline-block;
  position: absolute;
  top: 70px;
  left: 115px;
  font-size: 14px;
}
.stars {
  position: absolute;
  line-height: 15px;
  left: 115px;
  bottom: 50px;
  width: 75px;
  height: 15px;
}
.rating_num {
  position: absolute;
  left: 195px;
  bottom: 50px;
  width: 75px;
  height: 15px;
  line-height: 15px;
  color: #e09015;
}
a {
  cursor: pointer;
}
#triangle {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 8px;
  width: 12px;
  height: 12px;
  color: #37a;
  cursor: pointer;
  transition: all 0.5s;
}

.spy {
  transform: rotate(-180deg);
}
.types {
  position: absolute;
  display: flex;
  right: 0;
  height: 0px;
  top: 20px;
  width: 486px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #cfcfcf;
  z-index: 1000;
  justify-content: left;
  align-content: flex-start;
  flex-wrap: wrap;
  transition: all 0.5s;
}
.types_high {
  height: 150px;
}
.types span {
  text-align: center;
  line-height: 21px;
  display: inline-block;
  color: #37a;
  cursor: pointer;
  margin: 5px 15px;
  min-width: 36px;
  height: 21px;
  transition: all 0.5s;
}
.types span:hover {
  transform: scale(1.1);
}
</style>