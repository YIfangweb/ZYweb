<script setup>
import { ref, onMounted, reactive, getCurrentInstance, watch } from 'vue'
import userStore from '../stores/userStore'
import { ElMessage,ElLoading } from 'element-plus'

const { proxy } = getCurrentInstance();

onMounted(() => {
    const user = userStore().userInfo
    if (user.userId === undefined) {
        ElMessage({
            message: '请先登录',
            type: 'warning',
        })
        router.push("/login")
    } else {
        const loadingInstance = ElLoading.service({ fullscreen: true })
        proxy.$axios.get('/soup/getSoupList').then(res => {
            soupList.splice(0, soupList.length)
            res.data.forEach(item => {
                soupList.push({
                    id: item.soupId,
                    title: item.soupName,
                    url: item.soupImg,
                    d1: item.soupFa,
                    d2: item.soupFb,
                    d3: item.soupFc,
                    d4: item.soupFe,
                    d5: item.soupFf
                })
            })
            loadingInstance.close()
        })
    }
})

const soupList = reactive([{
    id: '',
    title: '',
    url: '',
    d1: '',
    d2: '',
    d3: '',
    d4: '',
    d5: ''
}])

const sDetail = ref(false)
const soupForm = ref('')
const soupDetail = reactive({
    id: '',
    title: '',
    url: '',
    d1: '',
    d2: '',
    d3: '',
    d4: '',
    d5: '',
    d6: '',
    d7: '',
    d8: '',
    desc: '',
})
const detail = (id) => {
    proxy.$axios.get('/soup/getSoupById?soupId=' + id).then(res => {
        soupDetail.id = res.data.soupId
        soupDetail.title = res.data.soupName
        soupDetail.url = res.data.soupImg
        soupDetail.d1 = res.data.soupFa
        soupDetail.d2 = res.data.soupFb
        soupDetail.d3 = res.data.soupFc
        soupDetail.d4 = res.data.soupFe
        soupDetail.d5 = res.data.soupFf
        soupDetail.d6 = res.data.soupFg
        soupDetail.d7 = res.data.soupFh
        soupDetail.d8 = res.data.soupFi
        soupDetail.desc = res.data.soupDesc
        addSoupF()
        sDetail.value = true
    })
}
const handleClose = () => {
    sDetail.value = false
    soupDetail.id = ''
    soupDetail.title = ''
    soupDetail.url = ''
    soupDetail.d1 = ''
    soupDetail.d2 = ''
    soupDetail.d3 = ''
    soupDetail.d4 = ''
    soupDetail.d5 = ''
    soupDetail.d6 = ''
    soupDetail.d7 = ''
    soupDetail.d8 = ''
    soupDetail.desc = ''
}
const addSoupF=() => {
    soupForm.value = soupDetail.d1+'/'+soupDetail.d2+'/'+soupDetail.d3+'/'+soupDetail.d4+'/'+soupDetail.d5
    if(soupDetail.d6!=null){
        soupForm.value= soupForm.value+'/'+soupDetail.d6
    }
    if(soupDetail.d7!=null){  
        soupForm.value= soupForm.value+'/'+soupDetail.d7
    }
    if(soupDetail.d8!=null){  
        soupForm.value= soupForm.value+'/'+soupDetail.d8
    }
}
const searchData =ref('')

const toSearch=() => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    proxy.$axios.get('/soup/searchSoup?keyword='+searchData.value).then(res => {
        soupList.splice(0, soupList.length)
        res.data.forEach(item => {
            soupList.push({
                id: item.soupId,
                title: item.soupName,
                url: item.soupImg,
                d1: item.soupFa,
                d2: item.soupFb,
                d3: item.soupFc,
                d4: item.soupFe,
                d5: item.soupFf,
                d6: item.soupFg,
                d7: item.soupFh,
                d8: item.soupFi,
                desc: item.soupDesc
            })
            addSoupF()
            loadingInstance.close()
        })
    })
}
</script>

