<template>
  <div class="myMuisc">
    <el-row>
      <el-col :span="4" :offset="4">
        <div class="myMenu">
          <div class="block">
            <el-avatar :size="80" :src="userList.avatarUrl" class="img">
            </el-avatar>
            <span>{{userList.nickname}}</span>
          </div>
          <div :class="['title']" @click="change1()">
            <span>我喜欢的音乐</span>
            <i class="icon el-icon-caret-right" v-if="value1 == 'false'"></i>
            <i class="icon el-icon-caret-bottom" v-if="value1 == 'true'"></i>
          </div>
          <div class="hd handle-one" v-if="value1 == 'true'">
            <ul>
              <li @click="changeHandle()">
                <img :src="userPlaylist[0].coverImgUrl" alt="">
                <span>{{userPlaylist[0].name}}</span>
              </li>
            </ul>
          </div>
          <div :class="['title']" @click="change2()">
            <span>我的歌单</span>
            <i class="icon el-icon-caret-right" v-if="value2 == 'false'"></i>
            <i class="icon el-icon-caret-bottom" v-if="value2 == 'true'"></i>
          </div>
          <div class="hd handle-two" v-if="value2 == 'true'">
            <ul>
              <li  v-for="(item, index) in userPlaylist.slice(1)" :key="index" @click="changeHandle1(item)">
                <img :src="item.coverImgUrl" alt="">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div :class="['title']" @click="change3()">
            <span>我的关注</span>
            <i class="icon el-icon-caret-right" v-if="value3== 'false'"></i>
            <i class="icon el-icon-caret-bottom" v-if="value3 == 'true'"></i>
          </div>
          <div class="hd handle-three" v-if="value3 == 'true'">
            <ul>
              <li  v-for="(item, index) in userSingerList" :key="index">
                <img :src="item.avatarUrl" alt="">
                <span>{{item.nickname}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="show">
          <div class="top">
            <span class="box"><img :src="userinfo.coverImgUrl" alt=""></span>
            <span>{{userinfo.name}}</span>
            <el-avatar :size="40" :src="userList.avatarUrl" class="tx"></el-avatar>
            <h4>{{userList.nickname}}</h4>
            <ul>
              <li><i class="el-icon-video-play"></i>播放</li>
              <li><i class="el-icon-circle-plus-outline"></i>添加</li>
              <li><i class="el-icon-star-off"></i>收藏</li>
              <li><i class="el-icon-share"></i>分享</li>
            </ul>
          </div>
          <div class="detail">
          <h3>歌曲列表</h3>
          <hr />
          <el-table
            ref="singleTable"
            :data="userSongsList"
            style="width: 100%"
            stripe="true"
          >
            <el-table-column type="index" width="100"></el-table-column>
            <el-table-column prop="al.picUrl" width="100">
              <template slot-scope="scope">
                <img
                  :src="scope.row.al.picUrl"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="标题" width="200">
            </el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              width="150"
            ></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" width="150">
            </el-table-column>
            <el-table-column width="45"
              ><template slot-scope="scope" ><i class="el-icon-video-play icon" @click="playHandle(scope.row)"></i></template></el-table-column>
            <el-table-column width="45"
              ><div><i class="el-icon-circle-plus-outline icon"></i></div
            ></el-table-column>
            <el-table-column width="45"
              ><div><i class="el-icon-share icon"></i></div
            ></el-table-column>
          </el-table>
          <!-- 歌单评论 -->
        </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "myMuisc",
  data() {
    return {
      // 用户信息
      userList: {},
      // 用户收藏歌单
      userPlaylist:[],
      // 歌单详情
      userSongsList:[],
      userinfo:{},
      // 我的关注
      userSingerList:[],
      ids:'',
      value1: 'false',
      value2: 'true',
      value3: 'true',
    };
  },
  methods: {
    change1(){
      if(this.value1 == 'false'){
       this.value1 = 'true'
      }else{
        this.value1 = 'false'
      }
    },
    change2(){
      if(this.value2 == 'false'){
       this.value2 = 'true'
      }else{
        this.value2 = 'false'
      }
    },
    change3(){
      if(this.value3 == 'false'){
       this.value3 = 'true'
      }else{
        this.value3 = 'false'
      }
    },
    changeHandle(){
      // this.$api
      // .getLikeList({
      //   uid: localStorage.userId
      // })
      // .then((res) => {
      //   console.log(res);
      //   // this.userSongsList = res.data.playlist;
      // });
    },
    // 点击我的歌单
    changeHandle1(item){
      this.ids = ''
      this.userSongsList.length = 0
        this.$api
      .getSongRankList({
        id: item.id,
      })
      .then((res) => {
        console.log(res.data.playlist.trackIds);
        this.userinfo = res.data.playlist
        // 获取歌单歌曲详情
        let arr=res.data.playlist.trackIds;
        for(let i=0;i<arr.length-1;i++){
          this.ids += arr[i].id+',';
        }
        this.ids += arr[arr.length-1].id
        // console.log(this.ids);
         this.$api
        .getSongDetailList({
         ids: this.ids,
       })
      .then((res) => {
        console.log(res);
        this.userSongsList = res.data.songs
        let arr = res.data.songs
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.length;i++){
            arr[i].dt = this.$utils.formatData(arr[i].dt)
          }
          this.userSongsList = arr
      });
      });
    },
    playHandle(row){
      // console.log(row);
      this.$store.commit('setBfList',this.userSongsList)
      window.open(this.$router.resolve({ path:'/songDetail',query:{ id : row.id }}).href,'_new')
    }
  },
  mounted() {
    this.$store.commit("setActiveIndex",'/myMuisc')
    const _id = this.$store.state.userInfo.userId;
    this.$api
      .getUserDetailList({
        uid: _id,
      })
      .then((res) => {
        // console.log(res);
        this.userList = res.data.profile;
      });
      // 用户歌单
      this.$api
      .getUserPlaylist({
        uid:  _id,
      })
      .then((res) => {
        console.log(res);
        this.userPlaylist = res.data.playlist;
      });

      this.$api
      .getUserFollow({
        uid:  _id,
      })
      .then((res) => {
        // console.log(res);
        this.userSingerList = res.data.follow;
      });

      this.$api
      .getSongRankList({
        id: 2498232894,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        this.userinfo = res.data.playlist
        let arr=res.data.playlist.trackIds;
        for(let i=0;i<arr.length-1;i++){
          this.ids += arr[i].id+',';
        }
        this.ids += arr[arr.length-1].id
        // console.log(this.ids);
         this.$api
        .getSongDetailList({
         ids: this.ids,
       })
      .then((res) => {
        // console.log(res);
        this.userSongsList = res.data.songs
        let arr = res.data.songs
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.length;i++){
            arr[i].dt = this.$utils.formatData(arr[i].dt)
          }
          this.userSongsList = arr
      });
      });

      
  },
   created(){
    this.$store.commit('initUser')
  },
};
</script>
<style scoped>
.myMuisc {
  width: 100%;
  background: #f8f8f8;
}
.myMenu{
  width: 100%;
  height: 1000px;
  border-left: 1px solid rgb(235, 226, 226);
  border-right: 1px solid rgb(235, 226, 226);
  background: #ffffff;
  padding-top: 50px;

}
.block{
  width: 100%;
  height: 100px;
  margin-bottom: 80px;
  background: rgba(125, 128, 128,0.4);
  line-height: 100px;
  border-radius: 5px;
  box-shadow: 10px 10px 10px rgb(47 53 66 / 60%);
}
.block .img{
  float: left;
  margin-top: 10px;
  margin-left: 30px;
}
.block span{
  font-size: 20px;
  font-weight: bolder;
  margin-left: 30px;
}
.myMenu .title{
  margin-top: 50px;
  margin-left: 30px;
  cursor: pointer;
}
.myMenu .title span{
   font-size: 16px;
  font-weight: bolder;
}
.myMenu .title .icon{
  float: right;
  font-size: 20px;
  margin-right: 30px;
}
.myMenu .hd{
  width: 80%;
  padding-top: 20px;
  transition: all 1s .5s;
}
.myMenu .hd li{
  width: 100%;
  height: 50px;
  margin-left: 40px;
  margin-top: 20px;
  line-height: 50px;
  overflow: hidden;
  cursor: pointer;
}
.myMenu .hd li img{
  width: 50px;
  height: 50px;
  border-radius: 5px;
  float: left;
}
.myMenu .hd li span{
  font-size: 12px;
  font-weight: bolder;
  margin-left: 10px;
}
.show{
  width: 100%;
  /* height: 1500px; */
  border-left: 1px solid rgb(235, 226, 226);
  border-right: 1px solid rgb(235, 226, 226);
  background: #ffffff;
}
.show .top{
  width: 100%;
  height: 300px;
  background: #fff;
}
.show .top .box{
  width: 210px;
  height: 210px;
  border: 1px solid rgb(221, 215, 215);
  float: left;
  text-align: center;
  margin-top: 80px;
  margin-left: 50px;
}
.show .top .box img{
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 5px;
}
.show .top span{
  font-size: 30px;
  margin-top: 100px;
  margin-left: 30px;
  float: left;
}
.show .top .tx{
  margin-top: 150px;
  margin-left: -30px;
}
.show .top h4{
  display: inline-block;
  margin-top: 160px;
  margin-left: 20px;
}
.show .top ul{
  width: 100%;
  height: 80px;
  margin-top: 50px;
}
.show .top li{
  width: 80px;
  height: 40px;
  float: left;
  border: 1px solid #ccc;
  background: #f9f9f9;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  margin-left: 30px;
  border-radius: 5px;
}

.show .detail {
  width: 90%;
  /* height: 2000px; */
  margin-top: 60px;
  margin-left: 50px;
}
.show .detail h3 {
  font-size: 25px;
}
.show .detail hr {
  height: 2px;
  background: #ff6700;
}
</style>