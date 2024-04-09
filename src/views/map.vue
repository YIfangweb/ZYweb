<script setup>
import { ref, onMounted } from 'vue'
import userStore from '../stores/userStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

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

const toUserLocation = () => {
    router.push({ path: '/userLocation' })
}
</script>

<template>
    <div class="map">
        <img src="../assets/map.png" class="map-img">
        <div class="m-actions">
            <img src="../assets/dw.jpg" class="m-actions-img">
            <button class="m-actions-button"  @click="toUserLocation">附近</button>
        </div>
    </div>
</template>

<style scoped>
.m-actions-button:hover{
    cursor: pointer;
    background-color: rgb(177, 157, 141);
}
.m-actions-button{
    width: 60%;
    height: 80%;
    margin-top: 5%;
    margin-left: 10%;
    font-size: 2rem;
    color: rgb(236, 226, 188);
    background-color: rgb(111, 101, 93);
    border: none;
    border-radius: 10px;
}
.m-actions-img{
    width: 30%;
    height: 100%;
    float: left;
}
.m-actions{
    width: 200px;
    height: 80px;
    position: absolute;
    right: 20%;
    bottom: 20%;
    overflow: hidden;
}
.map-img {
    object-fit: contain;
}
.map{
    width: 90vw;
    height: 100vh;
    position: absolute;
    left: 10vw;
    top: 0;
    overflow: hidden;
}
</style>