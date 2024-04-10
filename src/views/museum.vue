<script setup>
import { ref } from 'vue'
const items = ref([
    {
        img: 'src/assets/b1.jpg',
        title: '北京中医药大学中药博物馆',
        desc: '北京中医药大学中药博物馆位于北京市朝阳区北三环东路乙8号院3号楼，成立于1990年，建筑面积3160平方米。该博物馆收藏了大量中药文物，包括中药材、中药饮片、中成药等，并设有“中国医学史展厅”和“中药标本展厅”'
    },
    {
        img: 'src/assets/b2.jpg',
        title: '上海中医药博物馆',
        desc: '上海中医药博物馆位于上海市浦东新区张江高科技园区蔡伦路1200号，是中国第一个专业的医学博物馆。该博物馆的展览分为原始医疗活动、古代医卫遗存、历代医事管理、历代医学荟萃、养生文化撷英、近代海上中医、本草方剂鉴赏、当代岐黄新貌八个专题'
    },
    {
        img: 'src/assets/b3.jpg',
        title: '广州中国传统医药文化博物馆',
        desc: '广州中国传统医药文化博物馆位于广州市越秀区解放北路867号，是华南地区最大的医药博物馆。该博物馆藏品数量、规模都是华南第一、全国可数。医史馆中，4000余件医药文物遍及从夏、商到清的各个历史朝代，完整反映出中医中药的浮沉发展；中药标本馆里，从上世纪50年代起精心收集自民间的上万件中药材蔚为大观，有不少还是“全国之最”'
    },
    {
        img: 'src/assets/b4.jpg',
        title: '成都中医药大学博物馆',
        desc: '成都中医药大学博物馆位于四川省成都市温江区柳台大道东段1000号，是西南地区最大的中医药博物馆。该博物馆收藏了大量的中药材、中药饮片和中成药，同时也展示了中医药的历史和文化。此外，该博物馆还设有中药标本厅和医史厅，为公众提供了丰富的中医药知识和历史文化信息'
    },
    {
        img: 'src/assets/b5.png',
        title: '浙江省中医药博物馆',
        desc: '浙江省中医药博物馆位于杭州市滨江区滨文路518号，是浙江省唯一的省级中医药博物馆。该博物馆收藏了大量的中药材、中药饮片和中成药，同时也展示了浙江省的中医药历史和文化。此外，该博物馆还设有中药标本厅和医史厅，为公众提供了丰富的中医药知识和历史文化信息'
    }
])
</script>

<template>
    <div class="museum">
        <div class="box">
            <el-scrollbar>
                <div class="item" v-for="(item, index) in items" :key="index">
                    <img :src="item.img" class="img">
                    <div class="title">{{ item.title }}</div>
                    <div class="desc">{{ item.desc }}</div>
                </div>
            </el-scrollbar>
        </div>
        <div class="footer">
            中药博物馆
        </div>
    </div>
</template>

<style scoped>
.footer {
    position: absolute;
    top: 15%;
    left: 10%;
    writing-mode: vertical-rl;
    font-size: 3rem;
    font-family: 'ye';
    color: rgb(255, 221, 30);
    text-shadow: 0 0 5px #afafaf;
    font-weight: 800;
}
.desc {
    width: 90%;
    font-size: 1.2rem;
    position: relative;
    top: 10%;
    left: 5%;
}
.title {
    font-size: 1.8rem;
    font-weight: bold;
    position: relative;
    top: 5%;
    left: 5%;
}
.img {
    width: 90%;
    height: 50%;
    position: relative;
    top: 3%;
    left: 5%;
    border-radius: 10px;
}

.item {
    width: 40%;
    margin-left: 5%;
    margin-top: 10px;
    height: 60vh;
    border-radius: 10px;
    background-color: #fff;
    float: left;
    box-shadow: 0 0 10px #999;
}

.box {
    height: 90%;
    width: 80%;
    position: relative;
    top: 5%;
    left: 15%;
    border-radius: 10px;
    font-family: 'ali';
}

.museum {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bj2.jpg');
    background-size: cover;
}
</style>