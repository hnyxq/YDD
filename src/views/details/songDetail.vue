<template>
  <div
    class="songDetail"
    :style="{ background: 'url(' + songDetailList.al.picUrl + ')' }"
  >
    <div class="content">
      <el-row>
        <el-col :span="7" :offset="5">
          <!-- 圆形唱片 -->
          <div class="cover">
            <img :src="songDetailList.al.picUrl" alt="" id="xz"/>
          </div>
        </el-col>

        <el-col :span="7">
          <!-- 歌曲信息 -->
          <div class="title">{{ songDetailList.name }}</div>
          <div class="singer">
            <span
              >歌手：<router-link to="">{{
                songDetailList.ar[0].name
              }}</router-link></span
            >
            <span
              >专辑：<router-link to="">{{
                songDetailList.al.name
              }}</router-link></span
            >
          </div>
          <!-- 歌词 -->
          <div class="lyric" id = "lyric">
            <ul
              class="infinite-list"
              v-infinite-scroll="locad"
              style="overflow: auto"
              
            >
              <li v-for="(item, index) in songLyric" class="infinite-list-item" :key="index" v-bind:class="bdnum == index ? 'choose' : ''"
              >
                {{item}}
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>

      <el-row class="vid">
        <el-col :span="2" :offset="5">
          <!-- 按钮 -->
          <div class="btns">
            <span class="el-icon-caret-left icon" @click="change"></span>
            <span
              class="el-icon-video-pause"
              id="icon"
              style="font-size: 50px"
              @click="contr()"
            ></span>
            <span class="el-icon-caret-right icon" @click="change"></span>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="imgBox">
            <img :src="songDetailList.al.picUrl" alt="" />
          </div>
        </el-col>
        <!-- audio/进度条上 -->
        <el-col :span="6">
          <audio
            :src="songUrlList.url"
            class="muisc"
            id="muisc"
            autoplay="autoplay"
            :loop="isLoop"
            preload="load"
            
          >
            {{ songDetailList.al.name }}
          </audio>
          <div class="box">
            {{ songDetailList.al.name }}
            <span>{{$utils.formatData(this.now_time*1000)}} / {{$utils.formatData(songDetailList.dt)}}</span>
          </div>
          <!-- 进度条 -->
          <div class="jdt_1" id="gequJDBar">
            <div class="jdt_color" id="gequjd">
              <span class="yuan"></span>
            </div>
          </div>
        </el-col>
        <!-- 操作 -->
        <el-col :span="4">
          <div class="rigth">
            <span class="el-icon-headset icon-1 icon_sx">
              <div class="sx">
                <div class="sx_color" >
                  <span class="dian"></span>
                </div>
              </div>
            </span>
            <span class="el-icon-refresh icon-1"></span>
            <span class="el-icon-share icon-1"></span>
            <span class="el-icon-s-unfold icon-1"></span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "songDetail",
  data() {
    return {
      // 歌曲url
      songUrlList: {},
      // 歌曲详情
      songDetailList: {},
      // 歌词
      songLyric: [],
      // 循环播放
      isLoop: true,
      // 当前歌词
      bdnum: 0,
      // 格式化后歌词
      lrcObj:[],
      // 歌词对应时间(s)
      lrcTime:[],
      // 当前播放时间(s)
      now_time : 0,
      // 歌曲时长(s)
      maxTime:0,
      // 选择角度
      rotate : 0
    };
  },
  watch: {
    $route: function (to, from) {
      location.reload();
    },
  },
  methods: {
    locd() {
      this.count += 2;
    },
    change() {
      let muisc = document.getElementById("muisc");
      muisc.load();
    },
    contr() {
      if (muisc.paused) {
        muisc.play();
        document.getElementById("icon").className = "el-icon-video-pause";
      } else {
        muisc.pause();
        document.getElementById("icon").className = "el-icon-video-play";
      }
    },
  },
  mounted() {
    const id = this.$route.query.id;
    // console.log(id);
    // 获取音乐url
    this.$api
      .getSongUrlList({
        id: id,
      })
      .then((res) => {
        // console.log(res);
        this.songUrlList = res.data.data[0];
       
      });
    //  获取音乐详情
    this.$api
      .getSongDetailList({
        ids: id,
      })
      .then((res) => {
        console.log(res);
        this.songDetailList = res.data.songs[0];
      });
    // 获取歌词
    this.$api
      .getSongLyric({
        id: id,
      })
      .then((res) => {
        // console.log(res.data);
        let lyricArr = res.data.lrc.lyric.split("[").slice(1);
        lyricArr.forEach((item) => {
          let arr = item.split("]");
          let m = parseInt(arr[0].split(":")[0]);
          let s = parseInt(arr[0].split(":")[1]);
          arr[0] = m * 60 + s;
          this.lrcTime.push(arr[0])
          if (arr[1] != "\n") {
            this.lrcObj[arr[0]] = arr[1];
          }
        });
        // console.log(this.lrcTime);
        this.songLyric = this.lrcObj;
      });
      // 歌词进度条同步滚动
      
      setTimeout(()=>{
        setInterval(()=>{
          // 圆形唱片旋转
          
        // 进度条同步
        var num =(this.now_time/this.maxTime).toFixed(4)*100
        document.getElementById('gequjd').style.width = num +'%'

        // 获取audio
        let muisc = document.getElementById("muisc")
        // 获取当前播放时间
         this.now_time = parseInt(muisc.currentTime)
         this.maxTime = parseInt(this.songDetailList.dt/1000)
        for(var i=0;i<this.lrcTime.length;i++){
            if(this.now_time == this.lrcTime[i]){
                this.bdnum = this.lrcTime[i]
                // console.log(box);
                if(i>=8){
                   document.getElementById('lyric').scrollTop = ((i-7)*30)
                }
            }
            if(this.now_time == this.maxTime){
                  document.getElementById('lyric').scrollTop = 0
            }
        }
        if(!muisc.paused){
            this.rotate += 1;
            document.getElementById('xz').style.transform = 'rotate('+this.rotate+'deg)'
            document.getElementById('xz').style.transition = '0.1s liner'
        }
        },50)
      },200)
  },
};
</script>

