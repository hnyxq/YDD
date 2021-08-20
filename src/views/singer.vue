<template>
  <div class="singer">
    <!-- 歌手分类 -->
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="title">
          <router-link
            class="link"
            v-for="(item, index) in types"
            :key="index"
            :to="{
              name: 'singer',
              query: {
                area: params.area,
                type: item.value,
                initial: params.initial,
              },
            }"
            exact
          >
            {{ item.name }}
          </router-link>
        </div>
        <div class="title">
          <router-link
            class="link"
            v-for="(item, index) in areas"
            :key="index"
            :to="{
              name: 'singer',
              query: {
                area: item.value,
                type: params.type,
                initial: params.initial,
              },
            }"
            exact
          >
            {{ item.name }}
          </router-link>
        </div>
        <div class="title">
          <router-link
            class="link1"
            v-for="(item, index) in initials"
            :key="index"
            :to="{
              name: 'singer',
              query: { area: params.area, type: params.type, initial: item },
            }"
            exact
          >
            {{ item === -1 ? "全部" : item }}
          </router-link>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <!-- 歌手列表 -->
      <el-col :span="16" :offset="4">
        <div class="detail">
          <ul>
            <li v-for="(item2, index) in detailList" :key="index">
              <img :src="item2.img1v1Url" alt="" @click="singerHandle(item2)" />
              <span>{{ item2.name }}</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "singer",
  data() {
    return {
      types: [
        { name: "全部", value: -1 },
        { name: "男歌手", value: 1 },
        { name: "女歌手", value: 2 },
        { name: "乐队", value: 3 },
      ],
      areas: [
        { name: "全部", value: -1 },
        { name: "华语", value: 7 },
        { name: "欧美", value: 96 },
        { name: "日本", value: 8 },
        { name: "韩国", value: 16 },
        { name: "其他", value: 0 },
      ],
      initials: [
        -1,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      // 歌手列表
      detailList: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {
    params(){
      let params = {
        area:this.$route.query.area,
        type:this.$route.query.type,
        initial:this.$route.query.initial
      }
      return params;
    }
    
  },
  // 监控data中的数据变化
  watch: {
    //监听URL参数变化时重新加载数据
    'params.area'(){
      this.reloadData();
      location.reload();
    },
    'params.type'(){
      this.reloadData();
      location.reload()
    },
    'params.initial'(){
      this.reloadData();
      location.reload()
    }
  },
  methods: {
    // 刷新数据
    reloadData(){
      this.detailList = [];
    },
    // 点击跳转详情
    singerHandle(item2) {
      window.open(
        this.$router.resolve({ path: "/singerDetail", query: { id: item2.id } })
          .href,
        "_blank"
      );
    },
  },
  mounted() {
    this.$store.state.activeIndex = '/singer'
    // 获取歌手
    this.$api
      .getRzSingerList({
        type: this.params.type,
        area: this.params.area,
        initial: this.params.initial,
        limit:100
      })
      .then((res) => {
        console.log(res.data.artists);
        this.detailList = res.data.artists;
      });
      $storestore.dispatch('setActiveIndex', '/singer')
  },
};
</script>
<style scoped>
.singer {
  width: 100%;
  height: 1000px;
}
.singer .title {
  width: 100%;
  height: 50px;
  margin-left: 80px;
  margin-top: 30px;
}
.singer .title .link {
  padding: 0 20px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: none;
  color: #333;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  transition: 0.2s ease-out;
}
.singer .title .link1{
  padding: 0 15px;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: none;
  color: #333;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  transition: 0.2s ease-out;
}
.router-link-active{
  background: #409EFF;
  color: #fff
}
.detail {
  width: 100%;
  height: 100%;
  float: left;
  margin-top: 100px;
  padding-left: 20px;
}
.detail li {
  width: 150px;
  height: 200px;
  float: left;
  text-align: center;
  margin-left: 50px;
  line-height: 50px;
  cursor: pointer;
  margin-top: 30px;
}
.detail li img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: block;
}
</style>