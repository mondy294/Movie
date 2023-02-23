<template>
    <div>
        <div class="container">
            <div class="item">
                <h3>单一文件上传「FORM-DATA」</h3>
                <section class="upload_box" id="upload1">
                    <!-- accept=".png" 限定上传文件的格式 -->
                    <input ref="choose1" @change="getfile1" type="file" class="upload_inp" accept=".png,.jpg,.jpeg">
                    <div class="upload_button_box">
                        <button class="upload_button select" :class="{ 'loading': box1.loading }"
                            @click="upload1">选择文件</button>
                        <button class="upload_button upload" :class="{ 'loading': box1.loading }"
                            @click='trans1'>上传到服务器</button>
                    </div>
                    <div class="upload_tip" v-show="box1.show">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</div>
                    <ul class="upload_list" v-show="!box1.show">
                        <li>
                            <span>文件：{{ box1.filename }}</span>
                            <span><em @click="deletefile1">移除</em></span>
                        </li>
                    </ul>
                </section>
            </div>

            <div class="item">
                <h3>单一文件上传「BASE64」，只适合图片</h3>
                <section class="upload_box" id="upload2">
                    <input type="file" class="upload_inp" accept=".jpg,.jpeg,.png">
                    <div class="upload_button_box">
                        <button class="upload_button select">上传图片</button>
                    </div>
                    <div class="upload_tip">只能上传jpg/png格式图片，且大小不能超过2mb</div>
                </section>
            </div>

            <div class="item">
                <h3>单一文件上传「缩略图处理」</h3>
                <section class="upload_box" id="upload3">
                    <input type="file" class="upload_inp" accept=".jpg,.jpeg,.png">
                    <div class="upload_button_box">
                        <button class="upload_button select">选择文件</button>
                        <button class="upload_button upload">上传到服务器</button>
                    </div>
                    <div class="upload_abbre">
                        <img src="" alt="">
                    </div>
                </section>
            </div>
        </div>

        <div class="container">
            <div class="item">
                <h3>单一文件上传「进度管控」</h3>
                <section class="upload_box" id="upload4">
                    <input type="file" class="upload_inp" ref="choose4" @change="getfile4">
                    <div class="upload_button_box">
                        <button class="upload_button select" @click="upload4"
                            :class="{ 'loading': box4.loading }">上传文件</button>
                    </div>
                    <div class="upload_progress" v-show=box4.loading>
                        <div class="value" :style="{ width: box4.rate + '%' }"></div>
                    </div>
                </section>
            </div>

            <div class="item">
                <h3>多文件上传</h3>
                <section class="upload_box" id="upload5">
                    <input type="file" class="upload_inp" multiple>
                    <div class="upload_button_box">
                        <button class="upload_button select">选择文件</button>
                        <button class="upload_button upload">上传到服务器</button>
                    </div>
                    <ul class="upload_list">
                        <!-- <li key='xx'>
                        <span>文件：xxxxx</span>
                        <span><em>移除</em></span>
                    </li> -->
                    </ul>
                </section>
            </div>

            <div class="item">
                <h3>拖拽上传</h3>
                <!-- 必须同时禁止dragover和drop的默认事件 -->
                <section class="upload_box" id="upload6" ref="dragbox" @dragover.prevent="() => { }" @drop.prevent="trans6">
                    <input type="file" ref="choose6" @change="getfile6" class="upload_inp">
                    <div class="upload_drag">
                        <i class="icon"></i>
                        <span class="text">将文件拖到此处，或<a href="javascript:;" @click="upload6"
                                class="upload_submit">点击上传</a></span>
                    </div>
                    <div class="upload_mark" v-show="box6.show">正在上传中，请稍等...</div>
                </section>
            </div>
        </div>

        <div class="container">
            <div class="item">
                <h3>大文件上传</h3>
                <section class="upload_box" id="upload7">
                    <input type="file" class="upload_inp" ref="choose7" @change="getfile7">
                    <div class="upload_button_box">
                        <button class="upload_button select" :class="{ 'loading': box7.loading }"
                            @click="upload7">上传图片</button>
                    </div>
                    <div class="upload_progress" v-show="box7.show">
                        <div class="value" :style="{ width: box7.rate + '%' }"></div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import "../../assets/css/reset.min.css";
