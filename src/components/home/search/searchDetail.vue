<template>
  <div class="searchDetail">
    <!-- 表头 -->
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="content">
          <ul>
            <li
              v-for="(item, index) in kindList"
              :key="index"
              v-bind:class="kindname == index ? 'choose' : ''"
            >
              <span @click="kindHandle(index)">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <!-- 列表 -->
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="list" v-if="kindname == 0">
          <el-table
            :data="searchList"
            style="width: 100%"
            height="1300px"
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

            <el-table-column prop="album.name" label="专辑"></el-table-column>
            <el-table-column prop="artists[0].name" label="歌手">
            </el-table-column>
          </el-table>
        </div>
        <div class="list" v-if="kindname == 3 || kindname == 1">
          <ul>
            <li v-for="(item1, index) in searchList" :key="index">
              <img :src="item1.picUrl" alt="" @click="imgHandle(item1)"><span>{{item1.name}}</span>
            </li>
          </ul>
        </div>
        <div class="list" v-if="kindname == 2">
          <ul>
            <li v-for="(item1, index) in searchList" :key="index">
              <img :src="item1.coverImgUrl" alt="" :title="item1.description" @click="imgHandle(item1)"><span>{{item1.name}}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "searchDetail",
  components: {},
  props: {},
  data() {
    return {
      kindname: 0,
      searchList: [],
      kindList: [
        { name: "单曲" },
        { name: "专辑" },
        { name: "歌单" },
        { name: "歌手" },
      ],
    };
  },
  methods: {
    kindHandle(index) {
      const key = this.$route.query.keywords;
      this.kindname = index;
      if (index == 0) {
        this.searchList.length = 0
        this.$api
          .getSearchList({
            keywords: key,
            type: 1,
            limit: 20
          })
          .then((res) => {
            this.searchList = res.data.result.songs;
          });
      }
      if (index == 1) {
        this.searchList.length = 0
        this.$api
          .getSearchList({
            keywords: key,
            type: 10,
          })
          .then((res) => {
            console.log(res.data);
            this.searchList = res.data.result.albums;
          });
      }
      if (index == 2) {
        this.searchList.length = 0
        this.$api
          .getSearchList({
            keywords: key,
            type: 1000,
          })
          .then((res) => {
            console.log(res.data);
            this.searchList = res.data.result.playlists;
          });
      }
      if (index == 3) {
        this.searchList.length = 0
        this.$api
          .getSearchList({
            keywords: key,
            type: 100,
          })
          .then((res) => {
            console.log(res.data);
            this.searchList = res.data.result.artists;
          });
      }
    },
    imgHandle(item){
      if(item.type === "专辑"){
        window.open(this.$router.resolve({ path:'/albumDetail',query:{ id : item.id }}).href,'_blank')
      }else if(item.specialType == 0){
         window.open(this.$router.resolve({ path:'/gdDetail',query:{ id : item.id }}).href,'_blank')
      }else{
        window.open(this.$router.resolve({ path:'/singerDetail',query:{ id : item.id }}).href,'_blank')
      }
    },
    playHandle(row) {
      window.open(this.$router.resolve({ path:'/songDetail',query:{ id : row.id }}).href,'_new')
    },
  },
  created() {},
  mounted() {
    const key = this.$route.query.keywords;
    // console.log(key);
    this.$api
      .getSearchList({
        keywords: key,
        type: 1,
        limit: 20,
      })
      .then((res) => {
        console.log(res.data.result.songs);
        this.searchList = res.data.result.songs;
      });
    //   this.$api
    //     .getSearchList({
    //       keywords: key,
    //       type: 10,
    //     })
    //     .then((res) => {
    //       console.log(res.data.result.albums);
    //       this.albumsList = res.data.result.albums;
    //     }),
    //   this.$api
    //     .getSearchList({
    //       keywords: key,
    //       type: 100,
    //     })
    //     .then((res) => {
    //       console.log(res.data.result.artists);
    //       this.singersList = res.data.result.artists;
    //     }),
    //   this.$api
    //     .getSearchList({
    //       keywords: key,
    //       type: 1000,
    //     })
    //     .then((res) => {
    //       console.log(res.data.result.playlists);
    //       this.gdsList = res.data.result.playlists;
    //     });
  },
};
</script>
<style>
.searchDetail {
  width: 100%;
  height: 1300px;
}
/*
.searchDetail .location .search{
  width: 100%;
  margin-top: 30px;
}
.searchDetail .location .searchSug{
  width: 84.5%;
  background: rgb(255, 255, 255);
  top:70px;
  border-radius: 0;
  border: 1px solid rgb(48, 171, 187);
  border-top: 0;
} */

/* .location .searchSug dd{
  width: 400px;
  height: 30px;
  color: black;
  margin-left: 10px;
}
.location .searchSug span{
  width: 100%;
  height: 100%;
} */
.searchDetail .content {
  width: 100%;
  height: 100px;
  margin-top: 50px;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(218, 208, 208);
}
.searchDetail .content li {
  width: 150px;
  height: 100px;
  float: left;
  font-size: 18px;
  font-weight: bolder;
  line-height: 100px;
  cursor: pointer;
}
.searchDetail .content li span {
  margin-left: 55px;
}
.searchDetail .content .choose {
  color: rgb(48, 171, 187);
  font-size: 20px;
  border-bottom: 3px solid rgb(48, 171, 187);
}
.searchDetail .list {
  width: 100%;
  background: rgb(194, 179, 179);
}
.searchDetail .list ul{
  width: 100%;
  height: 1300px;
  background: #fff;
}
.searchDetail .list li{
  width: 200px;
  height: 250px;
  float: left;
  line-height: 50px;
  text-align: center;
  margin-right: 10px;
  margin-top: 30px;
  overflow: hidden;
  cursor: pointer;
}
.searchDetail .list img{
  float: left;
  width: 200px;
  height: 200px;
}
.tab {
  display: flex;
  justify-content: center;
}
</style>