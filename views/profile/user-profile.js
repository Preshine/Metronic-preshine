//修改头像
function uploadAvatar() {
    var fileInput = document.getElementById('uploadAvatar');
    if (!fileInput.files || fileInput.files.length == 0) {
        console.info('请选择要上传的头像');
        return;
    }
    var formData = new FormData();
    formData.append('avatar', fileInput.files[0]);

    $.ajax({
        url: '',
        type: "POST",
        data: formData,
        async: false,
        cache: false,
        // 告诉jquery不要处理发送的数据
        processData: false,
        // 告诉jquery不要设置content-Type请求头
        contentType: false,
        success: function (res) {
            console.log('success', res);
        },
        error: function (res) {
            console.log('error', res);
        }
    });
}

// 修改密码

function changePwd() {
  $('#changePwd').submit();
}

$(document).ready(function() {
    $("#changePwd").validate({
      rules: {
        current_pwd: {
          required: true,
          minlength: 6
        },
        new_password: {
          required: true,
          minlength: 6
        },
        confirm_pwd: {
          required: true,
          minlength: 6,
          equalTo: "#password"
        }
      },
      messages: {
        current_pwd: {
          required: "请输入当前密码",
          minlength: "密码长度不能小于 6 个字母"
        },
        new_password: {
          required: "请输入新密码",
          minlength: "密码长度不能小于 6 个字母"
        },
        confirm_pwd: {
          required: "请再次输入新密码",
          minlength: "密码长度不能小于 6 个字母",
          equalTo: "两次密码输入不一致"
        }
      }
    });
  });