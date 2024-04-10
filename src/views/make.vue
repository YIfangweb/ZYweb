<script setup>
import { ref, reactive } from 'vue';
const imgList = reactive([
    { id: 1, url: 'src/assets/4.png' },
    { id: 2, url: 'src/assets/1.png' },
    { id: 3, url: 'src/assets/5.png' },
    { id: 4, url: 'src/assets/2.png' },
    { id: 5, url: 'src/assets/6.png' },
    { id: 6, url: 'src/assets/3.png' },
]); 
</script>
<template>
    <div class="bg">
        <span class="title">中药炮制</span>
        <div class="container">
            <div class="img-item" v-for="item in imgList" :key="item.id">
                <img :src="item.url" class="img">
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 3rem;
    color: rgb(57, 165, 228);
    position: relative;
    top: 5%;
    left: 15%;
    font-family: 'ye';
    font-weight: 700;
}
.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
.img-item{
    width: 32%;
    height: 400px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
}
.container {
    height: 85vh;
    width: 70vw;
    margin: 5% auto;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
}

.bg {
    background: url('../assets/bj2.jpg') no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>