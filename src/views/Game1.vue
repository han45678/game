<template>
  <div class="container">
    <div class="row" style="width: 540px;">
      <div v-for="(item, index) in anser" :key="index" @click="checkIsSame(index)"
        :class="{'active': item === 'pass'}" class="item">
        <h1>{{ item }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-success" @click="shuffle">重新洗牌</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    mounted() {
      this.shuffle();
      // this.flop();
    },
    data: () => ({
      selected: [],
      selectedIndex: -1,
      anser: [],
      active2: true
    }),
    methods: {

      checkIsSame(index) {
        // 要是選擇到的號碼是-1就跳出不動作，以及同個牌也不動作
        if (this.anser[index] === 'pass' || this.selected[0] === index) {
          return;
        }

        // 將選擇的數字丟到選擇容器中
        this.selected.push(index);

        // 紀錄點到的是哪張牌
        this.selectedIndex = index;

        // 判斷是否選擇了兩個
        if (this.selected.length === 2) {
          // 判斷選擇的是否相同，相同的話就將該卡片上的欄位改為-1
          if (this.anser[this.selected[0]] === this.anser[this.selected[1]]) {
            this.anser[this.selected[0]] = 'pass';
            this.anser[this.selected[1]] = 'pass';
            console.log(this.anser);
            // this.anser[index].classList.add("aaa");
          }

          // 選擇兩個後要清空選擇容器
          this.selected = [];
        }
      },
      // 洗牌
      shuffle() {
        this.selected = [];
        this.anser = [
          1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6
        ];
        let i, j, temp;
        for (i = this.anser.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          temp = this.anser[i];
          this.anser[i] = this.anser[j];
          this.anser[j] = temp;
        }
        // this.flop()
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .row {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }

  .item {
    width: 120px;
    height: 150px;
    margin: 7.5px;
    position: relative;
    background-color: #fff;
    border: 5px solid #fff;
    color: #000;
    font-size: 40px;
    border-radius: 10px;
    transition: 0.3s;
    transform: rotateY(-180deg);
    box-shadow: 0px 0px 15px #ccc;
  }

  .item::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(108, 192, 150);
    background-image: url("https://png.pngtree.com/png-clipart/20190904/original/pngtree-plaid-tile-png-image_4471399.jpg");
    background-size: cover;
  }

  .item.active {
    transform: rotateY(0);
  }

  .item.active::after {
    display: none;
  }

  .item h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bg-primary {
    cursor: pointer;
  }

  .bg-danger {
    cursor: auto;
  }
  button{
    margin-top: 100px;
  }
</style>