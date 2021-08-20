<template>
  <div class="rank">
    <el-row>
      <el-col :span="3" :offset="4">
        <div class="rankList">
          <!-- 榜单分类 -->
          <h3>特色音乐榜</h3>
          <ul v-for="(item, index) in rankList" :key="index">
            <li
              @click="nameHandle(item, index)"
              v-bind:class="bdName == index ? 'choose' : ''"
            >
              <img :src="item.img" alt="" /><span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- 榜单信息 -->
      <el-col :span="13">
        <div class="title">
          <img :src="rankDetail.coverImgUrl" alt="" />
          <span>{{ rankDetail.name }}</span>
          <p>{{ rankDetail.description }}</p>
          <ul>
              <li><i class="el-icon-video-play"></i>播放</li>
              <li><i class="el-icon-circle-plus-outline"></i>添加</li>
              <li><i class="el-icon-star-off"></i>收藏</li>
              <li><i class="el-icon-share"></i>分享</li>
            </ul>
        </div>
        <!-- 榜单排行 -->
        <div class="detail">
          <h3>歌曲列表</h3>
          <hr />
          <!-- 展示列表 -->
          <el-table
             ref="singleTable"
            :data="
              rankDetail.tracks.slice((currentPage - 1) * 10, currentPage * 10)
            "
            :stripe="true"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" width="100"></el-table-column>
             <el-table-column prop="al.picUrl"  width="100">
               <template slot-scope="scope" >
               <img :src="scope.row.al.picUrl"  alt="" width="50px" height="50px" >
               </template>
             </el-table-column>
            <el-table-column prop="name" label="标题"  width="200"> </el-table-column>
            <el-table-column prop="dt" label="时长" width="150"></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" width="150"> </el-table-column>
            <el-table-column width="45"><template slot-scope="scope" ><i class="el-icon-video-play icon" @click="playHandle(scope.row)"></i></template></el-table-column>
            <el-table-column width="45"><template slot-scope="scope" @click="playHandle(scope.$index,scope.row)"><i class="el-icon-circle-plus-outline icon"></i></template></el-table-column>
            <el-table-column width="45"><template slot-scope="scope" @click="playHandle(scope.$index,scope.row)"><i class="el-icon-share icon"></i></template></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="fy">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="100"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "rank",
  data() {
    return {
      // 当前页码
      currentPage: '1',
      // 默认榜单显示
      bdName: "0",
      // 榜单分类信息
      rankList: [
        {
          img: "https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",
          name: "飙升榜",
          id: "19723756",
        },
        {
          img: "https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg",
          name: "热歌榜",
          id: "3778678",
        },
        {
          img: "https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg",
          name: "新歌榜",
          id: "3779629",
        },
        {
          img: "https://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg",
          name: "原创榜",
          id: "2884035",
        },
        {
          img: "https://p2.music.126.net/G91csin09maPrNgqcUKnBQ==/109951165698553069.jpg?param=40y40",
          name: "黑胶唱片",
          id: "5453912201",
        },
        {
          img: "https://p2.music.126.net/v--zfW0Y0jbexl3CiALGlw==/109951165611550672.jpg?param=40y40",
          name: "韩语榜",
          id: "745956260",
        },
        {
          img: "https://p1.music.126.net/uN5PupU0rXEuMq0HIlxb_w==/109951165752868980.jpg?param=40y40",
          name: "欧美热歌榜",
          id: "2809513713",
        },
        {
          img: "https://p1.music.126.net/rwRsVIJHQ68gglhA6TNEYA==/109951165611413732.jpg?param=40y40",
          name: "美国Billboard榜",
          id: "60198",
        },
      ],
      // 榜单详情
      rankDetail: {},
    };
  },
  methods: {
    // 获取当前行索引
    tableRowClassName({row,rowIndex}){
        row.index = rowIndex
    },
    // 点击切换榜单
    nameHandle(item, index) {
      this.rankDetail.length = 0;
      this.bdName = index;
      this.$api
        .getSongRankList({
          id: item.id,
        })
        .then((res) => {
          console.log(res.data.playlist);
          // this.rankDetail = res.data.playlist;
          let arr = res.data.playlist
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.tracks.length;i++){
            arr.tracks[i].dt = this.$utils.formatData(arr.tracks[i].dt)
          }
          this.rankDetail = arr
        });
    },
    // 切换分页
    handleCurrentChange(val){
      this.currentPage = val
    },
    contrl(){

    },
    // 点击播放
    playHandle(row){
      window.open(this.$router.resolve({ path:'/songDetail',query:{ id : row.id }}).href,'_new')
    }
  },
  mounted() {
    this.$api
      .getSongRankList({
        //   飙升榜
        id: 19723756,
      })
      .then((res) => {
        console.log(res.data.playlist);
        let arr = res.data.playlist
          // this.currentPage = res.data.playlist.tracks;
          for(let i=0;i<arr.tracks.length;i++){
            arr.tracks[i].dt = this.$utils.formatData(arr.tracks[i].dt)
          }
          this.rankDetail = arr
      });
  },
};
</script>
<style scoped>
.rank {
  width: 100%;
  height: 1500px;
}
.rankList {
  width: 100%;
  height: 1500px;
  border-left: 1px solid rgb(235, 226, 226);
  border-right: 1px solid rgb(235, 226, 226);
  background: rgb(249, 249, 249);
  padding-top: 60px;
}
.rankList h3 {
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.rankList li {
  width: 100%;
  height: 80px;
  line-height: 80px;
  cursor: pointer;
}
.rankList img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: auto 25px;
}
.choose {
  background: #e4e6e9;
  color: rgb(78, 165, 172);
}

.title {
  width: 100%;
  height: 200px;
  margin-top: 80px;
}
.title img {
  width: 200px;
  height: 200px;
  margin: auto 50px;
  float: left;
  border: 1px solid #e4e6e9;
  box-shadow: 10px 10px 20px rgb(156, 154, 154);
}
.title span {
  font-size: 25px;
  line-height: 60px;
}
.title p {
  color: #a4a4a5;
}
.title ul{
  width: 100%;
  margin-top: 80px;
}
.title li{
  width: 80px;
  height: 40px;
  float: left;
  border: 1px solid #ccc;
  background: #e4e6e9;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  margin-left: 30px;
  border-radius: 5px;
}

.detail {
  width: 85%;
  height: 1000px;
  margin-top: 100px;
  margin-left: 60px;
}
.detail h3 {
  font-size: 25px;
}
.detail hr {
  height: 2px;
  background: #ff6700;
}
.detail img {
  width: 50px;
  height: 50px;
  margin: auto 30px;
}
.fy{
  width: 50%;
  height: 50px;
  margin-left: 150px;
}
.icon{
  font-size: 25px;
}
</style>