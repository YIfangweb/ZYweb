<script setup>
import { ref, reactive,getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'

const { proxy } = getCurrentInstance();
const content = reactive({
    name: '',
    email: '',
    data: ''
})
const submit = () => {
    if (content.name == '') {
        ElNotification({
            title: '提示',
            message: '请输入您的称呼',
            type: 'warning'
        })
    } else if (content.email == '') {
        ElNotification({
            title: '提示',
            message: '请输入您的邮箱',
            type: 'warning'
        })
    } else if (content.data == '') {
        ElNotification({
            title: '提示',
            message: '请输入您的留言',
            type: 'warning'
        })
    } else {
        if (mailCheck(content.email)) {
            proxy.$axios.post('/user/sugestion', {
                name: content.name,
                email: content.email,
                data: content.data
            }).then(res => {
                console.log(res.data)
            })
        } else {
            ElNotification({
                title: '提示',
                message: '请输入正确的邮箱',
                type: 'warning'
            })
        }
    }
}
const mailCheck = (value) => {
    var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    return pattern.test(value)
}

</script>
<template>
    <div class="me">
        <div class="me-box">
            <span class="title">联系我们</span>
            <div class="form">
                <el-form label-position="top" :model="content">
                    <el-form-item label="我们怎么称呼您">
                        <el-input v-model="content.name" placeholder="请输入您的称呼"></el-input>
                    </el-form-item>
                    <el-form-item label="方便我们联系您">
                        <el-input v-model="content.email" placeholder="请输入您的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="您想对我们说些什么">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" resize="none"
                            v-model="content.data" placeholder="请输入您的留言"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style scoped>
.form {
    width: 90%;
    position: relative;
    top: 10%;
    left: 5%;
    font-family: 'ali';
    font-size: 1.5rem;
}

.title {
    font-size: 2rem;
    font-family: 'ali';
    font-weight: 600;
    display: inline-block;
    width: 90%;
    position: relative;
    top: 5%;
    left: 5%;
}

.me-box {
    width: 40vw;
    height: 60vh;
    position: relative;
    left: 30vw;
    top: 20vh;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
}

.me {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../assets/bj3.jpg") no-repeat;
    background-size: 100%;
}
</style>