<template>
    <div class="container">
        <div class="soup-box">
            <div class="soup-item">
                <span class="soup-name">
                    中医养生，就是根据生命发展的规律，以传统中医理论为指导，遵循阴阳五行生化收藏之变化规律，运用调神、导引、四时调摄、食养、药养等方法颐养生命、增强体质、预防疾病、延年益寿的中国传统保健方法。
                </span>
            </div>
            <div class="showbox">
                <div class="left">
                    <el-scrollbar>
                        <div class="l-item" v-for="item in soupList" :key="item.id" @click="detail(item.id)">
                            <span class="title">{{ item.title }}</span>
                            <div class="card">
                                <img :src="item.url" class="c-img" />
                                <ul class="c-ul">
                                    <li>{{ item.d1 }}</li>
                                    <li>{{ item.d2 }}</li>
                                    <li>{{ item.d3 }}</li>
                                    <li>{{ item.d4 }}</li>
                                    <li>{{ item.d5 }}</li>
                                </ul>
                                <div style="width: 100%;height: 20px;"></div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="right">
                    <div class="r-title">
                        配方搜索
                    </div>
                    <div class="r-input">
                        <el-input placeholder="查询您需要的配方" v-model="searchData"/>
                        <el-button type="primary" @click="toSearch">搜索</el-button>
                    </div>
                    <img src="../assets//ys.jpg" class="r-img">
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="sDetail" title="汤饮详情" width="500" :before-close="handleClose">
        <el-scrollbar height="600px">
            <el-form ref="form" v-model="soupDetail" :label-width="auto" label-position="top">
                <el-form-item>
                    <img :src="soupDetail.url" style="width: 100%;height: 100%;">
                </el-form-item>
                <el-form-item label="汤饮名称">
                    <el-input v-model="soupDetail.title" readonly />
                </el-form-item>
                <el-form-item label="汤饮材料">
                    <el-input type="textarea" v-model="soupForm" :autosize="{ minRows: 2, maxRows: 100 }"
                        readonly />
                </el-form-item>
                <el-form-item label="汤饮描述">
                    <el-input type="textarea" v-model="soupDetail.desc" resize="none" :autosize="{ minRows: 2, maxRows: 100 }"
                        readonly />
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </el-dialog>
</template>

<style scoped>
.c-ul>li {
    width: 100%;
    font-size: 1.5rem;
    padding-left: 5%;
    margin-top: 5%;
    margin-left: 5%;
}

.c-ul {
    width: 80%;
    margin-top: 5%;
    margin-left: 10%;
}

.c-img {
    width: 80%;
    height: 200px;
    margin-left: 10%;
    margin-top: 5%;
}

.card {
    width: 100%;
    border: 2px dashed rgba(71, 71, 71, 0.5);
}

.title {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 2rem;
    color: rgb(120, 106, 93);
    position: relative;
    left: 20%;
}

.l-item {
    width: 40%;
    height: 530px;
    border-top: 2px solid rgba(199, 166, 115, 1);
    position: relative;
    left: 5%;
    top: 3px;
    float: left;
    margin-right: 8%;
}

.r-img {
    width: 85%;
    position: relative;
    left: 7%;
    top: 2%;
}

.r-input {
    width: 96%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    left: 2%;
    border-bottom: 2px dashed rgba(160, 159, 159, 0.5);
}

.r-title {
    width: 96%;
    height: 50px;
    position: relative;
    left: 2%;
    font-size: 2rem;
    background-color: rgb(199, 166, 115);
    line-height: 50px;
    color: rgb(236, 236, 236);
    text-align: center;
}

.right {
    width: 27%;
    height: 95%;
    border: 2px dashed rgba(71, 71, 71, 0.5);
}

.left {
    width: 70%;
    height: 95%;
    border: 2px dashed rgba(71, 71, 71, 0.5);
}

.showbox {
    width: 90%;
    height: 80%;
    position: relative;
    top: 5%;
    left: 5%;
    border-bottom: 3px solid rgba(136, 136, 136, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.soup-name {
    font-size: 1.5rem;
    display: inline-block;
    width: 90%;
    height: 70%;
    position: relative;
    left: 5%;
    top: 10%;
    border-bottom: 3px solid rgba(165, 165, 165, 0.5);
    color: #278bb6;
}

.soup-item {
    width: 90%;
    height: 100px;
    margin-left: 5%;
    position: relative;
    top: 3vh;
    border-top: 3px solid rgba(136, 136, 136, 0.5);
    border-bottom: 3px solid rgba(136, 136, 136, 0.5);
}

.soup-box {
    width: 90vw;
    height: 95vh;
    position: relative;
    left: 5vw;
    top: 5vh;
    background-color: rgba(238, 232, 216, 0.8);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.container {
    background: url('../assets/bj2.jpg') no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
}
</style>