import "../../assets/css/upload.css";
import bupload from "@/api/bupload";
import SparkMD5 from 'spark-md5'
export default {
    name: 'bigupload',
    data() {
        return {
            box1: {
                show: true,
                filename: '',
                file: null,
                loading: false
            },
            box4: {
                show: false,
                file: null,
                loading: false,
                filename: '',
                rate: 0
            },
            box6: {
                show: false,
                file: null,
                filename: ''
            },
            box7: {
                show: false,
                file: null,
                loading: false,
                filename: '',
                rate: 0
            }
        }
    },
    mounted() {
    },
    methods: {

        sleep(wait) {
            let start = Date.now()
            while (Date.now() - start < wait) {
                continue
            }
        },
        //获取文件哈希值
        changeBuffer(file) {
            return new Promise(resolve => {
                let filereader = new FileReader()
                filereader.readAsArrayBuffer(file)
                filereader.onload = (e) => {
                    let buffer = e.target.result
                    let spark = new SparkMD5.ArrayBuffer()
                    spark.append(buffer)
                    let HASH = spark.end()
                    let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
                    resolve({
                        buffer,
                        HASH,
                        suffix,
                        filename: `${HASH}.${suffix}`
                    })
                }
            })
        },








        // 单文件上传1
        getfile1(e) {
            this.box1.file = e.target.files[0]
            if (!this.box1.file) return

            // 限制上传格式
            if (!/(PNG|JPG|JPEG)/i.test(this.box1.file.type)) {
                alert('上传格式有误')
                return
            }
            // 大小限制
            if (this.box1.file.size > 2 * 1024 * 1024) {
                alert('上传文件大小不能超过2M')
                return
            }

            // 显示上传文件
            this.box1.show = !this.box1.show
            this.box1.filename = this.box1.file.name

        },
        upload1() {
            this.$refs.choose1.click()
        },
        deletefile1() {
            this.box1.show = !this.box1.show
            this.box1.filename = ''
            this.box1.file = null
        },
        async trans1() {
            if (!this.box1.file) {
                alert('您还没有选择文件')
                return
            }

            // 上传服务器
            let formdata = new FormData()
            formdata.append('file', this.box1.file)
            formdata.append('filename', this.box1.filename)
            this.box1.loading = true

            let res = await bupload.post('/upload_single', formdata)
            this.box1.loading = false
            if (res.code == 0) {
                alert('上传成功')

            } else {
                alert(res.codeText)
            }
            this.box1.file = null
        },


        // 进度条管理
        async getfile4(e) {
            let _this = this
            this.box4.file = e.target.files[0]
            if (!this.box4.file) return

            // 限制上传格式
            if (!/(PNG|JPG|JPEG)/i.test(this.box4.file.type)) {
                alert('上传格式有误')
                return
            }
            // 大小限制
            if (this.box4.file.size > 2 * 1024 * 1024) {
                alert('上传文件大小不能超过2M')
                return
            }


            // 上传服务器
            let formdata = new FormData()
            formdata.append('file', this.box4.file)
            formdata.append('filename', this.box4.filename)
            this.box4.loading = true

            let res = await bupload.post('/upload_single', formdata, {

                // 文件上传中 计算进度条百分比
                onUploadProgress(e) {
                    let { loaded, total } = e
                    _this.box4.rate = (loaded / total * 100)
                }
            })

            if (res.code == 0) {
                this.box4.loading = false
                this.box4.rate = 100
                alert('上传成功')


            } else {
                // alert(res.codeText)
            }
            this.box4.file = null
            this.box4.rate = 0

        },
        upload4() {
            this.$refs.choose4.click()
        },


        // 拖拽上传
        upload6() {
            this.$refs.choose6.click()
        },
        // 点击上传回调
        async getfile6(e) {
            this.box6.file = e.target.files[0]
            if (!this.box6.file) return

            // 限制上传格式
            if (!/(PNG|JPG|JPEG)/i.test(this.box6.file.type)) {
                alert('上传格式有误')
                return
            }
            // 大小限制
            if (this.box6.file.size > 2 * 1024 * 1024) {
                alert('上传文件大小不能超过2M')
                return
            }


            // 上传服务器
            let formdata = new FormData()
            formdata.append('file', this.box6.file)
            formdata.append('filename', this.box6.filename)
            this.box6.show = true

            let res = await bupload.post('/upload_single', formdata)

            if (res.code == 0) {
                this.box6.show = false
                alert('上传成功')


            } else {
                // alert(res.codeText)
            }
            this.box6.file = null

        },
        // 拖拽回调
        async trans6(e) {
            // 不知道怎么关闭选文件的页面
            // let close = new KeyboardEvent('keydown', { 'key': 'ESC' })
            // document.dispatchEvent(close)
            let file = e.dataTransfer.files[0]
            if (!file) return

            // 上传服务器
            let formdata = new FormData()
            formdata.append('file', file)
            formdata.append('filename', file.name)
            this.box6.show = true

            let res = await bupload.post('/upload_single', formdata)
            this.box6.show = false
            if (res.code == 0) {
                alert('上传成功')

            } else {
                alert(res.codeText)
            }
        },


        // 大文件上传
        async getfile7(e) {
            let _this = this
            let file = e.target.files[0]
            this.box7.file = file
            if (!file) return
            this.box7.loading = true
            this.box7.show = true

            // 已上传的切片
            let already = [],
                res = null,
                // 获取文件哈希值
                { HASH, suffix } = await this.changeBuffer(file)

            // 获取已经上传的切片信息
            try {
                res = await bupload.get('/upload_already', {
                    params: {
                        HASH
                    }
                })
                // console.log(res);
                if (res.code == 0) {
                    // 获取已上传的切片
                    already = res.fileList
                    console.log(already);
                }
            } catch (err) {
                console.log(err);
            }

            // 文件切片 固定数量或者固定大小
            let maxsize = 1024 * 10
            let slices = Math.ceil(file.size / maxsize)
            console.log(file.size);
            // 存储切片集合
            const chunks = []
            // 限定切片上限
            if (slices > 100) {
                slices = 100
                maxsize = file.size / 100
            }
            // 切片
            for (let i = 0; i < slices; i++) {
                chunks.push({
                    file: file.slice(i * maxsize, (i + 1) * maxsize),
                    filename: `${HASH}_${i}.${suffix}`
                })
            }

            // 记录已经成功上传的切片数量
            let index = 0
            // 上传成功的处理
            async function complate() {
                // 控制进度条
                index++
                _this.box7.rate = index / slices * 100
                // 说明还没有全部上传成功
                if (index < slices) return
                // 全部成功
                _this.box7.rate = 100
                // 通知服务器合并切片
                try {
                    console.log(HASH, slices);
                    res = await bupload.post('/upload_merge', {
                        HASH,
                        slices
                    }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    // console.log(res);
                    if (res.code == 0) {
                        _this.box7.rate = 100
                        // setTimeout(() => { 

                        //  }, second)
                        _this.sleep(700)
                        console.log(slices);
                        clean()
                        return
                    }
                    throw res.codeText
                } catch (error) {
                    console.log(error);
                    alert('合并切片失败')
                    // clean()
                }
            }


            // 上传切片
            chunks.forEach(chunk => {
                // 已经上传无需再上传
                if (already.length && already.includes(chunk.filename)) {
                    complate()
                    return
                }

                let fm = new FormData()
                fm.append('file', chunk.file)
                fm.append('filename', chunk.filename)
                bupload.post('/upload_chunk', fm).then(data => {
                    if (data.code == 0) {
                        complate()
                        return
                    }
                    return Promise.reject(data.codeText)
                }).catch(() => {
                    clean()
                    alert('切片上传失败请稍后再试')

                }).finally(() => {

                })
            })

            // 清空样式
            function clean() {
                _this.box7.show = false
                _this.box7.loading = false
                _this.box7.rate = 0
            }
        },
        upload7() {
            this.$refs.choose7.click()
        },
    }
}
</script>

<style lang="scss" scoped>
html,
body {
    overflow-x: hidden;
}

.container {
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.container .item h3 {
    line-height: 40px;
}
</style>