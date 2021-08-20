<template>
  <div class="mv">
    <el-row class="title">
      <el-col :span="8" :offset="4" ><span> MV</span>推荐</el-col>
      <el-col :span="8" class="hr"><router-link to="">更多</router-link></el-col>
    </el-row>
    <!-- 遍历MV列表 -->
    <el-row>
    <el-col :span="16" :offset="4">
        <div class="mvList">
            <ul>
                <li v-for="(item,index) in mvList"  :key="index">
                   <img :src="item.cover" alt="" @click="mvHandle(item)">
                   <span>{{item.name}}<br><i>{{item.artistName}}</i></span>
                </li>
            </ul>
        </div>
    </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: "mv",
  data() {
    return {
      // MV信息
      mvList: [],
    };
  },
  methods: {
    // Mv详情跳转
      mvHandle(item){
          window.open(this.$router.resolve({ path:'/mvDetail',query:{ id : item.id }}).href,'_blank')
      }
  },
  mounted() {
    // 获取MV推荐
    this.$api
      .getMvList({
        limit: 8
      })
      .then((res) => {
        // console.log(res.data.data);
        this.mvList = res.data.data;
      });
  },
};
</script>
<style scoped>
.mv{
    margin-top: 60px;
}
.title{
    height: 25px;
    font-size: 25px;
    color: #555;
}
.title span{
    color: rgb(207, 32, 32);
}
.hr{
    font-size: 15px;
    text-align: right;
    cursor: pointer;
}
.hr:hover{
     color: rgb(207, 32, 32)
}

/* MV列表 */
.mvList{
    width: 100%;
    height: 50%;
    /* float: left; */
}
.mvList li{
    position: relative;
    float: left;
    width: 24%;
    height: 190px;
    cursor: pointer;
    margin-top: 2%;
    margin-right: 1%;
}
.mvList li img{
    width: 100%;
    height: 100%;
}
.mvList span{
    width: 100%;
    height: 15%;
    background: rgba(0, 0, 0, 0.6);
    border-top:1px solid rgba(34, 31, 31, 0.9) ;
    border-bottom:1px solid rgba(34, 31, 31, 0.9) ;
    position: absolute;
    font-size: 15px;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255,0.8);
}
.mvList li:hover{
    -webkit-box-shadow: #aaa 0 1px 5px;
    box-shadow: 0 1px 5px #aaa;
    opacity: 0.8;
}
</style>