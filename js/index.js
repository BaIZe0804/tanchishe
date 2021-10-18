//中介类 --> 中转站

function Game() {
  // 1先创建表格，行数，列数
  //2行数
  this.row = 33.0;
  //3列数
  this.col = 70;
  //4初始化节点
  this.init();
  //5实例化蛇类
  this.snake = new Snake();
  // 6把蛇的实例绑定到Game 的属性上,按照原型链就可以找
  // 20 食物引入 --> 传入this
  this.food = new Food(this);
  // 1-1执行定时器任务
  this.start();
  // 18-2-1键盘的事件监听
  this.bindEvent();
  // 22 渲染分数
  this.score = 0;
}

Game.prototype.init = function () {
  this.dom = document.createElement("table");
  //7编列行列
  var tr, td;
  //8节点上树
  for (var i = 0; i < this.row; i++) {
    //9遍历行列，节点上树
    tr = document.createElement("tr");
    for (j = 0; j < this.col; j++) {
      td = document.createElement("td");
      //10追加到每个tr上
      tr.appendChild(td);
    }
    //11追加节点上树
    this.dom.appendChild(tr);
  }
  //12表格上树
  document.getElementById("app").appendChild(this.dom);
};

// 18 清除颜色 --> 让整个视图进行重绘
Game.prototype.clearColor = function () {
  // 18-1 遍历表格，擦除画布
  for (var i = 0; i < this.row; i++) {
    for (var j = 0; j < this.col; j++) {
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[
        j
      ].style.backgroundColor = "white";
      this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[
        j
      ].innerHTML = "";
    }
  }
};

// 13渲染颜色方法
Game.prototype.setColor = function (row, col, color) {
  // 14让表格的第几行和第几列设置什么颜色
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[
    col
  ].style.backgroundColor = color;
};

// 18 - 2  设置键盘的事件监听
Game.prototype.bindEvent = function () {
  var self = this;
  // 18-2-1 键盘事件
  document.onkeydown = function (event) {
    // 18-2-2 按键控制方向
    switch (event.keyCode) {
      //按键
      //  18-2-3 判断蛇的运动方向，按键的方向不能同蛇运动的方向相反
      case 37:
        // 事件监听 this 不指向 event
        if (self.snake.direction == "R") {
          return;
        }
        self.snake.changeDirection("L");
        break;
      case 38:
        if (self.snake.direction == "D") {
          return;
        }
        self.snake.changeDirection("U");
        break;
      case 39:
        if (self.snake.direction == "L") {
          return;
        }
        self.snake.changeDirection("R");
        break;
      case 40:
        if (self.snake.direction == "U") {
          return;
        }
        self.snake.changeDirection("D");
        break;
    }
    // 18-2-4 bug: 同时按两个方向键还是会向反方向移动
  };
};

// 20-1-1渲染食物
Game.prototype.setHTML = function (row, col, html) {
  this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[
    col
  ].innerHTML = html;
};

// 定时器
Game.prototype.start = function () {
  // 21 帧编号
  this.f = 0;

  var key = true;
  var timer = 0;
  //暂停
  var Stop = (document.getElementById("stop").onclick = function () {
    clearInterval(timer);
    key = true;
  });
  // 开始
  var Start = (document.getElementById("start").onclick = function () {
    if (key) {
      timer = setInterval(function start() {
        game.f++;
        // 渲染帧编号和分数
        document.getElementById("f").innerHTML = "帧编号：" + game.f;
        document.getElementById("score").innerHTML = "分数：" + game.score;
        // new 函数的四步走
        // 清屏，更新，渲染
        // 定时器里面的核心就是游戏的渲染本质 -->  清屏，更新，渲染

        // 18 清屏 --> 蛇运动
        game.clearColor();

        // 17 蛇的运动 --> 更新
        //  21-1 蛇的更新速度，当蛇边长，蛇的更新速度变快
        var during =
          game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;

        game.f % during == 0 && game.snake.update();

        // 16 渲染蛇 --> 渲染
        game.snake.render();
        //20-1-1-1 渲染食物
        game.food.render();
      }, 20);
      key = false;
    }
  });
};
