// 点击左侧li 切换内容
$(function() {
	// 点击左侧li 对应li样式变化
	paiTa($("#left-side li"),"active");
	// 点击左侧li 对应右侧内容 显示
	clickShow($("#left-side li"),$("#right-side > div"),"active");
	// 点击左侧li 对应红色竖线 显示
	clickShow($("#left-side li"),$("#border .line"),"active");
});

// 排他思想封装
function paiTa(selector,className) {
	selector.on("click",function(event) {
		selector.removeClass(className);
		$(this).addClass(className);
	});
}

// 封装 点击左侧标题 对应的内容显示
function clickShow(selector,target,className) {
	var i;
	selector.on("click",function() {
		// 点击ul中的某个li，返回该li在ul中的索引值 赋值给i
		// console.log(selector);
		i = selector.index(this);
		// console.log(i);
		// 根据i的值 找到右侧对应的内容 进行显示
		// console.log(target);
		target.removeClass(className);
		target.eq(i).addClass(className);
	});
}

// 修改基本信息部分
$(function() {
	// 修改手机号
	$("#right-side #fourth .selfile .tel a").click(function () {
		var that = $(this);
		// 获取对应的值所在的标签
		var telEle = $(this).parent().find(".value");
		// console.log(telEle);
		// 获取对应的值
		var txt = $.trim(telEle.text());
		// console.log(txt);
		var input = $("<input type='text' value='" + txt + "'/>");
		telEle.html(input);
		input.click(function() { return false; });
		//获取焦点
		input.trigger("focus");
		
		// 验证手机号
		// 获取父元素li
		var $parentLi = $(this).parent("li");
		//文本框失去焦点后提交内容，重新变为文本
		input.blur(function () {
			var newtxt = input.val();
			var reg = /^1[0-9]{10}$/;
			if( newtxt == "" || !reg.test(newtxt)) {
				$parentLi.find(".formtips").remove();
        		var errorMsg = 'X 请输入正确的手机号码.';
				// 在“修改”按钮之前插入验证提示
				$('<span class="formtips">'+errorMsg+'</span>').insertBefore(that);
				telEle.html(txt);
			}else{
				$parentLi.find(".formtips").remove();
				//判断文本有没有修改
				if (newtxt != txt) {
					telEle.html(newtxt);
				}
			}
		});
	});

	// 修改性别
	$("#right-side #fourth .selfile .sex a").click(function () {
		// 获取对应的值所在的标签
		var sexEle = $(this).parent().find(".value");
		// console.log(sexEle);
		// 获取对应的值
		var txt = $.trim(sexEle.text());
		sexEle.html("<input name='sex' type='radio' value='女士' />女士 <input name='sex' type='radio' value='先生' />先生 <input type='submit' value='submit'  id='btnSubmit' />");
		var input = $(this).parent().find("input");
		// console.log(input);
		// 点击提交后 提交内容，重新变为文本
		input.eq(2).on("click",function() {
			var newtxt = $('input:radio[name="sex"]:checked').val();
			// console.log(newtxt);
			// 如果没有选中任何单选框
			if(newtxt == null) {
				sexEle.html("暂无提供");
			}else{ // 如果选中了 渲染
				sexEle.html(newtxt);
			}
		});
	});

	// 修改头像
	// 获取img标签
	var picEle = $("#right-side #fourth .selfile .pic img");
	// 获取src属性对应的值
	var txt = $.trim(picEle.attr("src"));
	
	var options =
	{
		thumbBox: '.thumbBox',
		spinner: '.spinner',
		imgSrc: 'img/userPic01.jpg'
	};
	var cropper = $('.imageBox').cropbox(options);
	$('#upload-file').on('change', function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			console.log(options.imgSrc);
			cropper = $('.imageBox').cropbox(options);
		}
		reader.readAsDataURL(this.files[0]);
		// this.files = [];
		// 点击提交之后 修改src属性
		$("#update-img .modal-footer button").eq(1).on('click', function(event) {
			event.preventDefault();
	// 		if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(newtxt)){
	// 			alert("请上传jpg或png格式的图片！");
	// 			return false;
	// 		}else{}
		});
	});
	$('#btnCrop').on('click', function(){
		var img = cropper.getDataURL();
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
	});
	$('#btnZoomIn').on('click', function(){
		cropper.zoomIn();
	});
	$('#btnZoomOut').on('click', function(){
		cropper.zoomOut();
	});

	// 修改密码
	// console.log($("#update-pwd .modal-footer button").eq(0));
	$("#update-img .modal-footer button").eq(0).on('click', function(event) {
		event.preventDefault();

	});
});

// 点击“系统信息-我的提议” 显示弹出框
$(function() {
	$('#right-side .hasContent .advice').on("click",function() {
		$(this).popover('show');
	});
});

// 收藏部分
$(function() {
	// 点击“取消收藏”,对应的li删除
	$("#right-side #fifth .cancel i").on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).parents("li").eq(0).remove();
		// 如果li依次全被删除 显示noContent状态
		if($("#right-side #fifth .hasContent ul").children('li').length == 0) {
			$("#right-side #fifth .hasContent").hide();
			$("#right-side #fifth .noContent").removeClass('hide');
		}
	});
});

// 浏览记录部分
$(function() {
	// 点击“删除记录”,对应的li删除
	$("#right-side #sixth .hasContent .delete").on('click', function() {
		$(this).parent("li").remove();
		// 如果li依次全被删除 显示noContent状态
		if($("#right-side #sixth .hasContent ul").children('li').length == 0) {
			$("#right-side #sixth .hasContent").hide();
			$("#right-side #sixth .noContent").removeClass('hide');
		}
	});
	// 点击“清空所有浏览记录”,所有删除,显示noContent状态
	$("#right-side #sixth .hasContent .deleteAll").on('click', function() {
		$("#right-side #sixth .hasContent").hide();
		$("#right-side #sixth .noContent").removeClass('hide');
	});
});

// 根据url后的锚点值 显示对应的内容
$(function() {
	// 获取URL后面锚点的id值
 	var idTxt = window.location.hash;
	console.log(idTxt);
	// 浏览记录
  	if (idTxt == "#sixth") {
  		// 左侧的li样式变化
    	$("#left-side li.see").addClass('active');
  		$("#left-side li.see").siblings().removeClass('active');
  		// 中间的border随之变化
  		$("#border .six").addClass('active');
  		$("#border .six").siblings().removeClass('active');
  		// 右侧内容显示
  		$("#right-side > div#sixth").addClass('active');
  		$("#right-side > div#sixth").siblings().removeClass('active');
  	// 您的收藏
  	} else if (idTxt == "#fifth") {
  		// 左侧的li样式变化
    	$("#left-side li.like").addClass('active');
  		$("#left-side li.like").siblings().removeClass('active');
  		// 中间的border随之变化
  		$("#border .five").addClass('active');
  		$("#border .five").siblings().removeClass('active');
  		// 右侧内容显示
  		$("#right-side > div#fifth").addClass('active');
  		$("#right-side > div#fifth").siblings().removeClass('active');
  	}
});
