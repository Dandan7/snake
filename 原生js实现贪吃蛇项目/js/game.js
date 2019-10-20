// 创建自调用函数，避免命名重复
(function(){
    var that;
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function(){
        // 1.把蛇、食物渲染在页面中
        this.food.render(this.map);
        // 测试move方法
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // 2.游戏的逻辑：
        // 2.1让蛇移动起来；
        var btn1 = document.getElementById('btn1');
        btn1.addEventListener('click',function(){
            runSnake();
            // 2.2 当蛇遇到边界，游戏结束
    
            // 2.2通过键盘控制蛇的移动
            // 2.3当蛇遇到食物时，做相应的处理
            bindKey();
        });



    }
    function bindKey() {
        document.addEventListener('keydown',function (e) {
            // console.log(e.keyCode);
            // 37--left
            // 38--top
            // 39--right
            // 40--bottom
            switch(e.keyCode){
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that),false);
        
    }
    function runSnake(){
        var timeId = setInterval(function() {
            // 定时器里面的this指向Windows，此处使用函数的bind方法改变this的指向
            this.snake.move(this.food,this.map);
            this.snake.render(this.map);
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            var maxX = map.offsetWidth/this.snake.width;
            var maxY = map.offsetHeight/this.snake.height;
            if(headX < 0 || headX >= maxX){
                alert("Game over!")
                clearInterval(timeId);
            }
            if(headY < 0 || headY >= maxY){
                alert("Game over!") 
                clearInterval(timeId);
            }
            var btn2 = document.getElementById('btn2');
            btn2.addEventListener('click',function(){
                clearInterval(timeId);
            })
            
        }.bind(that),150);
    }
    // 暴露函数到外部，方便访问
    window.Game = Game;
})()
