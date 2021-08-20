<template>
  <div class="location">
        <!-- 搜索框 -->
        <el-input
          v-model="value"
          @input="keyValue($event)"
          @keydown.enter.native="searchHandle(value)"
          @blur="blurHandle"
          placeholder="歌名/歌手/专辑"
          class="search"
        >
          <el-button
            icon="el-icon-search"
            slot="append"
            @click="searchHandle(value)"
          ></el-button>
        </el-input>
        <!-- 搜索建议 -->
        <div class="searchSug" v-if="display == true">
          <dl>
            <dt>单曲</dt>
            <dd
              v-for="(item1, index) in searchSugg.songs"
              :key="index"
              :title="item1.name"
            >
              <span @click="searchSugHandle(item1)"
                >{{ item1.name }}---{{ item1.artists[0].name }}</span
              >
            </dd>
          </dl><hr />
          <dl>
            <dt>专辑</dt>
            <dd
              v-for="(item2, index) in searchSugg.albums"
              :key="index"
              :title="item2.name"
            >
              <span @click="searchSugHandle(item2)"
                >{{ item2.name }}---{{ item2.artist.name }}</span
              >
            </dd>
          </dl><hr />
          <dl>
            <dt>歌单</dt>
            <dd
              v-for="(item3, index) in searchSugg.playlists"
              :key="index"
              :title="item3.name"
            >
              <span @click="searchSugHandle(item3)">{{ item3.name }}</span>
            </dd>
          </dl><hr />
          <dl>
            <dt>歌手</dt>
            <dd v-for="(item4, index) in searchSugg.artists" :key="index">
              <span @click="searchSugHandle(item4)">{{ item4.name }}</span>
            </dd>
          </dl>
        </div>
      </div>
</template>

<script>
import merge from 'webpack-merge'
export default {
  name:'location',
  components: {},
  props: {},
  data() {
    return {
        // 搜索值
      value: "",
      // 搜索建议显示
      display: false,
      // 搜索建议
      searchSugg: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
      // 失去焦点(延迟执行)
    blurHandle() {
      setTimeout(() => {
        this.display = false;
      }, 150);
    },
    // 搜索内容改变
    keyValue(el) {
      this.display = true;
      // this.value = el.target.value
      this.$api
        .getSearchSuggest({
          keywords: this.value,
        })
        .then((res) => {
          console.log(res.data.result);
          this.searchSugg = res.data.result;
        });
      if (this.value === "") {
        this.display = false;
      }
    },
    // 搜索建议赋值
    searchSugHandle(item) {
      this.value = item.name;
    },
    // 点击跳转搜索详情
    searchHandle(value) {
      if(this.$route.path == '/searchDetail'){
        this.$router.push({
          query:merge(this.$route.query,{keywords: value})
        })
         location.reload()
      }else{
         this.$router.push({ path: "/searchDetail",query:{keywords: value}});
      }
    },
  },
  created() {},
  mounted() {}
};
</script>
<style>
.location{
  position: relative;
  width: 60%;
  height: 69px;
  float: left;
}
.location .search{
 width: 200px;
 margin-left: 30px;
 margin-top: 15px;
}
.location .searchSug{
  width: 300px;
  background: rgb(255, 255, 255);
  position: absolute;
  top: 60px;
  left: 30px;
  z-index: 100;
  border-radius: 5px;
  overflow: hidden;
}
.location .searchSug dl{
  width: 100%;
  cursor: pointer;
}
.location .searchSug dt{
  font-weight: bolder;
  margin: 20px 10px;
  color: rgb(48, 171, 187);
}
.location .searchSug dd{
  width: 400px;
  height: 30px;
  color: black;
  margin-left: 10px;
  font-size: 12px;
}
.location .searchSug span{
  width: 100%;
  height: 100%;
}
</style>