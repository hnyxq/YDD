<template>
  <div class="singerDetail">
    <el-row>
      <el-col :span="12" :offset="4">
        <div class="info">
          <h2>{{ singerDetailList.name }}</h2>
          <img :src="singerDetailList.cover" alt="" />
        </div>
        <div class="list">
          <ul class="frist">
            <li
              v-for="(item, index) in list"
              :key="index"
              v-bind:class="num == index ? 'choose' : ''"
            >
              <span @click="listHandle(index)">{{ item.name }}</span>
            </li>
          </ul>
          <!-- 歌手歌曲 -->
          <div class="detail" v-if="num == 0">
            <el-table
              :data="
                singerSongsList.slice((currentPage - 1) * 10, currentPage * 10)
              "
              style="width: 100%"
              height="600px"
              :align="center"
              stripe="true"
            >
              <el-table-column width="50px"
                ><template slot-scope="scope">
                  <i
                    class="el-icon-video-play icon"
                    @click="playHandle(scope.row)"
                  ></i> </template
              ></el-table-column>
              <el-table-column prop="name" label="歌曲名"> </el-table-column>

              <el-table-column prop="al.name" label="专辑"></el-table-column>
              <el-table-column prop="ar[0].name" label="歌手" width="120">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="sizes, prev, pager, next"
              :total="50"
              class="fy"
            >
            </el-pagination>
          </div>
          <!-- 歌手专辑 -->
          <div class="detail" v-if="num === 1">
            <ul>
            <li v-for="(item1, index) in singerAlbumsList" :key="index">
              <img :src="item1.blurPicUrl" alt="" @click="imgHandle(item1)"><span>{{item1.name}}</span>
            </li>
          </ul>
          </div>
          <!-- 歌手介绍 -->
          <div class="detail" v-if="num === 2">
            <p>{{ singerDetailList.briefDesc }}</p>
          </div>
        </div>
      </el-col>
      <!-- 相关视频 -->
      <el-col :span="4">
        <div class="intro">
          <h2>相关视频</h2>
          <ul>
              <li v-for="(item2,index) in relatedMvList" :key="index">
                <img :src="item2.imgurl" alt="" @click="mvListHandle(item2)">
                <span>{{item2.name}}</span>
              </li>
            </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "singerDetail",
  data() {
    return {
      // 初始页码
      currentPage: "1",
      // 切换索引
      num: 0,
      list: [{ name: "歌曲列表" }, { name: "歌手专辑" }, { name: "艺人介绍" }],
      // 歌手信息
      singerDetailList: [],
      // 歌手单曲
      singerSongsList: [],
      // 歌手专辑
      singerAlbumsList: [],
      // 相关MV
      relatedMvList:[]
    };
  },
  methods: {
    // 切换索引
    listHandle(index) {
      this.num = index;
    },
    // 播放单曲
    playHandle(row) {
      window.open(
        this.$router.resolve({ path: "/songDetail", query: { id: row.id } })
          .href,
        "_new"
      );
    },
    // 切换分页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    imgHandle(item1){
       window.open(this.$router.resolve({ path:'/albumDetail',query:{ id : item1.id }}).href,'_blank')
    },
    mvListHandle(item2){
       window.open(this.$router.resolve({ path:'/mvDetail',query:{ id : item2.id }}).href,'_blank')
    }
  },
  mounted() {
    
    const _id = this.$route.query.id;
    // 获取歌手信息
    this.$api
      .getSingerDetail({
        id: _id,
      })
      .then((res) => {
        console.log(res.data.data.artist);
        this.singerDetailList = res.data.data.artist;
      }),
      // 获取歌手单曲
      this.$api
        .getSingerSongsList({
          id: _id,
        })
        .then((res) => {
          console.log(res.data);
          this.singerSongsList = res.data.songs;
        });
    // 获取歌手专辑
    this.$api
      .getSingerAlbumsList({
        id: _id,
      })
      .then((res) => {
        console.log(res.data);
        this.singerAlbumsList = res.data.hotAlbums;
      });
      // 相关MV
      this.$api
      .getSingerMvsList({
        id: _id,
        limit:6
      })
      .then((res) => {
        console.log(res.data);
        this.relatedMvList = res.data.mvs;
      });
  },
};
</script>
<style scoped>
.singerDetail {
  width: 100%;
  height: 100%;
}
.singerDetail .info {
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
  border-left: 1px solid rgb(235, 226, 226);
  border-right: 1px solid rgb(235, 226, 226);
}
.singerDetail .info img {
  width: 80%;
  margin-top: 80px;
  box-shadow: 10px 10px 20px rgb(156, 154, 154);
}
.singerDetail .info h2 {
  position: absolute;
  top: 30px;
  left: 100px;
  font-size: 30px;
  color: rgb(129, 125, 125);
}
.singerDetail .list {
  width: 100%;
  height: 1000px;
  background: #fff;
  border-left: 1px solid rgb(235, 226, 226);
  border-right: 1px solid rgb(235, 226, 226);
}
.singerDetail .list .frist {
  width: 80%;
  height: 80px;
  border-bottom: 1px solid rgb(204, 197, 197);
  margin-left: 100px;
}
.singerDetail .list .frist li {
  width: 200px;
  height: 80px;
  float: left;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  cursor: pointer;
}
.singerDetail .list .choose {
  color: #409eff;
  font-size: 25px;
  border-bottom: 3px solid #409eff;
}

.singerDetail .list p {
  display: inline-block;
  margin: 30px auto;
  text-indent: 50px;
  color: rgb(94, 88, 88);
  line-height: 30px;
  letter-spacing: 1px;
}

.singerDetail .list .detail {
  width: 80%;
  height: 900px;
  margin-left: 100px;
}
.singerDetail .list .detail ul{
  width: 100%;
  height: 900px;
  margin-top: 20px;
}
.singerDetail .list .detail li {
  width: 100px;
  height: 135px;
  float: left;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 20px;
}
.singerDetail .list .detail img {
  width: 100px;
  height: 100px;
}
.singerDetail .list .detail li:hover{
  -webkit-box-shadow: #aaa 0 1px 5px;
    box-shadow: 0 1px 5px #aaa;
    opacity: 0.8;
}

.singerDetail .list .detail .fy{
  margin-left: 20%;
}


.singerDetail .intro {
  width: 100%;
  height: 1500px;
  background: rgba(243, 240, 240, 0.4);
  border-right: 1px solid rgb(235, 226, 226);
}
.singerDetail .intro h2{
  font-size: 30px;
  color: #409eff;
  margin: 30px 10px;
}
.singerDetail .intro li{
  width: 90%;
  height: 200px;
  margin-top: 20px;
  margin-left: 5%;
  position: relative;
}
.singerDetail .intro li img{
  width: 100%;
  height: 200px;
  float: left;
}
.singerDetail .intro li span{
  width: 100%;
  height: 30px;
  position: absolute;
  left: 0;
  top: 170px;
  background: rgba(80, 79, 75, 0.4);
  color: #d5dadf;
  text-align: center;
}
</style>