<style scoped>
.songDetail {
  width: 100%;
  height: 93%;
  position: relative;
  box-sizing: border-box;
  z-index: 1;
  overflow: hidden;
}
.songDetail::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: brightness(8%);
  z-index: 10;
}
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
}

.jdt_1 {
  width: 100%;
  height: 8px;
  border-radius: 10px;
  background-color: #ccc;
  margin-top: 10px;
  /* overflow: hidden; */
}
.jdt_color {
  height: 8px;
  width: 0;
  border-radius: 10px;
  pointer-events: none;
  background-color: #49bdbd;
  position: relative;
  /* transition: all 1.5s; */
}
.jdt_color .yuan {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: absolute;
  top: -4px;
  left: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 8px #DDd;
}
.icon_sx{
  position: relative;
}
.sx{
  position: absolute;
  top: -120px;
  left: 7px;
  width: 4px;
  height: 110px;
  border-radius: 5px;
  background-color: #ccc;
  display: none;
}
.sx_color{
  height: 0;
  width: 4px;
  border-radius: 5px;
  pointer-events: none;
  background-color: #49bdbd;
  position: relative;
}
.dian{
  position: absolute;
  top: 100px;
  left: -4px;
  width: 12px;
  height: 10px;
  /* border-radius: 6px; */
  background-color: rgb(146, 143, 143);
  box-shadow: 0 0 8px rgb(156, 155, 155);
}
.icon_sx:hover .sx{
  display: block
}
.icon_sx:hover{
  color: aliceblue;
}
.cover {
  float: left;
  width: 400px;
  height: 400px;
  background: rgb(0, 0, 0);
  border-radius: 50%;
  margin-top: 100px;
  box-shadow: 0 0 50px rgb(49, 48, 48);
}
.cover img {
  width: 250px;
  height: 250px;
  margin: 75px;
  border-radius: 50%;
}
.title {
  margin-top: 100px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  text-align: center;
}
.singer {
  width: 100%;
  margin-top: 30px;
  color: rgb(138, 140, 141);
 text-align: center;
}
.singer a {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  margin-right: 20px;
}
.lyric {
  height: 500px;
  margin-top: 50px;
  /* overflow: hidden; */
  overflow-y: scroll;
  color: rgba(138, 140, 141,0.6);
  line-height: 30px;
  text-align: center;
  letter-spacing: 1px;
  overflow-y: hidden;
}

.lyric li{
  transition: all 1s ;
}
.lyric:hover{
  overflow-y: scroll;
}
.choose{
  line-height: 50px;
  color: #49bdbd;
  font-size: 20px;
}
.vid {
  width: 100%;
  height: 75px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(29, 30, 31, 0.4);
}
.box span{
  float: right;
  color: #a8a4a4;
  font-size: 10px;
}
.btns {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btns span {
  color: rgba(255, 255, 255, 0.8);
}
.icon {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 20px;
}
#icon {
  width: 50px;
  height: 100%;
  margin: 10px 10px 10px;
}
.imgBox {
  width: 60px;
  height: 60px;
  margin-left: 30px;
  margin-top: 5%;
}
.imgBox img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}
.box {
  color: rgb(212, 212, 212);
  margin-top: 20px;
}
.rigth {
  margin-top: 30px;
  margin-left: 30px;
}
.icon-1 {
  width: 50px;
  height: 50px;
  font-size: 20px;
  color: rgba(166, 167, 168, 0.8);
}

</style>