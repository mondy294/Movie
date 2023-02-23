<template>
  <div class="msg_box">
    <div class="left">
      <div class="msg_nav">
        <div class="nav_header"></div>
        <div class="nav_footer">
          <div
            class="user_img"
            :style="{ backgroundImage: 'url(' + userinfo.user_pic + ')' }"
          ></div>
          <a>{{ userinfo.username }}</a>
          <div class="my-info-box">
            <div class="my-info">
              <span>339</span>
              <em style="height: 15px; width: 100%"></em>
              <span>关注</span>
            </div>
            <div class="my-info">
              <span>3</span>
              <em style="height: 15px; width: 100%"></em>
              <span>粉丝</span>
            </div>
            <div class="my-info">
              <span>96</span>
              <em style="height: 15px; width: 100%"></em>
              <span>动态</span>
            </div>
          </div>
        </div>
      </div>
      <div class="friend_list">
        <div class="fs-header">
          <span>正在直播(10)</span>
          <span class="more iconfont">更多 &#xe65f;</span>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/1.jpg" />
          <div class="friend-info">
            <span>心上瑶</span>
            <span>【无人声】耳疗开始了</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/2.jpg" />
          <div class="friend-info">
            <span>4A广告提案忘</span>
            <span>我在B站看广告</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/3.jpg" />
          <div class="friend-info">
            <span>佰鹤羽</span>
            <span>玩玩原神</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/4.jpg" />
          <div class="friend-info">
            <span>BBGG、狮子喵</span>
            <span>国服第一只因上线！！</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/5.jpg" />
          <div class="friend-info">
            <span>守护茶茶</span>
            <span>B站第一亚索</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/6.jpg" />
          <div class="friend-info">
            <span>她整夜在写信</span>
            <span>你的月亮我的信</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/7.jpg" />
          <div class="friend-info">
            <span>哔哩哔哩英雄联盟赛事</span>
            <span>恭喜搞子盾队获得解说杯冠军</span>
          </div>
        </div>
        <div class="friend">
          <img class="friend-img" src="@/assets/images/8.jpg" />
          <div class="friend-info">
            <span>心上瑶</span>
            <span>【无人声】耳疗开始了</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle" ref="dlke">
      <div class="publishing">
        <div
          ref="publish"
          class="text_area"
          placeholder="有什么想和大家分享的？"
          contenteditable="true"
        ></div>

        <div class="logo">
          <span class="iconfont">&#xe69e;</span>
          <span class="iconfont" @click="choose = !choose">&#xe63e; </span>
          <div class="choose_img" v-show="choose">
            <div class="triangle"></div>
            <span>图片上传</span>
            <span>{{ pic_data_list.length }}/9</span>
            <div class="pic_base">
              <div
                class="pre_pic"
                v-for="(item, index) in pic_data_list"
                :key="index"
                :style="{
                  backgroundImage: 'url(' + pic_data_list[index] + ')',
                }"
              >
                <div class="delete_pic iconfont" @click="delete_pic(index)">
                  &#xed1e;
                </div>
              </div>
              <div
                class="upload_pic"
                @click="$refs.pic_data.click()"
                v-show="pic_data_list.length < 9"
              ></div>
              <input
                type="file"
                ref="pic_data"
                v-show="false"
                @change="add_pic"
              />
            </div>
          </div>
          <button @click="publish">发布</button>
        </div>
      </div>
      <div class="tab_list"></div>

      <div class="dongtai" v-for="item in message" :key="item.id">
        <div
          class="author"
          :style="{ backgroundImage: 'url(' + item.author_img + ')' }"
        ></div>
        <a>{{ item.message_author }}</a>
        <span class="publish_time"
          >{{ item.publish_time.split(".")[0].replace("T", " ") }}发布</span
        >
        <div class="content_dongtai">
          <span
            class="content_area"
            :class="{ unfold: item.isfold }"
            ref="pb"
            >{{ item.message_content }}</span
          >
          <div
            @click="unfold($event, item)"
            v-show="item.content_rows > 6"
            ref="fold_btn"
          >
            展开
          </div>
          <div class="dongtai_img" v-if="item.message_img">
            <img
              v-for="(url, index) in item.message_img.split(',')"
              :key="index"
              :src="'http://127.0.0.1:3008/' + url"
            />
          </div>
        </div>
        <div class="dianzan">
          <span class="iconfont">&#xe602;<i>转发</i></span>
          <span class="iconfont">&#xe7f5;<i>23</i></span>
          <span class="iconfont">&#xec7f;<i>531</i></span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="banner">
        <div class="banner-text">公告栏</div>
        <img
          src="https://i0.hdslb.com/bfs/vc/9c699f2acbcad00197e92c401b835d2c6aba8a55.png@259w_110h_1c.webp"
          alt=""
        />
      </div>
      <div class="ad" v-show="showAd">
        <span class="ad-img"></span>
        <Swiper :imglist="imgList"></Swiper>
        <span class="clean" @click="showAd = false"></span>
      </div>
      <div class="panel">
        <span>话题</span>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
        <div class="topic">
          <div class="topic-title">梅西对着家人画面傻笑半分钟</div>
          <span>113.7万浏览·389讨论</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Swiper from "../../Home/swiper";
