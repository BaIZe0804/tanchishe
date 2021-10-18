function Snake() {
  //15蛇的初始化身体
  this.body = [
    // index 位
    { row: 3, col: 4 },
    { row: 3, col: 3 },
    { row: 3, col: 2 }
  ]
  // 18 信号量，设置不同的运动方向
  this.direction = 'R'
  // 18-2-4 初始化即将改变的方向，目的防止原地放方向移动
  this.willDirection = 'R'
}

// 17蛇的运动
Snake.prototype.update = function () {
  // 18-2-4 初始化即将改变的方向 让当前的 Direction 接受 willDirection
  this.direction = this.willDirection
  // 18-1 蛇的不同方向运动
  // 通过 改变 row 和 col 的值改变方向，重新渲染，
  switch (this.direction) {
    case 'R':
      this.body.unshift({ row: this.body[0].row, col: this.body[0].col + 1 })
      break
    case 'D':
      this.body.unshift({ row: this.body[0].row + 1, col: this.body[0].col })
      break
    case 'L':
      this.body.unshift({ row: this.body[0].row, col: this.body[0].col - 1 })
      break
    case 'U':
      this.body.unshift({ row: this.body[0].row - 1, col: this.body[0].col })
      break

    // 17-1 头增尾删 --> 保持初始蛇长度
    // 17-1-1 蛇只会增加头部，尾部不会删除，因为只是给头部setColor ，尾部没有清除color
    // this.body.pop();
    // this.body.unshift({ row: this.body[0].row, col: this.body[0].col + 1 });
    // console.log(this.body);
  }
  // 19 蛇的死亡判定
  if (this.body[0].col + 1 > game.col || this.body[0].row + 1 > game.row || this.body[0].col < 0 || this.body[0].row < 0) {
    clearInterval(game.timer)
    // this.body.shift();
    alert('Game Over！！！')
  }

  // 19-1  自己撞到自己
  for (var i = 1; i < this.body.length; i++) {
    if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row) {
      alert('Game Over  ')
      // this.body.shift();
      clearInterval(game.timer)
    }
  }
  // 20-2 蛇吃食物
  if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
    // alert("!!!");
    // 蛇变长 --> 尾部不删，头增加
    game.food = new Food(game)
    // 吃到食物
    game.score++
    // 21-1-2 让帧编号为 0，因为蛇会窜一下
    game.f = 0
  } else {
    this.body.pop()
  }
}

// 18-2-4 解决、
Snake.prototype.changeDirection = function (d) {
  this.willDirection = d
}

Snake.prototype.render = function () {
  // console.log(game);

  //16 蛇的渲染
  // 16-1蛇头
  game.setColor(this.body[0].row, this.body[0].col, 'pink')
  //16-2 身子
  for (var i = 1; i < this.body.length; i++) {
    game.setColor(this.body[i].row, this.body[i].col, 'cyan')
  }
}
