<template>
  <div class="gdDetail">
    <el-row>
      <el-col :span="3" :offset="4">
        <div class="title">
          <!-- 歌单信息 -->
          <img
            :src="songListDetail.coverImgUrl"
            alt=""
            :title="songListDetail.description"
          />
          <el-tag
            v-for="(item, index) in songListDetail.tags"
            :key="index"
            class="bq"
            >{{ item }}</el-tag
          >
          <p>
            名称：<span>{{ songListDetail.name }}</span>
          </p>
          <br />
          <p>
            创建人：<span>{{ songListDetail.creator.nickname }}</span>
          </p>
          <br />
          <p>更新时间：<span>每日更新</span></p>
          <br />
          <!-- 相关推荐 -->
          <div class="related">
            <h3>相关歌单推荐</h3>
            <ul>
              <li v-for="(item2,index) in relatedSongList" :key="index">
                <img :src="item2.coverImgUrl" alt="" @click="songListHandle(item2)">
                <span>{{item2.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="detail">
          <h3>歌曲列表</h3>
          <hr />
          <el-table
            ref="singleTable"
            :data="songListDetail.tracks"
            style="width: 100%"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "gdDetail",
  data() {
    return {
      songListDetail: {},
      // 相关推荐
      relatedSongList: [],
    };
  },
  methods: {
     songListHandle(item2){
      this.songListDetail.length = 0;
      this.relatedSongList.length = 0;
      this.$api
      .getSongRankList({
        //   升榜
        id: item2.id
      })
      .then((res) => {
        let arr = res.data.playlist
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.tracks.length;i++){
            arr.tracks[i].dt = this.$utils.formatData(arr.tracks[i].dt)
          }
          this.songListDetail = arr
      });
      this.$api
      .getRelatedSongList({
        id: item2.id,
      })
      .then((res) => {
        console.log(res.data.playlists);
        this.relatedSongList = res.data.playlists;
      });
    },
    playHandle(row){
      console.log(row);
      window.open(this.$router.resolve({ path:'/songDetail',query:{ id : row.id }}).href,'_new')
    }
  },
  mounted() {
    this.$api
      .getSongRankList({
        //   升榜
        id: this.$route.query.id,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        // this.songListDetail = res.data.playlist;
        let arr = res.data.playlist
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.tracks.length;i++){
            arr.tracks[i].dt = this.$utils.formatData(arr.tracks[i].dt)
          }
          this.songListDetail = arr
      });
      // 获取相关推荐
    this.$api
      .getRelatedSongList({
        id: this.$route.query.id,
      })
      .then((res) => {
        console.log(res.data.playlists);
        this.relatedSongList = res.data.playlists;
      });
  },
};
</script>
<style scoped>
.gdDetail {
  width: 100%;
  height: 1500px;
}
.title {
  width: 100%;
  height: 1500px;
  padding-top: 60px;
  background: rgb(249, 249, 249);
  border-right: 1px solid rgba(241, 235, 235, 0.9);
  border-left: 1px solid rgba(241, 235, 235, 0.9);
}
.title img {
  width: 100%;
  height: 250px;
  float: left;
}
.title p {
  color: rgb(161, 164, 167);
}
.title span {
  color: rgb(109, 107, 105);
  word-spacing: 10px;
}
.title .related{
  width: 100%;
  height: 1000px;
  margin-top: 50px;
}
.title .related li{
  width: 100%;
  height: 100px;
  margin-top: 30px;
  line-height: 30px;
  background: rgba(204, 204, 204,0.3);
}
.title .related li img {
  width: 100px;
  height: 100px;
}
.bq {
  margin: 20px 10px;
}
.detail {
  width: 85%;
  height: 1500px;
  margin-top: 60px;
  margin-left: 100px;
}
.detail h3 {
  font-size: 25px;
}
.detail hr {
  height: 2px;
  background: rgb(151, 143, 143);
}
</style>