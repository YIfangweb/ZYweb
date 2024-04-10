import axios from "axios";
import qs from "qs";

// axios.defaults.baseURL = ''  //正式
// axios.defaults.baseURL = 'https://cn-cd-dx-tmp7.natfrp.cloud:23848/' //测试
axios.defaults.baseURL = 'http://localhost:8080'
//post请求头
// axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//设置超时
axios.defaults.timeout = 15000;

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error);
    }
);
export default {
    /**
     * @param {String} url 
     * @param {Object} data 
     * @returns Promise
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url,
                    data: qs.stringify(data),
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url,
                    params: data,
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};