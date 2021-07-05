<template>

  <div class="container">
    <h1 class="text-center">遊戲時間：{{time}}秒</h1>
    <div class="color_block" :class="{'active' : color_block}">
      <button class="btn btn-success" @click="begin()">遊戲開始</button>
    </div>
    <div class="row" style="width: 540px;">
      <div v-for="(item, index) in anser" :key="index" @click="checkIsSame(item, index)" :class="{'flop' : item.open}"
        class="item">
        <h1>{{ item.val }}</h1>
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

    },
    data: () => ({
      selected: [],
      anser: [],
      doneCount: 0,
      color_block: false,
      timer: null,
      time: 30,
      memory: 3,
    }),
    methods: {
      checkIsSame(item, index) {

        // 要是選擇到的號碼是-1就跳出不動作，以及同個牌也不動作
        if (this.selected[0] === index || this.selected.length === 2) {
          console.log('drop');
          return;
        }
        item.open = true;

        // 將選擇的數字丟到選擇容器中
        this.selected.push(index);

        // 判斷是否選擇了兩個
        if (this.selected.length === 2) {
          // 判斷選擇的是否相同，相同的話就將該卡片上的欄位改為-1
          setTimeout(() => {
            if (this.anser[this.selected[0]].val !== this.anser[this.selected[1]].val) {
              this.anser[this.selected[0]].open = false;
              this.anser[this.selected[1]].open = false;
            } else {
              this.doneCount++;
              console.log(this.doneCount);
            }

            if (this.doneCount === this.anser.length / 2) {
              this.color_block = true;
              alert('過關~');
            }

            // 選擇兩個後要清空選擇容器
            this.selected = [];
            //翻牌後多久才能有下一個動作
            //預防使用者連點
          }, 0.5 * 1000);
        }
      },

      //一開始會給玩家看牌的位置
      isFlop() {
        setTimeout(() => {
          this.anser.forEach((data, index) => {
            this.anser[index].open = false;
          });
        }, this.memory * 1000);
      },

      // 洗牌
      shuffle() {
        let tmp = [
          1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6
        ];

        this.anser = tmp.map((data) => ({
          val: data,
          open: true,
        }));

        this.doneCount = [];

        let i, j, temp;
        for (i = this.anser.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          temp = this.anser[i];
          this.anser[i] = this.anser[j];
          this.anser[j] = temp;
        }

        console.log(this.anser.map(data => data.val));

        this.isFlop();

      },

      //倒數計時器
      countdown() {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.timer)
          alert('時間到!')
          if (this.doneCount === this.anser.length / 2) {
            this.color_block = true;
            alert('過關~');
          }
        }
      },

      //開始
      begin() {
        this.shuffle();
        this.color_block = true;
        this.isFlop();
        this.timer = setInterval(this.countdown, 1000);
      }
    },
  };

</script>

<style>
  .container {
    position: relative;
  }

  .color_block {
    background-color: rgba(40, 167, 69, 1);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .color_block.active {
    display: none;
  }

  .color_block button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    border: 1px solid;
    border-radius: 0;
    width: 180px;
    height: 60px;
    font-size: 24px;
  }

  .color_block button:hover {
    background-color: #fff;
    color: #28a745;
  }

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
    cursor: pointer;
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

  .item.active,
  .item.flop {
    transform: rotateY(0);
    cursor: auto;
  }

  .item.active::after,
  .item.flop::after {
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

  button {
    margin-top: 50px;
  }

</style>
