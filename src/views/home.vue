<template>
  <div class="home">
       <!-- 海报 -->
      <banner></banner>
      <hot></hot>
      <song-rank></song-rank>
      <mv></mv>
  </div>
</template>

<script>
import banner from '@/components/home/banner.vue'
import hot from '../components/home/hot.vue'
import mv from '../components/home/mv.vue'
import songRank from '../components/home/songRank.vue'
export default {
  name:'home',
  components: {
      banner,
      hot,
      mv,
      songRank
  }
};
</script>
<style>
.home{
  width: 100%;
  height: 2150px;
}
</style>