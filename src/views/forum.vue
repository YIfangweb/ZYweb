<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue'
import userStore from '../stores/userStore'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

const userInfo = userStore().userInfo
const { proxy } = getCurrentInstance();

onMounted(() => {
    if (userInfo.userId === undefined) {
        ElMessage({
            message: '请先登录',
            type: 'warning',
        })
        router.push("/login")
    } else {
        getForumList()
    }
})

const textarea = ref('')
const reset = () => {
    ElMessageBox.confirm(
        '确定清除吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            textarea.value = ''
            ElMessage({
                type: 'success',
                message: '已清空',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })

        })
}

const release = () => {
    if (textarea.value != '') {
        proxy.$axios.post('/user/release', {
            userId: userInfo.userId,
            content: textarea.value,
            userIconUrl: userInfo.userIconUrl
        }).then(res => {
            if (res.data === 1) {
                ElNotification({
                    title: '成功！',
                    message: '发布成功',
                    type: 'success',
                })
                textarea.value = ''
                getForumList()
            }
        })
    } else {
        ElMessage({
            type: 'warning',
            message: '请输入内容'
        })
    }
}

const forumList = reactive([{
    id: '',
    userId: '',
    userNickname: '',
    userIconUrl: '',
    content: '',
    time: ''
}])

const getForumList = () => {
    forumList.splice(0, forumList.length)
    proxy.$axios.get('/user/getAllForum').then(res => {
        res.data.forEach(item => {
            forumList.push({
                id: item.forumId,
                userId: item.forumUserId,
                userNickname: item.forumUserNickname,
                userIconUrl: item.forumUserIcon,
                content: item.forumContent,
                time: timeMapTotime(Number(item.forumTime))
            })
        })
        forumList = forumList.reverse()
    })
}
const timeMapTotime = (timeMap) => {
    let date = new Date(timeMap)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    return time
}
const showDetail = ref(false)
const fdetaildata = reactive({
    id: '',
    userId: '',
    userNickname: '',
    userIconUrl: '',
    content: '',
    time: ''
})

const fdetail = (id) => {
    proxy.$axios.get('/user/getForumById?forumId=' + id).then(res => {
        fdetaildata.id = res.data.forumId
        fdetaildata.userId = res.data.forumUserId
        fdetaildata.userNickname = res.data.forumUserNickname
        fdetaildata.userIconUrl = res.data.forumUserIcon
        fdetaildata.content = res.data.forumContent
        fdetaildata.time = timeMapTotime(Number(res.data.forumTime))
    })
    getForumDiscussList(id)
    showDetail.value = true
}
const textarea2 = ref('')
const addDiscuss = () => {
    if (textarea2.value != '') {
        proxy.$axios.post('/user/addDiscuss', {
            userId: userInfo.userId,
            forumId: fdetaildata.id,
            content: textarea2.value
        }).then(res => {
            if (res.data === 1) {
                ElNotification({
                    title: '成功！',
                    message: '评论成功',
                    type: 'success',
                })
                getForumDiscussList(fdetaildata.id)
                textarea2.value = ''
            }
        })
    } else {
        ElMessage({
            type: 'warning',
            message: '请输入内容'
        })
    }
}
const discussList = reactive([{
    id: '',
    userId: '',
    userNickname: '',
    userIconUrl: '',
    content: '',
    time: ''
}]);

const getForumDiscussList = (id) => {
    discussList.splice(0, discussList.length)
    proxy.$axios.get('/user/getForumDiscussList?forumId='+id).then(res => {
        res.data.forEach(item => {
            discussList.push({
                id: item.discussId,
                userId: item.UserId,
                userNickname: item.userNickname,
                userIconUrl: item.userIconUrl,
                content: item.content,
                time: timeMapTotime(Number(item.time))
            })
        })
        discussList = discussList.reverse()
    }
    )
}
</script>

