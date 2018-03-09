// 根据传入的数据 显示对应的模块
$(function() {
  showRegister();
  var logOrReg = getSearchString("id");
  if (logOrReg == "login") {
    showLogin();
  } else if (logOrReg == "register") {
    showRegister();
  }
});

// 获取查询字符串
function getSearchString(key) {
  // 获取URL中?之后的字符
  var str = location.search;
  str = str.substring(1, str.length);

  // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
  var arr = str.split("&");
  var obj = new Object();

  // 将每一个数组元素以=分隔并赋给obj对象
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj[key];
}

// 登录和注册
function showLogin() //点击顶部导航栏登录按钮，让选项卡先出现登录
{
  var login_id = document.getElementById("login-register");
  if (login_id.style.display == 'block')
    login_id.style.display = "none";
  setLoginActive(); //选项卡出现登录页面
  login_id.style.display = 'block';
}

function showRegister() //点击顶部导航栏注册按钮，让选项卡先出现注册
{
  var register_id = document.getElementById("login-register");
  if (register_id.style.display == 'block')
    register_id.style.display = "none";
  setRegisterActive(); //选项卡出现注册页面
  register_id.style.display = 'block';
}

function setLoginActive() //在选项卡内部自由切换
{
  var div_lo = document.getElementById("tab-login");
  var li_lo = document.getElementById("li-login");
  var div_re = document.getElementById("tab-register");
  var li_re = document.getElementById("li-register");
  div_re.className = ""; //移除注册框的active，同时移除了该div的所有类
  li_re.className = "";
  div_re.className = "tab-pane"; //不能去掉该类，如果去掉则不能切换
  div_lo.className = "active";
  li_lo.className = "active";

}

function setRegisterActive() {
  var div_lo = document.getElementById("tab-login");
  var li_lo = document.getElementById("li-login");
  var div_re = document.getElementById("tab-register");
  var li_re = document.getElementById("li-register");
  div_lo.className = "";
  li_lo.className = "";
  div_lo.className = "tab-pane";
  div_re.className = "active";
  li_re.className = "active";
}

function closeTab() //关闭选项卡
{
  var tab = document.getElementById("login-register");
  tab.style.display = "none";
}

// 表单验证
$(function() {
  //文本框失去焦点后
  $('#tab-register form input').blur(function(){
    var $parent = $(this).parents(".form-group");
    $parent.find(".formtips").remove();
    // 验证正确的结果
    var okMsg = "<i class='glyphicon glyphicon-ok-sign'></i>";
    
    //验证用户名
    if( $(this).is('#userName') ){
      // 移除字符串两侧的空白字符
      var nameVal = $.trim(this.value);
      if( nameVal=="" || nameVal.length < 2 ){
        var errorMsg = '请输入至少2位的用户名.';
        $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
      }else{
        $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>');
      }
    }

    // 验证手机号
    if( $(this).is('#tel') ){
      var telVal = $.trim(this.value);
      var reg = /^1[0-9]{10}$/;
      if( telVal=="" || telVal.length !="" && !reg.test(telVal)) {
        var errorMsg = '请输入正确的手机号码.';
        $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
      }else{
        $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>');
      }
    }

    // 验证密码
    if( $(this).is('#password') ){
      var passwordVal = $.trim(this.value);
      var reg = /^[0-9A-Za-z]{6,}$/;
      if( passwordVal=="" || passwordVal.length !="" && !reg.test(passwordVal)) {
        var errorMsg = '请输入符合条件的密码.';
        $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
      }else{
        $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>');
      }
    }

    // 验证两次密码是否一致
    if( $(this).is('#confirmPassword')){
      var pwdVal = $("#tab-register #password").val();
      var cPwdVal = $(this).val();
      if( cPwdVal=="" || cPwdVal != pwdVal) {
        var errorMsg = '两次密码不一致！';
        $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
      }else{
        $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>');
      }
    }
  }).keyup(function(){
    $(this).triggerHandler("blur");
  }).focus(function(){
    $(this).triggerHandler("blur");
  });
  
  //提交，最终验证。
  $('#send').click(function(){
    $("#tab-register form input.required").trigger('blur');
    var numError = $('form .onError').length;
    if(numError){
      return false;
    }
    alert("注册成功.");
  });
  
  //重置
  $('#res').click(function(e){
    $(".formtips").remove();
  });
});
