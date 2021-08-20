<template>
  <div class="songList">
    <!-- 歌单分类 -->
    <el-row >
      <el-col :span="16" :offset="4">
        <div class="name">
          <ul v-for="(item,index) in gdList" :key="index">
            <li @click="gdHandle(item,index)" v-bind:class="show == index?'choose':''">{{item.name}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- 歌单列表 -->
    <el-row >
      <el-col :span="16" :offset="4">
        <div class="detail">
          <ul>
            <li v-for="(item,index) in detailList" :key="index">
                <img :src="item.coverImgUrl" alt="" :title="item.description" @click="songListHandle(item)">
                <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "songList",
  data(){
    return{
      // 默认显示
      show:'0',
      // 歌单分类
      gdList: [],
      // 歌单列表
      detailList:[]
    }
  },
  methods: {
    // 点击切换列表
    gdHandle(item,index){
      this.detailList.length = 0;
      this.show = index
      this.$api.getSongListDetail({
        cat: item.name,
        limit:48
      })
      .then((res) => {
        console.log(res.data.artists);
        this.detailList = res.data.playlists
      });
    },
    songListHandle(item){
           window.open(this.$router.resolve({ path:'/gdDetail',query:{ id : item.id }}).href,'_blank')
    }
  },
  mounted(){
    // 获取歌单分类
    this.$api.getSongList().then(res => {
      // console.log(res.data);
      this.gdList = res.data.sub
    });
    //获取默认歌单
    this.$api.getSongListDetail({
      cat: '综艺',
      limit:48
    }).then(res => {
      console.log(res.data.playlists);
      this.detailList = res.data.playlists
    });
  }
};
</script>
<style scoped>
.songList {
  width: 100%;
  height: 2000px;
}
.name{
  width: 100%;
  height: 400px;
  margin-top: 30px;
}
.name li{
  float: left;
  width: 100px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  text-align: center;
}
.name li:hover{
  background: rgba(230, 222, 222, 0.4);
}
.choose{
 background: #409EFF;
 color: #fff;
 border-radius: 30px;
}
.detail{
  width: 100%;
  height: 100%;
}
.detail li{
  float: left;
  width: 200px;
  height: 185px;
  line-height: 30px;
  margin-right: 1%;
  margin-bottom: 30px;
  cursor: pointer;
  overflow: hidden;
}
.detail li img{
  width: 200px;
  height: 150px;
}
.detail li img:hover{
  opacity: 0.6;
}
.detail li span:hover{
  color: #40fff5;
}
</style>