<template>
    <div class="forum">
        <div class="f-box">
            <div class="left">
                <el-scrollbar>
                    <div class="f-item" v-for="item in forumList" :key="item.id" @click="fdetail(item.id)">
                        <div style="width: 100%;height: 20px;"></div>
                        <div class="f-userinfo">
                            <img :src="item.userIconUrl" class="f-u-img">
                            <span class="f-u-nickname">{{ item.userNickname }}</span>
                            <span class="f-u-time">{{ item.time }}</span>
                        </div>
                        <span class="f-content">{{ item.content }}</span>
                        <div style="width: 100%;height: 20px;"></div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="right">
                <div class="userinfo">
                    <img :src="userInfo.userIconUrl" class="u-img">
                    <span class="u-nickname">{{ userInfo.userNickname }}</span>
                </div>
                <div class="releass">
                    <el-input v-model="textarea" style="width: 100%" :autosize="{ minRows: 5, maxRows: 20 }"
                        type="textarea" placeholder="在这写下你想说的话吧~" maxlength="1000" resize="none" show-word-limit />
                    <el-button type="primary" @click="release" class="r-btn">发布</el-button>
                    <el-button @click="reset" class="r-btn">清除</el-button>
                </div>
            </div>
        </div>
        <el-drawer v-model="drawer" title="I am the title" :direction="direction" :before-close="handleClose">
            <span>Hi, there!</span>
        </el-drawer>
        <el-drawer v-model="showDetail" :direction="rtl" size="50%">
            <el-scrollbar>
                <div class="f-item">
                    <div style="width: 100%;height: 20px;"></div>
                    <div class="f-userinfo">
                        <img :src="fdetaildata.userIconUrl" class="f-u-img">
                        <span class="f-u-nickname">{{ fdetaildata.userNickname }}</span>
                        <span class="f-u-time">{{ fdetaildata.time }}</span>
                    </div>
                    <span class="f-content">{{ fdetaildata.content }}</span>
                    <div style="width: 100%;height: 20px;"></div>
                </div>

                <el-input v-model="textarea2" style="width: 90%;margin-left: 5%;"
                    :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="友好评论哦~" maxlength="100"
                    resize="none" show-word-limit />
                <el-button type="primary" @click="addDiscuss" style="margin-left: 5%;margin-top: 10px;">发表评论</el-button>

                <div class="pl-box">
                    <div v-for="item in discussList" :key="item.id" class="f-item">
                        <div style="width: 100%;height: 20px;"></div>
                        <div class="f-userinfo">
                            <img :src="item.userIconUrl" class="f-u-img">
                            <span class="f-u-nickname">{{ item.userNickname }}</span>
                            <span class="f-u-time">{{ item.time }}</span>
                        </div>
                        <span class="f-content">{{ item.content }}</span>
                        <div style="width: 100%;height: 20px;"></div>
                    </div>
                </div>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<style scoped>
.f-u-time {
    margin-left: 1%;
    font-size: 0.8rem;
    position: relative;
    top: 6%;
    color: rgb(82, 82, 82);
}

.f-content {
    display: inline-block;
    width: 80%;
    position: relative;
    left: 10%;
    margin-top: 10px;
}

.f-u-nickname {
    margin-left: 5%;
    font-size: 1rem;
    font-family: 'ye';
    font-weight: 700;
}

.f-u-img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
}

.f-userinfo {
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    left: 5%;
}

.f-item {
    width: 90%;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 5%;
    background-color: rgb(238, 237, 219, .6);
}

.r-btn {
    width: 80px;
    height: 40px;
    font-size: 1rem;
    position: relative;
    top: 5%;
    left: 2%;
}

.releass {
    width: 90%;
    height: 500px;
    position: relative;
    top: 10%;
    left: 5%;
}

.u-nickname {
    margin-left: 5%;
    font-size: 1.5rem;
    font-family: 'ye';
    font-weight: 700;
}

.u-img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
}

.userinfo {
    width: 90%;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    left: 5%;
    top: 5%;
}

.right {
    width: 30%;
    height: 90%;
    border: 2px dashed rgba(71, 71, 71, 0.5);
    position: relative;
    top: 5%;
    left: 5%;
    border-left: none;
}

.left {
    width: 60%;
    height: 90%;
    border: 2px dashed rgba(71, 71, 71, 0.5);
    position: relative;
    top: 5%;
    left: 5%;
}

.f-box {
    width: 80vw;
    height: 95vh;
    position: relative;
    left: 10vw;
    top: 5vh;
    background-color: rgba(240, 248, 255, .5);
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(161, 161, 161, 0.5);
    display: flex;
}

.forum {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bj3.jpg') no-repeat;
    background-size: cover;
}
</style>
