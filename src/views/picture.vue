<script setup>
import { ref, getCurrentInstance } from 'vue'
import { apiConfig } from '../utils/baseURlConfig'
import { ElNotification, ElLoading } from 'element-plus'
const apiUrl = apiConfig.baiduApiUrl
const token = apiConfig.Access_Token

const { proxy } = getCurrentInstance();

const defurl = 'src/assets/juemingzi.jpg'
const defaultImg = ref(defurl)
const base64Img = ref('')

const Result = ref('')
const Similarity = ref('')

const chooseImg = (e) => {
    readFile(e.target.files[0]).then(res => {
        defaultImg.value = "data:image/png;base64," + arrayBufferToBase64(res)
        base64Img.value = arrayBufferToBase64(res)
    })
}

const openChooseImg = () => {
    //判断图片路径是否为默认值，否则document.getElementById("chooseImg").click()
    if (defaultImg.value === defurl) {
        document.getElementById("chooseImg").click()
    }
    if (defaultImg.value !== defurl) {
        defaultImg.value = defurl
    }
}
//读取文件
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function (e) {
            resolve(e.target.result);
        }
        reader.onerror = function (e) {
            reject(e);
        }
    })
}
// 将ArrayBuffer转成base64
const arrayBufferToBase64 = (arrayBuffer) => {
    var base64String = '';
    var bytes = new Uint8Array(arrayBuffer);
    for (var i = 0; i < bytes.byteLength; i++) {
        base64String += String.fromCharCode(bytes[i]);
    }
    return btoa(base64String);
}

const recognize = () => {
    if (defaultImg.value === defurl) {
        ElNotification({
            title: '提示',
            message: '请选择图片',
            type: 'warning'
        })
    } else {
        const loadingInstance = ElLoading.service({ fullscreen: true })
        proxy.$axios.post(apiUrl + '?access_token=' + token, {
            image: base64Img.value
        }).then(res => {
            loadingInstance.close()
            Result.value = res.result[0].name
            Similarity.value = res.result[0].score
        })
    }
}

</script>
<template>
    <div class="bg">
        <div class="container">
            <div class="title">
                中草药识别
            </div>
            <div class="box">
                <div class="left">
                    <img :src="defaultImg" class="img-fluid">
                </div>
                <div class="right">
                    <div class="result">
                        <p class="pa">识别结果：</p>
                        <p class="pb">{{ Result }}</p>
                        <p class="pa">相似度：</p>
                        <p class="pb">{{ Similarity }}</p>
                    </div>
                    <div class="btn-group">
                        <input type="file" @change="chooseImg" id="chooseImg" style="display: none;" accept="image/*">
                        <el-button type="primary" @click="openChooseImg" class="btn">选择图片</el-button>
                        <el-button type="primary" @click="recognize" class="btn">开始识别</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn {
    width: 8vw;
    height: 3vw;
    margin-right: 1vw;
    font-size: 1.2rem;
    font-family: 'ali';
}

.pb {
    width: 100%;
    height: 30%;
    font-size: 3rem;
    text-align: center;
    font-family: 'ali';
    position: relative;
    top: 10%;
    color: #ff0000;
}

.pa {
    width: 100%;
    height: 10%;
    font-size: 2rem;
    text-align: center;
    font-family: 'ali';
    position: relative;
    top: 10%;
}

.btn-group {
    width: 100%;
    height: 50%;
    text-align: center;
}

.result {
    width: 100%;
    height: 50%;
}

.right {
    width: 30%;
}

.img-fluid {
    margin: 15% 25%;
    width: 500px;
    height: 500px;
}

.left {
    width: 70%;
    height: 100%;
}

.box {
    display: flex;
    justify-content: space-between;
    height: 90vh;
    width: 100%;
}

.title {
    width: 100%;
    height: 5vh;
    font-size: 2.5rem;
    text-align: center;
    font-family: 'ali';
}

.container {
    width: 80vw;
    height: 95vh;
    position: relative;
    left: 10vw;
    top: 5vh;
    background: rgb(255, 255, 255, .5);
    border-radius: 10px;
    box-shadow: 0px 0px 10px #999999;
}

.bg {
    background-image: url('../assets/bj2.jpg');
    background-size: cover;
    height: 100vh;
    overflow: hidden;
}
</style>
