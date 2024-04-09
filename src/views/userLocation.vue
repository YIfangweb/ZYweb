<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const center = ref({
  lng: 116.404,
  lat: 39.915
})

const keyword = ref('')

onMounted(() => {
  //调用浏览器定位,获取定位后，调用百度地图的搜索功能，搜索关键字为'药店'
  navigator.geolocation.getCurrentPosition(function (position) {
    ElMessage({
      message: '正在根据您的位置查询',
      type: 'success'
    })
    center.value.lng = position.coords.longitude;
    center.value.lat = position.coords.latitude;
    keyword.value = '药店';
  })
})


</script>

<template>
  <div class="userLocation">
    <baidu-map class="bm-view" :center="center" :zoom="15" :scroll-wheel-zoom="true">
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"
        :selectFirstResult="true"></bm-local-search>
    </baidu-map>
  </div>
</template>

<style scoped>
.bm-view {
  width: 100vw;
  height: 100vh
}
</style>