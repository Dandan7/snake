// 自调用函数，创建一个新的局部作用域，防止命名重复
(function(){
    var position = "absolute";
    // 创建数组记录原来的蛇
    var elements = [];
    function Snake(options){
        options = options || {};
        // 蛇节的大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        // 蛇的移动方向
        this.direction = options.direction || "right";
        // 蛇身，第一个元素是蛇头，包括坐标和颜色
        this.body = [
            {x:3, y:2, color:"red"},
            {x:2, y:2, color:"blue"},
            {x:1, y:2, color:"blue"}
        ];
    }
    // 渲染
    Snake.prototype.render = function(map){
        // 删除原来的蛇
        remove();
        // 把每一个蛇节渲染到地图上

        for(i = 0, len = this.body.length ; i < len; i++ ){
            var object = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            elements.push(div);
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = object.color;
            div.style.position = position;
            div.style.left = object.x*this.width +"px";
            div.style.top = object.y*this.height +"px";
        }
    }
    // 控制蛇的移动
    Snake.prototype.move = function(food,map){
        // 控制蛇身的移动，每个蛇节的位置变为上一个蛇节的
        for(var i = this.body.length-1; i>0; i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        // 控制蛇头的移动
        var head = this.body[0];
        switch(this.direction){
            case "right":
                 head.x +=1;
                 break;
            case "left":
                 head.x -=1;
                 break;
            case "top":
                head.y -= 1;
                break;
            case "bottom":
                head.y += 1;
                break;
        }
        // 判断蛇头是否和食物的坐标重合，
        var headX = head.x*this.width;
        var headY = head.y*this.height;
        if(headX == food.x && headY == food.y){
            // 蛇身增加一节
            var last = this.body[this.body.length-1];
            this.body.push({
                x : last.x,
                y : last.y,
                color : last.color
            })
            // 食物消失，重新渲染食物
            food.render(map);

        }
    }
    function remove(){
        // 遍历删除每一个蛇节
        for(var i = elements.length - 1; i>=0 ; i--){
            // 删除div
           elements[i].parentNode.removeChild(elements[i]);
        //    删除数组里存储的
           elements.splice(i,1) ;
        }
    }
    // 暴露函数到外部，方便访问
    window.Snake = Snake;
})()
