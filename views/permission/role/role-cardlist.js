function cardList(props) {
    var data = props.data;
    var actions = props.actions;
    var target = props.target;

    var html = '<div style="display: flex;flex-wrap: wrap;">';

    data.forEach((d, di) => {
        var str = '<div class="card" style="width:200px;margin: 10px 10px;">'
            + '<img class="card-img-top" src="http://static.runoob.com/images/mix/img_avatar.png" alt="Card image" style="width:100%">'
            + '<div class="card-body">'
            + '<h4 class="card-title">' + d.name + '</h4>'
            + '<p class="card-text">' + d.description + '</p>';

        actions.forEach((action, ai) => {
            str += '<button class="btn btn-primary" id="card_' + di + ai + '">' + action.text + '</button>';
            //这样绑定事件会让后来加入的dom节点也会添加上点击事件
            $(document).on('click', '#card_' + di + ai, function () {
                console.log('action', action);
                action.handler(d);
            });
        })

        str += '</div>'
        str += '</div>'

        html += str;
    });

    html += "</div>";

    $(target).html(html);
}

$(function () {
    $.get('http://127.0.0.1:8082/preshine/api/role/list?PSESSIONID=' + sessionStorage.getItem('p_token'), function (res) {
        console.log(res);
        cardList({
            data: res,
            actions: [{
                text: '编辑',
                handler: function (record) {
                    console.log('edit' + JSON.stringify(record));
                    $('input[name=roleId]').val(record.id);
                    $('input[name=name]').val(record.name);
                    $('#description').val(record.description);
                    $('#addOrEditModal').modal();
                }
            }, {
                text: '分配资源',
                handler: function (record) {
                    console.log('change res' + JSON.stringify(record));
                    $('#authModal').modal();
                }
            }],
            target: '#cardlist'
        })
    })
})

//定义中文消息
var cnmsg = {
    required: '必填字段',
    remote: '请修正该字段',
    email: '请输入正确格式的电子邮件',
    url: '请输入合法的网址',
    date: '请输入合法的日期',
    dateISO: '请输入合法的日期 (ISO).',
    number: '请输入合法的数字',
    digits: '只能输入整数',
    creditcard: '请输入合法的信用卡号',
    equalTo: '请再次输入相同的值',
    accept: '请输入拥有合法后缀名的字符串',
    maxlength: jQuery.validator.format('请输入一个长度最多是 {0} 的字符串'),
    minlength: jQuery.validator.format('请输入一个长度最少是 {0} 的字符串'),
    rangelength: jQuery.validator.format('请输入一个长度介于 {0} 和 {1} 之间的字符串'),
    range: jQuery.validator.format('请输入一个介于 {0} 和 {1} 之间的值'),
    max: jQuery.validator.format('请输入一个最大为 {0} 的值'),
    min: jQuery.validator.format('请输入一个最小为 {0} 的值')
};

jQuery.extend(jQuery.validator.messages, cnmsg);

var e = $("#resourcesTree"),
    r = $(".alert-danger", e),
    i = $(".alert-success", e);
var validator = e.validate({
    errorElement: "span",
    errorClass: "help-block help-block-error",
    focusInvalid: !1,
    ignore: "",
    rules: {
        name: {
            minlength: 2, required: true
        },
        path: {
            required: true
        },
        resType: {
            required: true
        }
    },
    invalidHandler: function (e, t) {
        i.hide(), r.show();
        // App.scrollTo(r, -200)
    },
    highlight: function (e) {
        $(e).closest(".form-group").addClass("has-error")
    },
    unhighlight: function (e) {
        $(e).closest(".form-group").removeClass("has-error")
    },
    success: function (e) {
        e.closest(".form-group").removeClass("has-error")
    },
    submitHandler: function (e) {
        i.show(), r.hide()
        var formData = {};
        formData.roleId = $('input[name=roleId]').val();
        formData.name = $('input[name=name]').val();
        formData.description = $('#description').val();
        formData.PSESSIONID = sessionStorage.getItem('p_token');
        console.log(formData);
        $('#addOrEditModal').modal('hide');
        $.ajax({
            url: 'http://127.0.0.1:8082/preshine/api/resources/addOrEdit1',
            type: 'post',
            data: formData,
            // contentType: 'application/json; charset=utf-8',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            success: function (res) {
                if (res.success == true) {
                    window.location.reload();
                } else {

                }
            }
        })
    }
})


$(function () {
    $("#tree_2").jstree({
        plugins: ["wholerow", "checkbox", "types"],
        core: {
            themes: { responsive: !1 },
            data: function (obj, callback) {
                $.get('http://127.0.0.1:8082/preshine/api/role/getResTreeList1', function (data) {
                    callback.call(this, data);
                }, 'json');
            },
        },
        checkbox: {
            three_state: false
        },
        types: {
            "default": { icon: "fa fa-folder icon-state-warning icon-lg" },
            file: { icon: "fa fa-file icon-state-warning icon-lg" }
        }
    })
})

function getCheckedRes() {
    var ref = $('#tree_2').jstree(true);
    var arr = ref.get_checked(true);
    //设置不级联父子节点操作了 这里不用加上undetermined状态的节点
    // arr = arr.concat(ref.get_undetermined(true));
    return arr;
}

function showAdd() {
    validator.resetForm();
    i.hide(), r.hide()
    $('input[name=roleId]').val('');
    $('input[name=name]').val('');
    $('#description').val('');
}