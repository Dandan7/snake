// 创建自调用函数（其实好像就是立即执行函数），避免命名冲突
(function () {
    var position = "absolute";
    var elements = [];
    // 创建食物对象
    function Food(options){
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || "green";
        console.log(options.x);
    }
    // 食物 渲染
    Food.prototype.render = function(map){
        // 删除之前创建的食物
        remove();
        // 创建新的食物
        this.x = (Tools.getRandom(1, map.offsetWidth/this.width)-1)*this.width;
        this.y = (Tools.getRandom(1, map.offsetHeight/this.height)-1)*this.height;
        var div = document.createElement("div");
        map.appendChild(div);
        elements.push(div);
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = position;
    }
    function remove() {
        for(i = elements.length-1 ; i >= 0 ; i--){
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            // 删除element数组里的元素
            // 第一个参数表示从第几个元素开始删起，第二个参数表示删除几个元素
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})()