export default {
  name: "Message",
  data() {
    return {
      pic_list: [],
      pic_data_list: [],
      choose: 0,
      now: "",
      passage_text: "",
      isfold: 1,
      id: localStorage.getItem("id"),
      userinfo: {},
      message: [],
      showAd: true,
      imgList: [
        "https://i0.hdslb.com/bfs/sycp/creative_img/202212/07665581d02887a7509ce5e19ac45ac0.png",
        "https://i0.hdslb.com/bfs/sycp/creative_img/202212/985be9e30e26cfb0d8ce04bc65f4e436.jpg",
      ],
    };
  },
  components: {
    Swiper,
  },
  mounted() {
    this.getData();
    this.showMessage();
  },
  methods: {
    getNowDate() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //获取当前年
      var mon = myDate.getMonth() + 1; //获取当前月
      var date = myDate.getDate(); //获取当前日
      var hours = myDate.getHours(); //获取当前小时
      var minutes = myDate.getMinutes(); //获取当前分钟
      var seconds = myDate.getSeconds(); //获取当前秒
      var now =
        year +
        "-" +
        mon +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      return now;
    },
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
    unfold(e, item) {
      item.isfold = !item.isfold;
      e.target.innerText = item.isfold ? "展开" : "收起";

      // this.$refs.fold_btn.innerText = this.isfold ? "展开" : "收起";
    },

    async publish() {
      this.choose = !this.choose;
      let now = this.getNowDate();
      console.log(now);
      let formdata = new FormData();
      if (this.pic_list.length) {
        this.pic_list.forEach((item) => {
          formdata.append("file", item);
        });
        // 下面两行打开就能将图片存放至数据库static中
        // let result = await this.$API.sendPicInfo(formdata);
        // console.log(result);
      }

      this.passage_text = this.$refs.publish.innerText;
      formdata.append(
        "json",
        new Blob(
          [
            JSON.stringify({
              message_author: this.userinfo.username,
              message_content: this.passage_text,
              publish_time: now,
              rows: this.$refs.publish.clientHeight / 19,
              author_img: this.userinfo.user_pic,
              message_author_id: this.id,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (this.passage_text || this.pic_data_list.length) {
        let result = await this.$API.sendMessageInfo(formdata);

        // 发送后清空输入框
        this.$refs.publish.innerText = "";
        this.pic_data_list = [];
        this.pic_list = [];

        // 重新获取动态数据
        this.showMessage();
        // console.log(result);
      }
    },

    async showMessage() {
      try {
        let result = await this.$API.getMessageInfo({ id: this.id });
        if (result.status == 1) {
          // 将数据库中所有的动态储存起来
          this.message = result.message.reverse();
          // 页面渲染完成之后再获得middle高度
          // this.$nextTick(() => {
          //   this.content_hight = this.$refs.dlke.clientHeight;
          // });
        }
      } catch (error) {
        alert(error.message);
      }
    },
    add_pic() {
      let _that = this;
      let reader = new FileReader();
      if (this.$refs.pic_data.files[0] != {}) {
        // 这里的fileobj是一个blob格式的图片文件
        const fileObj = this.$refs.pic_data.files[0];
        this.pic_list.push(fileObj);

        // readAsDataURL方法能够读取一个blob或file对象 同时result属性当中会存有一个base64格式的字符串
        reader.readAsDataURL(fileObj);
        // 必须执行onload的回调函数才能在result中获得base64字符串;
        reader.onload = function (e) {
          if (_that.pic_data_list.length < 9) {
            _that.pic_data_list.push(reader.result);
          }
        };
      }
    },
    delete_pic(index) {
      this.pic_data_list.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.msg_box {
  /* 可以阻止文字被反复点击后变蓝 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  position: relative;
  box-sizing: border-box;
  top: 285px;
  left: 50%;
  transform: translateX(-50%);
  width: 1283px;
  /* background-color: skyblue; */
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 60px;
}
.left {
  position: sticky;
  top: 5px;
  width: 268px;
  height: 854px;
}
.msg_nav {
  width: 100%;
  height: 188px;
  border-radius: 5px;
  background-color: white;
}
.nav_header {
  width: 100%;
  height: 64px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-image: url("./images/msg_nav_header.webp");
}
.nav_footer {
  /* 给父盒子设定一个边界 不然.user_img设置margin-top属性时父盒子也会跟着移动 */
  border: 1px solid transparent;
  box-sizing: border-box;
  width: 100%;
  height: 124px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.nav_footer > a {
  vertical-align: top;
  margin-left: 30px;
}
.user_img {
  display: inline-block;
  margin-left: 15px;
  margin-top: -17px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-size: 56px 56px;
}
.friend_list {
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background-color: white;
}
.fs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
}
.fs-header > :nth-child(1) {
  font-size: 20px;
}
.more {
  color: #99a2aa;
}
.friend {
  display: flex;
  box-sizing: border-box;
  justify-self: start;
  align-items: center;
  padding: 5px 0px;
  width: 100%;
  height: 60px;
}
.friend-img {
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid #f25d8e;
  width: 40px;
  height: 40px;
}
.friend-info {
  height: 45px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.friend-info > :nth-child(2) {
  font-size: 14px;
  color: #99a2aa;
}
/* 中间结构 */
.middle {
  position: relative;
  /* left: 50%;
  transform: translateX(-50%); */
  border-radius: 5px;
  width: 700px;
  padding-bottom: 40px;
  min-height: 1200px;
}
.publishing {
  position: relative;
  min-height: 130px;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid transparent;
  background-color: white;
  /* overflow: hidden; */
}
.text_area {
  position: relative;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 60px;
  width: 95%;
  overflow-y: auto;
  outline: none;
  word-wrap: break-word;
  word-break: break-all;

  font-size: 14px;
  cursor: text;
}
/* 为空时显示 */
.text_area:empty:before {
  content: attr(placeholder); /* element attribute*/
  /*content: 'this is content';*/
  color: gray;
}
.logo {
  border-radius: 5px;
  height: 30px;
  width: 100%;
  margin-top: 5px;
  /* margin-bottom: 20px; */
}
.logo > span {
  font-size: 28px;
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.logo > span:hover {
  color: #00a1d6;
}
.choose_img {
  position: absolute;
  box-sizing: border-box;
  padding-top: 10px;
  width: 290px;
  min-height: 143px;
  left: 40px;
  top: 120px;
  border-radius: 4px;
  /* background-color: red; */
  box-shadow: rgb(0 0 0 / 17%) 0px 3px 5px 0px;
  border: 1px solid #e5e9ef;
  background-color: #fff;
  z-index: 200;
}
.choose_img > span:nth-child(2) {
  margin-left: 15px;
  color: #222;
  font-size: 14px;
}
.choose_img > span:nth-child(3) {
  color: silver;
  font-size: 12px;
  margin-left: 10px;
}
.choose_img > .triangle {
  position: absolute;
  box-sizing: border-box;
  top: -6px;
  left: 35px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  border-left: 1px solid #e5e9ef;
  border-top: 1px solid #e5e9ef;
  background-color: #fff;
  /* background-color: blue; */
  z-index: 30000;
}
.pic_base {
  display: flex;
  /* justify-content: left; */
  flex-wrap: wrap;
  padding: 15px;
  padding-right: 0px;
}
.upload_pic {
  box-sizing: border-box;
  border: 2px dashed #cbcbcb;
  cursor: pointer;
  height: 80px;
  margin-top: 10px;
  position: relative;
  transition: border-color 0.3s;
  width: 80px;
}
.upload_pic:hover {
  border: 2px dashed #00a1d6;
}
.upload_pic::before {
  background-color: #bdc0c5;
  border-radius: 4px;
  content: "";
  height: 4px;
  left: 26px;
  position: absolute;
  top: 50%;
  transition: background-color 0.3s;
  width: 28px;
}
.upload_pic::after {
  background-color: #bdc0c5;
  border-radius: 4px;
  content: "";
  height: 4px;
  left: 26px;
  transform: rotate(90deg);
  position: absolute;
  top: 50%;
  transition: background-color 0.3s;
  width: 28px;
}
.upload_pic:hover::after {
  background-color: #00a1d6;
}
.upload_pic:hover::before {
  background-color: #00a1d6;
}
.pre_pic {
  height: 80px;
  margin-top: 10px;
  position: relative;
  margin-right: 8px;
  width: 80px;
  background-size: 80px auto;
  background-position: center;
  background-repeat: no-repeat;
}
.delete_pic {
  position: absolute;
  text-align: center;
  line-height: 20px;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
.logo > button {
  position: absolute;
  right: 15px;
  background-color: #00a1d6;
  width: 70px;
  font-size: 13px;
  height: 32px;
  border-radius: 4px;
  border: 0px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.tab_list {
  margin-top: 10px;
  background-color: white;
  width: 100%;
  border-radius: 5px;
  height: 48px;
}

.dongtai {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 10px;
  padding-bottom: 10px;
}

.author {
  display: inline-block;
  margin-top: 25px;
  margin-left: 25px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-size: 56px 56px;
}
.dongtai > a {
  position: absolute;
  text-decoration: none;
  color: rgb(251, 114, 153);
  left: 118px;
  top: 35px;
  cursor: pointer;
}
.publish_time {
  position: absolute;
  left: 118px;
  top: 60px;
  color: #99a2aa;
  cursor: pointer;
  font-size: 12px;
  height: 22px;
  line-height: 18px;
}
.content_dongtai {
  position: relative;
  left: 118px;
  width: 150px;
  margin-top: 5px;
}
.content_area {
  position: relative;
  display: -webkit-box;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  /* pre-wrap显示换行符 */
  white-space: pre-wrap;
  -webkit-box-orient: vertical;
  width: 532px;
  /* height: 255px; */
  /* background-color: red; */
}
/* 控制动态不展开的情况下显示的文字行数 */
.unfold {
  -webkit-line-clamp: 6;
  text-overflow: ellipsis;
}
.content_dongtai > div {
  margin-top: 5px;
  color: #178bcf;
  cursor: pointer;
}
.dongtai_img {
  position: relative;
  width: 500px;
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.dongtai_img > img {
  margin: 5px 5px;
  width: 40%;
  height: 100%;
}
.dianzan {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 266px;
  height: 48px;
  left: 118px;
  /* background-color: blue; */
}
.dianzan > span {
  box-sizing: border-box;
  padding: 5px;
  color: #99a2aa;
  font-size: 16px;
  line-height: 48px;
  cursor: pointer;
}
.dianzan > span:hover {
  color: #178bcf;
}
.dianzan > span > i {
  margin-left: 5px;
  font-style: normal;
  font-size: 14px;
  line-height: 48px;
}

/* 右边结构 */
.right {
  position: sticky;
  top: 5px;
  height: 854px;
  width: 268px;
  height: 672px;
  border-radius: 5px;
}
.banner {
  box-sizing: border-box;
  width: 100%;
  height: 155px;
  padding: 5px 0px;
  background-color: white;
  border-radius: 5px;
}
.banner-text {
  width: 100%;
  height: 20px;
  margin-left: 10px;
}
.banner > img {
  position: absolute;
  border-radius: 5px;
  width: 240px;
  left: 50%;
  margin-top: 10px;
  transform: translateX(-50%);
}
.ad {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 156px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 5px;
}
.ad-img {
  position: absolute;
  width: 38px;
  height: 22px;
  left: 4px;
  bottom: 4px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=)
    50% no-repeat;
  z-index: 9999;
  border-radius: 2px;
  background-size: cover;
}
.clean {
  position: absolute;
  top: 4px;
  right: 4px;
  height: 14px;
  width: 14px;
  background-color: #fff;
  border-radius: 1px;
  z-index: 1;
  cursor: pointer;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKgAAAADUGqULAAABwUlEQVRYCe3Z3W2DMBQFYBdVmQHEA0PwxGRdoV0jy/DEEDwQmALqg3QbZIF/DxWRYskyCvj64zoYQtSyLDddv3V96Hq1AhNstw9sKKW+dL1y+QH0oYXFlZXaNgK6XBy58rJXQML4hrJnypnRcRzVMAzscf/iTdOkUF3l03YAArRtux5SVZWq69p2ePC+rutU3/drv6ZpVFEcLz7OjMroCIjArLJFIuY8z9bQVmie5wqZlMLCmkiMUZalDLPbWqHogelmYveQPl8pJ5SJjUXC4AVlYFOQQdAUbCoyGBqDZSCjoCFYFjIa6oNlIjGe9c6EA2xFlhW5u0iLPtttxl2N8jxqZm97cgwk4nkvT9vBzW3zpiD7WUjEo0AFdmZLgR5NPevZgJJRE4npRpXCwiZd9XtIWQkAlStf2u0+ORHfNnrqXUjzAkvNbBTUhZQsMbHBUF8kGxsEDUUysd7QWCQL6wVNRTKwTigLmYq1QvHiQdZADMS6d++tBq6XEFZolj13s5BHmZXPj1rnY56cKX7jn1Ewa0iI7S0JxnVCz8DFxHzObUzvf+zzhrKTjYyO7KAnxBsBvZ8QmB3yrvSfIi/xh9gvf7qDYRSmCwcAAAAASUVORK5CYII=);
  background-size: 12px 12px;
  background-repeat: no-repeat;
  background-position: 50%;
}
.panel {
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  padding: 20px 10px;
  background-color: white;
  border-radius: 5px;
}
.panel > span {
  font-size: 16px;
}
.topic {
  margin-top: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  margin-left: 25px;
  padding-right: 12px;
  position: relative;
}
.topic-title {
  font-size: 14px;
}
.topic > span {
  font-size: 12px;
  color: #9499a0;
}
.topic::before {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy4yODggMS41OTNhLjYzMy42MzMgMCAwMC0uMDEtLjI3N2MtLjExOC0uNDY0LS41ODgtLjc5LTEuMTE3LS43NWEuNzkuNzkgMCAwMC0uMjkuMDc2LjcxNy43MTcgMCAwMC0uMTk2LjEzOWMtLjAyNi4wMjUtLjA0OC4wNTMtLjA3LjA4TDExLjYuODY2bC0uMDcxLjA4Ny0uMTQxLjE3NmMtLjE4Ny4yMzUtLjM3LjQ3My0uNTQ1LjcxNWExNy43MzQgMTcuNzM0IDAgMDAtLjc0NSAxLjExMmwtLjM4Ny0uMDA0YTgxLjgzNyA4MS44MzcgMCAwMC0yLjEyNS4wMSAxMy45MjUgMTMuOTI1IDAgMDAtLjI0LS4zNzkgMjAuNzc1IDIwLjc3NSAwIDAwLTEuMDU1LTEuNDU0bC0uMTQtLjE3Nkw2LjA4Ljg2NiA2LjA3OC44NjNhLjcxNC43MTQgMCAwMC0uMjY4LS4yMi43ODkuNzg5IDAgMDAtLjI5LS4wNzdjLS41MTMtLjA0LS45OTUuMjczLTEuMTE2Ljc1YS42MzMuNjMzIDAgMDAuMTMzLjU3OGwuMDA0LjAwNi4wNjguMDg5LjEzOC4xNzhhMjIuMDcgMjIuMDcgMCAwMC43MTYuODY4IDYzLjgxIDYzLjgxIDAgMDAtMS40OTQuMDkzbC0uNDEuMDMyLS4yMDQuMDE3LS4xMTYuMDEzYTEuOTE4IDEuOTE4IDAgMDAtLjA4LjAxMWwtLjAzNS4wMDZBMi44NDUgMi44NDUgMCAwMC43NjcgNS43NTJhNDUuNDY0IDQ1LjQ2NCAwIDAwLS4xOTUgMy4yODYgNDAuMiA0MC4yIDAgMDAuMDY1IDMuMjk0Yy4wMTYuMjc0LjAzNS41NDcuMDU1LjgybC4wMzQuNDExLjAxNy4yMDUuMDAzLjAyNi4wMDMuMDI5LjAwNi4wNThjLjAwMy4wMzIuMDA4LjA2NC4wMTMuMDk1YTIuODY5IDIuODY5IDAgMDAxLjY0OCAyLjE3M2MuMjg3LjEzLjU5NS4yMTQuOTA3LjI0M2wuMDQxLjAwNC4wMTMuMDAxLjA1MS4wMDUuMTAzLjAwOC4yMDUuMDE3LjQxLjAzMmE2OC43NjUgNjguNzY1IDAgMDA5LjAzLjA0OWMuMjcyLS4wMTguNTQ2LS4wMzYuODE5LS4wNTdsLjQxLS4wMzQuMjA1LS4wMTguMTE3LS4wMTIuMDgyLS4wMTMuMDM0LS4wMDVhMi44NjkgMi44NjkgMCAwMDIuMzIyLTIuMjI5bC4wMTMtLjA1OC4wMS0uMDU4YTIuOTM2IDIuOTM2IDAgMDAuMDMtLjIyOGMuMTEyLTEuMDkxLjE4Ny0yLjE4OC4yMTEtMy4yODhhMzQuODQ2IDM0Ljg0NiAwIDAwLS4wOS0zLjNjLS4wMTktLjI3My0uMDQtLjU0Ny0uMDY2LS44MmwtLjA0LS40MS0uMDItLjIwNS0uMDA2LS4wNTEtLjAwNy0uMDU3YTMuMDg0IDMuMDg0IDAgMDEtLjAwNC0uMDNjLS4wMDQtLjAyOS0uMDA3LS4wNTctLjAxMy0uMDg1YTIuODc0IDIuODc0IDAgMDAtMS42NDQtMi4xNCAyLjgyNiAyLjgyNiAwIDAwLS45NDQtLjI0NGgtLjAxMWwtLjA1Mi0uMDA1LS4xMDItLjAwOS0uMjA1LS4wMTYtLjQxLS4wM2E1OC4wODYgNTguMDg2IDAgMDAtMS41OC0uMDlsLjEzLS4xNWMuMTk1LS4yMy4zODQtLjQ2My41Ny0uN2wuMTM3LS4xNzcuMDY4LS4wOS4wMDYtLjAwN2MuMDItLjAyNy4wNDItLjA1NC4wNi0uMDg0YS42MzEuNjMxIDAgMDAuMDgyLS4yMTV6bS0yLjYyNSAzLjY0OGMuMDY3LS40MDQuNDMzLS42NzUuODE5LS42MDVoLjAwNGMuMzg4LjA3NC42NDcuNDYyLjU4Ljg2OUwxMS44IDcuMTEzaDEuNDNjLjQyNiAwIC43Ny4zNjEuNzcuODA2IDAgLjQ0Ni0uMzQ0LjgwNy0uNzcuODA3aC0xLjY5N2wtLjMyIDEuOTM1aDEuNTU2Yy40MjUgMCAuNzcuMzYyLjc3LjgwNyAwIC40NDUtLjM0NS44MDYtLjc3LjgwNmgtMS44MjJsLS4yODcgMS43MzVjLS4wNjcuNDA0LS40MzMuNjc1LS44MTkuNjA1aC0uMDA0Yy0uMzg4LS4wNzQtLjY0Ny0uNDYyLS41OC0uODY5bC4yNDQtMS40N0g3LjYyNGwtLjI4NyAxLjczNGMtLjA2Ny40MDQtLjQzMy42NzUtLjgxOS42MDVoLS4wMDRjLS4zODgtLjA3NC0uNjQ3LS40NjItLjU4LS44NjlsLjI0My0xLjQ3SDQuNzdjLS40MjUgMC0uNzY5LS4zNjItLjc2OS0uODA3IDAtLjQ0NS4zNDQtLjgwNy43Ny0uODA3aDEuNjc0bC4zMi0xLjkzNUg1LjIzYy0uNDI1IDAtLjc3LS4zNjEtLjc3LS44MDcgMC0uNDQ1LjM0NS0uODA2Ljc3LS44MDZoMS44bC4zMDktMS44NzJjLjA2Ny0uNDA0LjQzMy0uNjc1LjgxOS0uNjA1aC4wMDRjLjM4OC4wNzQuNjQ3LjQ2Mi41OC44NjlsLS4yNjYgMS42MDhoMS44NzdsLjMwOS0xLjg3MnptLS44OTYgNS40MmwuMzItMS45MzVIOC4yMWwtLjMyIDEuOTM1aDEuODc3eiIgZmlsbD0iIzAwOEFDNSIvPjwvc3ZnPg==);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  content: "";
  height: 16px;
  left: -24px;
  position: absolute;
  top: 2px;
  width: 16px;
}
.my-info-box {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.my-info {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
  transition: all 0.5s;
}
.my-info > :nth-child(1) {
  font-weight: 600;
}
.my-info:hover {
  color: #00a1d6;
}
.my-info > :nth-child(3) {
  color: #99a2aa;
}
</style>