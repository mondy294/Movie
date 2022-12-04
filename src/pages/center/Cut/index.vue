<template>
  <div class="box">
    <div class="updata" v-show="isupdata">
      <div class="cropper">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :canMoveBox="option.canMoveBox"
          :canMove="option.canMove"
          :centerBox="option.centerBox"
          :info="option.info"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        >
          ></vue-cropper
        >
        <!--底部操作工具按钮-->
        <div class="footer-btn">
          <div class="scope-btn">
            <label class="btn" for="uploads">选择图片</label>
            <input
              type="file"
              id="uploads"
              style="position: absolute; clip: rect(0 0 0 0)"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="selectImg($event)"
            />
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-zoom-in"
              @click="changeScale(1)"
              >放大</el-button
            >
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-zoom-out"
              @click="changeScale(-1)"
              >缩小</el-button
            >
            <el-button size="mini" type="danger" plain @click="rotateLeft"
              >↺ 左旋转</el-button
            >
            <el-button size="mini" type="danger" plain @click="rotateRight"
              >↻ 右旋转</el-button
            >
          </div>
          <div class="upload-btn">
            <el-button size="mini" type="success" @click="uploadImg('blob')"
              >上传图片 <i class="el-icon-upload"></i
            ></el-button>
          </div>
        </div>
      </div>
      <span class="cut"></span>
      <!--预览效果图-->
      <div class="show-preview">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
      <!-- <div class="changed">
        <img :src="newimg" alt="" />
      </div> -->
      <button class="test" @click="test" ref="test">测试</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { VueCropper } from "vue-cropper";
export default {
  name: "CutDown",
  components: {
    VueCropper,
  },
  data() {
    return {
      id: "",
      isupdata: 0,
      newdata: {},
      newimg: "",
      show: this.visible,
      name: this.Name,
      previews: {},
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //裁剪框的大小信息，图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 300, //默认生成截图框宽度
        autoCropHeight: 300, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1.5, 1], //截图框的宽高比例
        full: true, //false按原比例裁切图片，不失真
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: false, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: false, //截图框是否被限制在图片里面
        height: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "230px 150px", //图片默认渲染方式
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    Name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$bus.$on("getimg", this.getimg);
  },
  watch: {
    visible() {
      this.show = this.visible;
    },
  },
  methods: {
    //初始化函数
    imgLoad(msg) {},
    //图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //实时预览函数
    realTime(data) {
      this.previews = data;
    },
    getimg(data) {
      this.isupdata = !data.isupdata;
      this.option.img = data.imgURL;
      this.id = data.id;
    },
    //选择图片
    selectImg(e) {
      let file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }
      //转化为blob
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
      };
      //转化为base64
      reader.readAsDataURL(file);
    },
    //上传图片
    //不知道为什么不能在这里使用async await 只能另写一个函数触发
    uploadImg(type) {
      let _this = this;
      if (type === "blob") {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          var a = new FileReader();
          a.readAsDataURL(data); //读取文件保存在result中
          a.onload = function (e) {
            var getRes = e.target.result; //读取的结果在result中
            //获取截取下来的新头像
            _this.newimg = getRes;
            //模拟点击test按钮发送更换头像请求
            _this.$refs.test.click();
            _this.isupdata = !_this.isupdata;
            //重新显示更改头像界面
            _this.$bus.$emit("reback", 1);
            //让upload组件重新向服务器获取数据
            _this.$bus.$emit("reget");
            localStorage.setItem("pic", getRes);
            setTimeout(() => {
              _this.$bus.$emit("reget");
              _this.$bus.$emit("regetdata");
              _this.$bus.$emit("reloading");
            }, 30);

            //发送请求更换头像
            // let result = _this.$API.ChangeUserPic(
            //   qs.stringify({ newpic: getRes })
            // );
            // if (result.status == 0) {
            //   console.log("okk");
            // }
          };
        });
      }
    },
    async test() {
      let result = await this.$API.ChangeUserPic(
        qs.stringify({ newimg: this.newimg, id: this.id })
      );
    },
  },
};
</script>

<style scoped lang="less">
.cropper {
  position: absolute;
  margin-top: 100px;
  left: 150px;
  width: 500px;
  height: 500px;
}
.cut {
  position: absolute;
  top: 100px;
  right: 570px;
  background-color: gray;
  width: 2px;
  height: 500px;
}
.show-preview {
  flex: 1;
  -webkit-flex: 1;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  .preview {
    position: absolute;
    right: 200px;
    top: 200px;
    overflow: hidden;
    border: 1px solid #67c23a;
    background: #cccccc;
  }
}
.btn {
  cursor: pointer;
}
.test {
  display: none;
  width: 100px;
  height: 50px;
  background-color: skyblue;
  cursor: pointer;
}
</style>