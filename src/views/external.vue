<template>
  <div class="test">
    <h1>名字：{{name}}</h1>
    <p>圖片路徑：{{img}}</p>
    <img :src="img" alt="">
    <button @click='handle'>點擊</button>
  </div>
</template>

<script>
  import { name,img,test } from '/public/js/test.js' 
  export default {
    data() {
      return {
        name,
        img,
      }
    },
    methods: {
      handle() {
        test()
      }
    }
  };
</script>

<style>
  img {
    width: 100%;
    max-width: 500px;
  }
</style>