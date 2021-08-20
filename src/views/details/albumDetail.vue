<template>
  <div class="albumDetail">
   <el-row>
      <el-col :span="3" :offset="4">
        <div class="title">
          <!-- 歌单信息 -->
          <img
            :src="albumDetailList.album.blurPicUrl"
            alt=""
            :title="albumDetailList.album.description"
          />
          <p>
            名称：<span>{{ albumDetailList.album.name }}</span>
          </p>
          <br />
          <p>
            创建人：<span>{{ albumDetailList.album.artist.name }}</span>
          </p>
          <br />
          <p>发行公司：<span>{{ albumDetailList.album.company }}</span></p>
          <br />
        </div>
      </el-col>
      <el-col :span="13">
        <div class="detail">
          <h3>歌曲列表</h3>
          <hr />
          <el-table
            ref="singleTable"
            :data="albumDetailList.songs"
            style="width: 100%"
          >
            <el-table-column type="index" width="100"></el-table-column>
            <el-table-column prop="al.name" label="标题" width="200">
            </el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              width="150"
            ></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" width="150">
            </el-table-column>
            <el-table-column width="45"><template slot-scope="scope" >
              <i class="el-icon-video-play icon" @click="playHandle(scope.row)"></i>
              </template></el-table-column>
            <el-table-column width="45"
              ><div><i class="el-icon-circle-plus-outline icon"></i></div
            ></el-table-column>
            <el-table-column width="45"
              ><div><i class="el-icon-share icon"></i></div
            ></el-table-column>
          </el-table>
          <!-- 专辑评论 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "albumDetail",
  data() {
    return {
      albumDetailList: {},
      
    };
  },
  methods: {
    playHandle(row){
      window.open(this.$router.resolve({ path:'/songDetail',query:{ id : row.id }}).href,'_new')
    }
  },
  mounted() {
    //   获取专辑详情
    this.$api.getAlbumDetailList({
      id : this.$route.query.id
      })
      .then(res => {
        console.log(res.data);
        this.albumDetailList = res.data;
      });
  }
};
</script>

<style scoped>
.albumDetail{
    width: 100%;
    height: 100%;
}
.title {
  width: 100%;
  height: 2000px;
  padding-top: 60px;
  background: rgb(249, 249, 249);
  border-right: 1px solid rgba(241, 235, 235, 0.9);
  border-left: 1px solid rgba(241, 235, 235, 0.9);
}
.title img {
  width: 100%;
  height: 250px;
  float: left;
  margin-bottom: 30px;
}
.title p {
  color: rgb(161, 164, 167);
}
.title span {
  color: rgb(109, 107, 105);
  word-spacing: 10px;
}
/* .title .related{
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
} */
.bq {
  margin: 20px 10px;
}
.detail {
  width: 100%;
  height: 2000px;
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