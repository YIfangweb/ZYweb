<script setup>
import { ref, onMounted } from 'vue'
import userStore from '../stores/userStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const Explore = document.getElementsByClassName("explore-ul")
const isExploreShow = ref(false)
const showExploreList = () => {
    if (isExploreShow.value) {
        Explore[0].style.display = "none"
        isExploreShow.value = false
    } else {
        Explore[0].style.display = "block"
        isExploreShow.value = true
    }
}
const Mores = document.getElementsByClassName("Mores-ul")
const isMoresShow = ref(false)
const showMoresList = () => {
    if (isMoresShow.value) {
        Mores[0].style.display = "none"
        isMoresShow.value = false
    } else {
        Mores[0].style.display = "block"
        isMoresShow.value = true
    }
}

onMounted(() => {
    const user = userStore().userInfo
    if (user.userId === undefined) {
        ElMessage({
            message: '请先登录',
            type: 'warning',
        })
        router.push("/login")
    }
})

const toMap = () => {
    router.push("/map")
}
const toSearch = () => {
    router.push("/search")
}
const toSoup = () => {
    router.push("/soup")
}
const toForum = () => {
    router.push("/forum")
}
const toPicture = () => {
    router.push("/picture")
}
const toMe = () => {
    router.push("/me")
}
const toMake = () => {
    router.push("/make")
}
const toMuseum = () => {
    router.push("/museum")
}
const loginout = () => {
    userStore().$reset()
    router.push("/login")
}
</script>

<template>
    <div class="home">
        <div class="header">
            <div class="h-title">
                <span class="h-title-text">药香知源</span>
            </div>
            <div class="h-title-assistant">
                <img src="../assets/logo.svg" class="h-title-assistant-img">
                <span class="h-title-assistant-text">首页</span>
                <div class="h-title-assistant-text-en-container">
                    <p class="h-title-assistant-text-en">Front page</p>
                </div>
            </div>
            <div class="h-actions">
                <div class="h-actions-item" @click="showExploreList">
                    <span class="h-actions-text">探索</span>
                    <p class="h-actions-text-en">Explore</p>
                </div>
                <ul class="explore-ul">
                    <li class="h-actions-item-li" @click="toMap">药材地图</li>
                    <li class="h-actions-item-li" @click="toSearch">药材检索</li>
                    <li class="h-actions-item-li" @click="toSoup">养生汤饮</li>
                </ul>
                <div class="h-actions-item" @click="toForum">
                    <span class="h-actions-text">论坛</span>
                    <p class="h-actions-text-en">Forum</p>
                </div>
                <div class="h-actions-item" @click="toPicture">
                    <span class="h-actions-text">识图</span>
                    <p class="h-actions-text-en">Picture</p>
                </div>
                <div class="h-actions-item" @click="showMoresList">
                    <span class="h-actions-text">更多</span>
                    <p class="h-actions-text-en">Mores</p>
                </div>
                <ul class="Mores-ul">
                    <li class="h-actions-item-li" @click="toMake">中药炮制</li>
                    <li class="h-actions-item-li" @click="toMuseum">博物馆</li>
                </ul>
                <div class="h-actions-item" @click="loginout">
                    <span class="h-actions-text">退出</span>
                    <p class="h-actions-text-en">OUT</p>
                </div>
            </div>
            <div class="h-bottom">
                <p class="h-bottom-text" @click="toMe">联系我们</p>
            </div>
        </div>
        <img src="../assets/prime.png" class="background">
    </div>
</template>

<style scoped>
.h-actions-item-li:hover {
    background-color: rgb(177, 157, 141);
    cursor: pointer;
}

.h-actions-item-li {
    width: 100%;
    font-size: 1.5rem;
    height: 3vh;
    margin-bottom: 0.5vh;
    text-align: center;
}

.Mores-ul {
    list-style: none;
    width: 12vw;
    height: 10vh;
    color: rgb(236, 226, 188);
    margin-left: 3vw;
    display: none;
}

.explore-ul {
    list-style: none;
    width: 12vw;
    height: 10vh;
    color: rgb(236, 226, 188);
    margin-left: 3vw;
    display: none;
}

.background {
    width: 85vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 15vw;
}

.h-actions-item:hover {
    background-color: rgb(177, 157, 141);
    cursor: pointer;
}

.h-bottom-text:hover {
    cursor: pointer;
}

.h-bottom-text {
    font-size: 2rem;
    color: rgb(236, 226, 188);
    font-family: 'yao';
    line-height: 5vh;
}

.h-bottom {
    width: 15vw;
    height: 5vh;
    text-align: center;
    margin-top: 20vh;
}

.h-actions-text-en {
    font-size: 1.5rem;
    color: rgb(236, 226, 188);
}

.h-actions-text {
    font-size: 2.5rem;
    color: rgb(236, 226, 188);
    margin-left: 3.5vw;
}

.h-actions-item {
    width: 15vw;
    height: 9vh;
    display: flex;
    align-items: center;
}

.h-actions {
    width: 15vw;
    height: 36vh;
    margin-top: 5vh;
    font-family: 'yao';
}

.h-title-assistant-text-en {
    font-size: 1.2rem;
    color: rgb(236, 226, 188);
    margin-left: 2%;
    word-wrap: break-word;
    margin-top: 3vh;
}

.h-title-assistant-text-en-container {
    width: 25%;
    height: 100%;
}

.h-title-assistant-text {
    font-size: 3rem;
    color: rgb(236, 226, 188);
}

.h-title-assistant-img {
    width: 20%;
    height: 96%;
    margin-left: 5%;
    margin-top: 4%;
}

.h-title-assistant {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    /* 水平方向上的对齐 */
    align-items: center;
    font-family: 'yao';
}

.h-title-text {
    font-size: 3rem;
    line-height: 20vh;
    font-weight: 600;
    color: rgb(236, 226, 188);
}

.h-title {
    width: 15vw;
    height: 20vh;
    text-align: center;
    font-family: 'ali';
}

.header {
    width: 15vw;
    height: 100vh;
    background-color: rgb(111, 101, 93);
}
</style>