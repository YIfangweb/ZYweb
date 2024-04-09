<script setup>
import { ref, onMounted, reactive, getCurrentInstance, watch } from 'vue'
import userStore from '../stores/userStore'
import { useRouter } from 'vue-router'
import { ElMessage,ElLoading  } from 'element-plus'
const { proxy } = getCurrentInstance();
const router = useRouter()
const searchData = ref("")
const radio2 = ref('全部')
const radio3 = ref('全部')

const searchList = reactive([{
    id: '',
    name: "",
    img: "",
}])

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
        proxy.$axios.get('/medicine/getAllMedicine').then(res => {
            
            searchList.splice(0, searchList.length)
            res.data.forEach(item => {
                searchList.push({
                    id: item.medicineId,
                    name: item.medicineName,
                    img: item.medicineImg,
                })
            })
            loadingInstance.close()
        })
    }
})

const detail = (id) => {
    proxy.$axios.get('/medicine/getMedicineById?medicineId=' + id).then(res => {
        mDetails.id = res.data.medicineId
        mDetails.name = res.data.medicineName
        mDetails.img = res.data.medicineImg
        mDetails.desc = res.data.medicineDesc
        mDetails.action = res.data.medicineCateAciton
        mDetails.local = res.data.medicineCateLocal
        mDetail.value = true
    })
}

const mDetail = ref(false)

const handleClose = () => {
    mDetail.value = false
    mDetails.id = ''
    mDetails.name = ""
    mDetails.img = ""
    mDetails.desc = ""
    mDetails.action = ""
    mDetails.local = ""
}

const mDetails = reactive({
    id: '',
    name: "",
    img: "",
    desc: "",
    action: "",
    local: "",
})

watch(radio2, () => {
    getMedicineByCate()
})
watch(radio3, () => {
    getMedicineByCate()
})
const getMedicineByCate = () => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    //清除searchList
    searchList.splice(0, searchList.length)
    proxy.$axios.post('/medicine/getMedicineByCate', {
        medicineCateAciton: radio3.value,
        medicineCateLocal: radio2.value
    }).then(res => {
        res.data.forEach(item => {
            searchList.push({
                id: item.medicineId,
                name: item.medicineName,
                img: item.medicineImg,
            })
        })
        loadingInstance.close()
    }) 
}
const tosearch = () => {
    //清除searchList
    searchList.splice(0, searchList.length)
    proxy.$axios.post('/medicine/searchMedicine', {
        keyword: searchData.value
    }).then(res => {
        res.data.forEach(item => {
            searchList.push({
                id: item.medicineId,
                name: item.medicineName,
                img: item.medicineImg,
            })
        })
    })
}
</script>

<template>
    <div class="search">
        <div class="search-box">
            <div class="search-input-box">
                <div style="width: 40vw;height: 100%;float: left;"></div>
                <el-input type="text" class="search-input" placeholder="请输入药材名称" v-model="searchData" />
                <el-button type="primary" class="searchBtn" @click="tosearch">搜索</el-button>
            </div>
            <div class="search-cate">
                <p class="search-cate-title">筛选</p>
                <div class="cate-local">
                    <el-radio-group v-model="radio2">
                        <el-radio-button label="全部" value="全部" />
                        <el-radio-button label="关药" value="关药" />
                        <el-radio-button label="北药" value="北药" />
                        <el-radio-button label="西药" value="西药" />
                        <el-radio-button label="藏药" value="藏药" />
                        <el-radio-button label="川药" value="川药" />
                        <el-radio-button label="怀药" value="怀药" />
                        <el-radio-button label="淮药" value="淮药" />
                        <el-radio-button label="南药" value="南药" />
                        <el-radio-button label="云药" value="云药" />
                        <el-radio-button label="广药" value="广药" />
                    </el-radio-group>
                </div>
                <div class="cate-aciton">
                    <el-radio-group v-model="radio3">
                        <el-radio-button label="全部" value="全部" />
                        <el-radio-button label="解表药" value="解表药" />
                        <el-radio-button label="清热药" value="清热药" />
                        <el-radio-button label="泻下药" value="泻下药" />
                        <el-radio-button label="祛风湿药" value="祛风湿药" />
                        <el-radio-button label="化湿药" value="化湿药" />
                        <el-radio-button label="温里药" value="温里药" />
                        <el-radio-button label="理气药" value="理气药" />
                        <el-radio-button label="消食药" value="消食药" />
                        <el-radio-button label="驱虫药" value="驱虫药" />
                        <el-radio-button label="止血药" value="止血药" />
                        <el-radio-button label="活血化瘀药" value="活血化瘀药" />
                        <el-radio-button label="化痰止咳平喘药" value="化痰止咳平喘药" />
                        <el-radio-button label="利水渗湿药" value="利水渗湿药" />
                    </el-radio-group>
                </div>
            </div>
            <el-scrollbar class="m" height="600px">
                <div class="m-item" v-for="item in searchList" :key="item.id" @click="detail(item.id)">
                    <img :src="item.img" class="m-img">
                    <p class="m-name">{{ item.name }}</p>
                </div>
            </el-scrollbar>
        </div>
    </div>
    <el-dialog v-model="mDetail" title="药材详情" width="500" :before-close="handleClose">
        <el-scrollbar height="600px">
            <el-form ref="form" v-model="mDetails" :label-width="auto" label-position="top">
                <el-form-item>
                    <img :src="mDetails.img" style="width: 100%;height: 100%;">
                </el-form-item>
                <el-form-item label="药材名称">
                    <el-input v-model="mDetails.name" readonly />
                </el-form-item>
                <el-form-item label="药材功效分类">
                    <el-input v-model="mDetails.action" readonly />
                </el-form-item>
                <el-form-item label="药材产地分类">
                    <el-input v-model="mDetails.local" readonly />
                </el-form-item>
                <el-form-item label="药材综合描述">
                    <el-input type="textarea" v-model="mDetails.desc" :autosize="{ minRows: 2, maxRows: 100 }"
                        readonly />
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </el-dialog>
</template>

<style scoped>
.m-img {
    width: 90%;
    height: 80%;
}

.m-item {
    width: 25%;
    height: 30vh;
    float: left;
    text-align: center;
}

.m {
    width: 95%;
    margin-left: 2%;
    position: relative;
    top: 5%;
}

.cate-aciton {
    width: 95%;
    margin-left: 2%;
    position: relative;
    top: 20%;
}

.cate-local {
    width: 95%;
    margin-left: 2%;
    position: relative;
    top: 10%;
}

.search-cate-title {
    font-size: 20px;
    font-weight: 600;
    position: relative;
    top: 5%;
    left: 2%;
}

.search-cate {
    width: 94%;
    height: 15vh;
    margin-left: 3%;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 15px;
}

.searchBtn {
    width: 4vw;
    height: 100%;
}

.search-input {
    width: 15vw;
    height: 100%;
    border-radius: 10px;
}

.search-input-box {
    width: 100%;
    height: 4vh;
}

.search-box {
    width: 70vw;
    height: 95vh;
    margin-left: 15vw;
    margin-top: 5vh;
    background-color: rgba(255, 255, 255, .3);
    box-shadow: 3px 10px 50px rgba(0, 0, 0, .2);
    border-radius: 15px;
    overflow: hidden;
}

.search {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bj3.jpg') no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>