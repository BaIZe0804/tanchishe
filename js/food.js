function Food(gameSnake) {
  //直接 this 指的是 window  所以
  var self = this;

  // alert("食物")
  // 20 - 1 食物的位置
  // 20-2 减去出现在蛇身上的概率 do{}while() -->先创建在判断
  do {
    this.row = parseInt(Math.random() * gameSnake.row);
    this.col = parseInt(Math.random() * gameSnake.col);
    console.log(this.row, this.col);
  } while (
    (function () {
      // 立即执行函数作用: 遍历蛇的 row 和 col 与 食物新随机的 row 和 col 进行判断，是否重合
      // gameSnake.snake.body.length 指的是 蛇本身 this.body
      for (var i = 0; i < gameSnake.snake.body.length; i++) {
        if (
          gameSnake.snake.body[i].row == self.row &&
          gameSnake.snake.body[i].col == self.col
        ) {
          return true;
        }
      }
      return false;
      // 20-2-1 返回布尔值 true/false 判断 --> 如果 while 是 true ，死循环，所以为 false 跳出循环。执行 do{}
    })()
  );
}

// 20-1-1 渲染食物位置
Food.prototype.render = function () {
  game.setHTML(this.row, this.col, "♥");
};
