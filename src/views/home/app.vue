<template>
  <div class="home">
    <div class="home_welcome">
      <p>{{welcome}}</p>
      <img class="welcome_pic" src="./assets/images/pic.png" alt="">
    </div>
  </div>
</template>
<style lang="less" rel='stylesheet/less'>
@import '../../assets/css/reset.css';
.welcome_pic{
  width: 500px;
  height: 400px;
}
</style>
<script>
export default {
  data () {
    return {
      welcome: 'hello, Home Page!'
    }
  },
  components:{

  },
  created () {

  },
  methods: {

  }
}
</script>
