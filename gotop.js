// 使用jQuery將img插入body中
(function ($) {
    $("body").append("<img id='goTopButton' style='display:none;z-index:5;cursor:pointer;title='回到頂端'/>");
    var img = "./Pictures/XDSCU138lg.jpg",     //宣告變數設定圖檔名稱
        location = 0.5,            //按鈕出現在螢幕的高度
        right = 50,                //距離右邊的PX值
        opacity = 0.7,             //預設透明度
        speed = 1200,               //返回TOP捲動速度
        $button = $("#goTopButton"), //定義JQUERY呼叫圖片ID
        $body = $(document),         //定義JQUERY網頁
        $win = $(window);            //定義JQUERY瀏覽器chrome
    $button.attr("src", img);      //將圖設定到goTopButton的src

    window.goTopMove = function () {     // 建立當網頁捲動時，呼叫自訂函數
        var scrollH = $body.scrollTop(),   //從網頁取得與頂端距離的數值，約為75-165PX之間
            winH = $win.height(),       //從瀏覽器取得高度
            css = { "top": winH * location + "px", position: "fixed", "right": right, "opacity": opacity }; //將參數設定CSS

        if (scrollH > 20) {     // 如果捲動與網頁頂端超過20PX時，則顯示圖片，否則隱藏圖片
            $button.css(css);
            $button.fadeIn("slow");
        }
        else {
            $button.fadeOut("slow");
            css = { "transform": "none", "transition": "none" };//加這句是為了不讓40行效果只執行一次
            $button.css(css);
        }
    };
    //設定瀏覽器監聽兩個動作，分別為scroll與resize
    $win.on({
        scroll: function () { goTopMove(); },
        resize: function () { goTopMove(); }
    });
    //設定瀏覽器監聽圖片三個動作，分別為1滑鼠滑過去與2滑鼠滑出去與3按下
    $button.on({
        mouseover: function () { $button.css("opacity", 1); },
        mouseout: function () { $button.css("opacity", opacity); },

        click: function () {
            css = { "transform": "rotateY(720deg) translateX(-100px)", "transition": "all 1.5s ease 0s" }
            $button.css(css);
            $("html,body").animate({ scrollTop: 0 }, speed);
        }
    });
})(jQuery);