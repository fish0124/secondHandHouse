document.write("<script language='javascript' src='js/CITIES.js' charset='utf-8'></script>");

// 轮播
$(function() {
	$('.carousel').carousel();
});

// 导航栏点击 样式变化
// 排他思想
$(function() {
	paiTa($("#header .navbar-nav > li"),'active');
});

// 导航栏 位置切换
$(function() {
	// 点击之后 显示  确定之后  消失
	$("#header .select-city").on("click",function(event) {
		$("#header .select-lis").toggleClass("hiddenlis");
	});
	//  阻止事件冒泡兼容写法
	$("#header .select-lis").on("click",function(event) {
		var event = event || window.event;
		if(event && event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	});
	// 点击其他部分  消失
	$(document).on("click",function() {
		$("#header .select-lis").addClass("hiddenlis");
	});

	// 刚进入首页 初始化 “新乡市” 的area(下拉列表中 二手房分类选择项中)
	var cityNow = $("#header .city-now").html();
	$.each(CITIES,function() {
		if(this.name == "河南省") {
			var thatCity = this.city;
			$.each(thatCity,function() {
				if(this.name == cityNow) {
					var that = this;
					$.each(that.area,function(i,value) {
						// 下拉列表中
						var $areas = $("<option>"+ that.area[i] +"</option>");
						$("#main_ad .searchForm .filter .area-select").append($areas);
						// 二手房分类选择项中
						var $areasLis = $("<a href='#'>"+ that.area[i] +"</a>");
						$("#select-box .select-type-region").append($areasLis);
					});
				}
			});
		}
	});

	// 用户选择之后 位置的内容变化 轮播图上的"区域"下拉列表内容发生变化
	$("#header #city").on("change",function() {
		// console.log($("#city option:selected").text());
		// 导航栏的位置变化
		$("#header .city-now").html($("#city option:selected").text());
		$("#header .select-lis").addClass("hiddenlis");
		// 轮播图上的"区域"下拉列表内容发生变化
		// 先获取选中的省
		var $selectP = $("#province option:selected").text();
		// 先获取选中的市
		var $selectC = $("#city option:selected").text();
		// 清空原有的city数据
		$("#main_ad .searchForm .filter .area-select").empty();
		$("#select-box .select-type-region").empty();
		// 遍历数组 市的值 = $selectC时 遍历对应的area 将所具有的区域列表 并插入
		$.each(CITIES,function() {
			if(this.name == $selectP) {
				var thatCity = this.city;
				$.each(thatCity,function() {
					if(this.name == $selectC) {
						var that = this;
						var $fir = $("<option value='all'>区域(不限)</option>");
						$("#main_ad .searchForm .filter .area-select").append($fir);
						var $firli = $("<span class='nav-type-title'>按服务区域: </span><a href='#' class='curr'>不限</a>");
						$("#select-box .select-type-region").append($firli);
						$.each(that.area,function(i,value) {
							// 下拉列表
							var $areas = $("<option>"+ that.area[i] +"</option>");
							$("#main_ad .searchForm .filter .area-select").append($areas);
							// 二手房分类选择项中
							var $areasLis = $("<a href='#'>"+ that.area[i] +"</a>");
							$("#select-box .select-type-region").append($areasLis);
						});
					}
				});
			}
		});
	});
	// -----select改变之后  将用户的选择传入后台  根据数据库 将对应的二手房信息显示到页面中-----

	// 下拉列表的初始化
	// 初始化省的内容
	$.each(CITIES,function(indexPro,valueCities) {
		var $pros = $("<option>"+ CITIES[indexPro].name +"</option>");
		$("#province").append($pros);
	});
	// 当省的数据发生变化的时候 加载城市的数据
	$("#province").on("change",function() {
		// 先获取选中的省
		var $select = $("#province option:selected").text();
		// console.log($select);
		// 清空原有的city数据
		$("#city").empty();
		// 遍历数组 省的值 = $select时 遍历对应的city 将所具有的城市列表 并插入
		$.each(CITIES,function() {
			if(this.name == $select) {
				var that = this;
				var $please = $("<option>请选择</option>");
				$("#city").append($please);
				$.each(that.city,function(i,value) {
					var $cities = $("<option>"+ that.city[i].name +"</option>");
					$("#city").append($cities);
				});
			}
		});
	});
	// 省被选择后 立马加载城市信息
	$("#province").triggerHandler("change");
});


// 二手房页面 分类选择项部分 样式变化
// 排他思想
$(function() {
	// 为动态添加的元素绑定事件
	$("#select-box .select-type-region").on("click","a",function(event) {
		$("#select-box .select-type-region a").removeClass('curr');
		$(this).addClass('curr');
	});
	paiTa($("#select-box .select-type-price a"),'curr');
	paiTa($("#select-box .select-type-room a"),'curr');
	paiTa($("#select-box .select-type-age a"),'curr');
});

// 默认排序部分 样式变化
// 排他思想
$(function() {
	paiTa($("#content .content_rank > div"),'current');
});

// 点击查询结果列表 跳转详情页
$(function() {
	$('#content .result > ul > li').click(function() {
		window.location.href="house_details.html";
	});
});

// 排他思想封装
function paiTa(selector,className) {
	selector.on("click",function(event) {
		selector.removeClass(className);
		$(this).addClass(className);
	});
}

// 侧边栏部分
$(function() {
	var $scroTop = 0,
		$sideBar = $("#sideBar");
	$(window).scroll(function(event) {
		$scroTop = $(document).scrollTop();
		$scroTop > 0 ? $sideBar.fadeIn(400) : $sideBar.fadeOut(400);
	});
});

// “您的建议”部分
$(function() {
	var $textarea = $("#adviceModal .advice-txt textarea"),
	$num = $("#adviceModal .num-tips i");
	$textarea.on('keyup',function(){
		var adviceTxt = $textarea.val();
    	// console.log(100 - len.length);
    	$num.text(100-adviceTxt.length);
    	if(adviceTxt.length >= 100){
    		$num.text(0);
    		$textarea.val(adviceTxt.substring(0,100));
    	}
	});
});
// 回到顶部
$(function() {
	$("#sideBar .goBack").click(function() {
      $("html,body").animate({scrollTop:0}, 500);
  });
});
