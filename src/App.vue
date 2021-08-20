<template>
  <div id="app">
    <top v-if="this.$route.name !== 'login'"></top>

    <router-view></router-view>

    <bottom
      v-if="
        this.$route.name !== 'songDetail' &&
        this.$route.name !== 'mvDetail' &&
        this.$route.name !== 'login'
      "
    ></bottom>
  </div>
</template>

<script>
import top from "@/components/top.vue";
import bottom from "@/components/bottom.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    top,
    bottom,
  },
  created(){
    this.$store.commit('initUser')
  },
  mounted() {
  },
};
</script>

<style>
@import url("./assets/css/reset.css");
html,
body {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  min-width: 1920px;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
