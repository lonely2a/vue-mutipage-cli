<template>
  <div class="home">
    <div class="media">
      <div class="media__body">
        <h3 class="alpha">welcome to use me!</h3>
        <p class="lede">This cli is the best,seriously!</p>
      </div>
      <div class="media__img media__img--large">
        <img src="./assets/images/hi.png">
      </div>
    </div>
  </div>
</template>
<style lang="less" rel='stylesheet/less'>
@import '../../assets/css/reset.css';
.media{
  .media__body{
    .alpha{
      margin: 150px 0 30px 0;
      font-size: 48px;
      font-weight: 400;
    }
    .alpha, .lede {
      font-size: 28px;
      text-align: center;
    }
    overflow: hidden;
  }
  .media__img {
    margin: 20px auto;
    width: 400px;
    height: 300px;
    img{
      width: 100%;
    }
  }
  .media__img--large {
    width: 300px;
    height: 200px;
  }
}

</style>
<script>
import {
  getTestData
} from './apis'
import axios from 'axios'
export default {
  data () {
    return {

    }
  },
  components:{

  },
  created () {

  },
  mounted () {
    axios.get('/mockjsdata/14621/api/comments')
    // .then(res => {
    //   console.log(res);
    // })
    // getTestData()
    // .then (res => {
    //   console.log(res);
    // })
  },
  methods: {

  }
}
</script>
