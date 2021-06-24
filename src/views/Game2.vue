<template>
  <div class="Game2">
    <div class="item" :class="{ active: active }" @click="active = !active">
      <div class="positive ">
        <img src="https://images.pexels.com/photos/40984/animal-ara-macao-beak-bird-40984.jpeg" alt="img">
      </div>
      <div class="negative">
        <img src="https://images.pexels.com/photos/6272256/pexels-photo-6272256.jpeg" alt="img">
      </div>
    </div>

    <div class="item" :class="{ active: active }" @click="active = !active">
      <div class="positive ">
        <img src="https://images.pexels.com/photos/40984/animal-ara-macao-beak-bird-40984.jpeg" alt="img">
      </div>
      <div class="negative">
        <img src="https://images.pexels.com/photos/6272256/pexels-photo-6272256.jpeg" alt="img">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        active:false,
      }
    },
    mounted() {

    },
    methods: {
      select(){

      }
    },
  };
</script>

<style scoped>
  .Game2{
    display: flex;
    flex-wrap: wrap;
    margin-left: -7.5px;
    margin-right: -7.5px;
  }
  .item{
    width: 120px;
    height: 170px;
    border: 10px seagreen solid;
    border-radius: 15px;
    margin-left: 7.5px;
    margin-right: 7.5px;
    position: relative;
    transition: 0.6s;
    overflow: hidden;
    cursor: pointer;
  }
  .item.active{
    transform: rotateY(180deg);
    cursor: auto;
  }
  .item .positive img,.item .negative img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.6s;
  }

  .item .positive,.item .negative{
    transition: 0.6s;
    position: absolute;
    left: 0;
    top: 0;
  }

  .item .positive{
    transform: rotateY(180deg);
  }
  .item.active .positive{
    z-index: 1;
  }
</style>