$(document).ready(function () {
	//返回上一页
	$(".icon-next").click(function(){
		window.history.go(-1)
	})
	$(".icon-right").click(function(){
		window.history.go(-1)
	})
	//轮播图
    var index = 0;
    var t
    function setImg() {
        t = setTimeout(function () {
            animateImg()
        },3000)
    }
    function animateImg (direction) { // 参数方向
        var $part2 = $(".turn>div");
            var $width = $part2.width();
            var $turn = $(".part-1 .turn")
            if (!$turn.is(":animated")) {
                if (direction == 'left') {
                    if (index == 0) {
                        index = $part2.length-1
                    } else {
                        index--
                    }
                } else {
                    if (index == $part2.length-1) {
                        index = 0
                    } else {
                        index++
                    }
                }
                $turn.animate({ 'left': "-" + (index*$width)},300);
            } 
            $(".zero").eq(index).addClass("blue").siblings().removeClass("blue"); 
            setImg()
    }
    setImg()
    //轮播图效果
    var startX,startY,offsetX,offsetY,offsetLeft
    $(".turn1").bind({
        'touchstart': function (e) {
            clearTimeout(t)
            var touchs = e.touches[0]
            startX = touchs.clientX
            startY = touchs.clientY
            offsetLeft = parseInt($(".part-1 .turn").css('left'))
        },
        'touchmove': function (e) {
            //判断左右
            var touchs = e.touches[0]
                offsetX = touchs.clientX - startX
                offsetY = touchs.clientY - startY
            var max = $(this).find('.childImg').width() / 3,
                min = -($(this).find('.childImg').width() * ($(this).find('.childImg').length - 1) + max),
                endVal = offsetLeft + offsetX
            if (endVal > max) {
                endVal = max
            }
            if (endVal < min) {
                endVal = min
            }
            $(".part-1 .turn").css('left', endVal + 'px')
        },
        'touchend': function (e) {
            var direction
            if (offsetX > 0) {
                direction = 'left'
            } else {
                direction = 'right'
            }
            animateImg(direction)
        }
    })
    
  
//  $(".submit").click(function () {
//      $(this).hide();
//      $(".gift").hide();
//      $(".depostied").fadeIn(1000).fadeOut(2000); 
//       
//     var y = setTimeout(function () {
//         $(".gray").hide()
//     },2200)
//  })
// 		window.addEventListener('touchmove', function (e) {
//				if ($(".gray").is(":visible")) {
//					e.preventDefault()
//				}
//		},{passive:false})
 	//底部跳转
    $(".footer ul li").click(function () {
        $(this).addClass("red").siblings().removeClass("red")

    })


//         $.ajax({
//             dataType: 'json',
//             type: 'post',
//             url: 'http://192.168.2.103:3000/data',
//             data: {name: name,password: pasw},
//             success: function (data) {
//                 if(data.code==302) {
//                     console.log(data.message)
//                 } else {
//                     location.href = 'first.html/'
//                 }
//             }
//         })
//     }) 
 })