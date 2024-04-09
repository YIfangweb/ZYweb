<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive, ref } from 'vue'
import type { FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import userStore from '../stores/userStore'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance();

const loginForm = reactive({
    username: '',
    password: ''
});
const labelPosition = ref<FormProps['labelPosition']>('top')

const user = userStore()
const router = useRouter()

onMounted(() => {
    if (user.userInfo.userId != undefined) {
        ElMessage({
            message: '已登录，无需再次登录',
            type: 'warning',
        })
        router.push("/")
    }
})

const login = () => {
    proxy.$axios.post("/user/login", {
        username: loginForm.username,
        password: loginForm.password
    }).then(res => {
        if (res.code === 0) {
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            user.userInfo = res.data
            router.push("/")
        } else {
            ElMessage({
                message: res.msg,
                type: 'warning',
            })
        }
    }).catch(error => {
        console.log(error);
    })
}
const signInDialog = ref(false)
const signInForm = reactive({
    userNickName: '',
    userName: '',
    userPassword: '',
    userIconUrl: ''
})
const defurl = "https://img2.imgtp.com/2024/04/07/Kyueor8O.png"
const defaultImg = ref(defurl)

const chooseImg = (e) => {
    readFile(e.target.files[0]).then(res => {
        defaultImg.value = "data:image/png;base64," + arrayBufferToBase64(res)
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

const register = () => {
    proxy.$axios.post("/user/register", {
        userNickName: signInForm.userNickName,
        userName: signInForm.userName,
        userPassword: signInForm.userPassword,
        userIconUrl: defaultImg.value
    }).then(res => {
        if (res.data === 1) {
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            signInDialog.value = false
        }else{
            ElMessage({
                message: res.msg,
                type: 'warning',
            })
        }
    })
}
const registerBtn = ref(true)

const checkAccount=() => {
    proxy.$axios.post("/user/checkAccount", {
        userName: signInForm.userName
    }).then(res => {
        if (res.data === 1) {
            ElMessage({
                message: '账号已存在',
                type: 'warning',
            })
            registerBtn.value = true
        }else{
            registerBtn.value = false
        }
    })
}
</script>
<template>
    <div class="loginBox">
        <el-form :model="loginForm" :label-position="labelPosition" class="loginForm">
            <el-form-item label="账号">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="primary" @click="signInDialog = true">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-dialog v-model="signInDialog" title="用户注册" width="400" align-center>
        <el-form :model="signInForm" :label-position="labelPosition" class="loginForm">
            <el-form-item label="昵称">
                <el-input v-model="signInForm.userNickName" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="signInForm.userName" placeholder="请输入账号" @blur="checkAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="signInForm.userPassword" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <input type="file" @change="chooseImg" id="chooseImg" style="display: none;"
                    accept="image/png,image/jpeg,image/jpg">
                <img v-bind:src="defaultImg" class="userIcon" @click="openChooseImg">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register" :disabled="registerBtn">注册</el-button>
                <el-button @click="signInDialog = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <img src="../assets/login2.jpg" class="login">
</template>
<style scoped>
.userIcon {
    width: 50px;
    height: 50px;
    border: 1px dashed rgb(190, 190, 190);
}

.login {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.loginForm {
    width: 80%;
    padding: 10%;
}

.loginBox {
    width: 20vw;
    height: 30vh;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 15%;
    box-shadow: 3px 3px 50px rgba(0, 0, 0, 0.4);
}
</style>