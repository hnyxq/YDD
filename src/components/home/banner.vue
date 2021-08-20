<template>
  <div class="banner">
    <el-row>
      <el-col :span="16" :offset="4" class="col">
        <el-carousel :interval="5000" type="card" height="235px">
          <el-carousel-item v-for="(item,index) in banner_list" :key="index">
            <img :src="item.imageUrl" alt="" @click="bannerHandle(item)">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "banner",
  data(){
     return {
      //  海报详情列表
       banner_list:[]
     }
  },
  mounted(){
    // 获取海报详情
    this.$api.getBannerList().then(res => {
      this.banner_list = res.data.banners
    })
  },
  methods:{
    bannerHandle(item){
       console.log( item.targetId);
      // 判断类型
      if(item.targetType === 1){
       window.open(this.$router.resolve({ path:'/songDetail',query:{ id : item.targetId  }}).href,'_new')
      }else if(item.targetType === 1004){
        window.open( this.$router.resolve({ path:'/mvDetail',query:{ id : item.targetId }}).href,'_blank')
      }else if(item.targetType === 3000){
        window.open(item.url)
      }else if(item.targetType === 10){
        window.open(this.$router.resolve({ path:'/albumDetail',query:{ id : item.targetId }}).href,'_blank')
      }
    }
  }
};

</script>
<style scoped>
.col{
  margin-top: 20px;
}
img{
  width: 100%;
  height: 100%;
}
</style>