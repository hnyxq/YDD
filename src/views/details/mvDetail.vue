<template>
  <div class="mvDetail">
          <div class="vdi">
            <video class="vdio" :src="mvDetailList.data.url" controls autoplay="autoplay"></video>
          </div>
  </div>
</template>

<script>
export default {
  name: "mvDetail",
  data() {
    return {
      // MV详情列表
      mvDetailList: {},
    };
  },
  methods: {},
  mounted() {
    //   获取MV详情
    // console.log(this.$route.query.id);
    const id = this.$route.query.id;
    // console.log(id);
    this.$api
      .getMvDetailList({
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        this.mvDetailList = res.data;
      });
  },
};
</script>

<style>
.mvDetail {
  width: 100%;
  height: 93%;
  background: black;
}
.vdi{
  width: 100%;
  height: 100%;
}
.vdio{
  width: 100%;
  height: 100%;
}
</style>