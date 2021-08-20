<template>
  <div class="login">
    <el-form
      label-position="top"
      label-width="80px"
      :model="formLogin"
      class="content"
    >
    <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formLogin.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLogin.password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%" @click="loginHandle">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
        formLogin:{phone:'',password:''}
    };
  },
  methods: {
      loginHandle(){
          // 登录验证
          this.$api.getLogin({phone: this.formLogin.phone,password: this.formLogin.password})
          .then(res =>{
              console.log(res.data);
              // 用户信息正确
              if(res.data.code === 200){
                // 显示用户头像及信息
                this.$store.commit('setIsLogin',{
                  bool: true
                })
                // 菜单切换
                this.$store.state.activeIndex = '/myMuisc'
                // 提示信息
                this.$message.success('登录成功');
                // 本地储存
                localStorage["userId"] = res.data.account.id;
                localStorage["token"] = res.data.token;
                localStorage["img"] = res.data.profile.avatarUrl;
                // store储存
                this.$store.commit('setUserInfo', {
                    userId:res.data.account.id,
                    token:res.data.token,
                    img:res.data.profile.avatarUrl
                })
                // console.log(this.$store.state.userInfo);
                // 跳转页面
                this.$router.replace({ path:'/myMuisc'},function(){
                  location.reload();
                });
              }else{
                this.$message.error('用户名或密码错误');
              }
          })
          .catch(error=>{
              console.log(error);
          })
      }
  },
  mounted() {

  },
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content h2{
    font-size: 25px;
    margin-bottom: 30px;
}
.content{
    width: 400px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
}

</style>