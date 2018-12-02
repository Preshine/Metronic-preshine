var records = [];

$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:8082/preshine/api/user/getMenuData?PSESSIONID=' + sessionStorage.getItem('p_token'),
        dataType: 'json',
        success: function (data) {
            data = data.obj;

            // 属性配置信息
            var attributes = {
                id: 'id',
                parentId: 'parentId',
            };
            records = JSON.parse(JSON.stringify(data));
            var data = toTreeData(data, attributes);
            var list = [];
            treeToList(data[0], list);
            $.each(list, function (index, obj) {
                var rowCls = index % 2 > 0 ? 'odd' : 'even';
                $("#treeTable tbody").append("<tr class=\"" + rowCls + "\" data-tt-id=\"" + obj.id + "\" data-tt-parent-id=\"" + obj.parentId + "\">"
                    + "<th rowspan=\"1\" colspan=\"1\" >"
                    + '<div class="checker"><span><input type="checkbox" class="group-checkable" data-set="#sample_2 .checkboxes"></span></div></th>'
                    + "<td class=\"center\" style='text-align:center;vertical-align:middle;' >" + obj.name + "</td><td class=\"center\" style='text-align:left;vertical-align:middle;'>"
                    + obj.path + "</td><td class=\"center\" style='text-align:center;vertical-align:middle;' >"
                    + "<button class='btn btn-success' onclick=\"handlerAction('edit', this)\" dataId=\"" + obj.id + "\">编辑</button>"
                    + "<button class='delete-res btn btn-danger' dataId=\"" + obj.id + "\">删除</button></td></tr>");
            });
            $("#treeTable").treetable({
                expandable: true,
                initialState: "expanded",
                expandable: true,
                clickableNodeNames: true,//点击节点名称也打开子节点.                
                indent: 80//每个分支缩进的像素数。
            });

            $('.delete-res').confirmation({
                animation: true,
                placement: "top",
                popout: true,
                title: "确定要删除吗？",
                btnOkLabel: '确定',
                btnCancelLabel: '取消',
                onConfirm: function (e, el) {
                    var dataId = $(el).attr('dataId');
                    console.log('dataId is :', $(el).attr('dataId'))
                    $.post('http://127.0.0.1:8082/preshine/api/resources/delete1?PSESSIONID=' + sessionStorage.getItem('p_token'), { resId: dataId }, function (res) {

                    })
                },
                onCancel: function () {
                }
            })
        }

    });
});

function handlerAction(action, me) {
    var me = $(me);
    var dataId = me.attr('dataId');
    var current = records.filter(r => r.id == dataId)[0];
    if (action == 'edit') {
        console.log(current)
    }
}

$("body").on("click", '[data-close="alert"]', function (t) { $(this).parent(".alert").hide(), $(this).closest(".note").hide(), t.preventDefault() })

// $(".yellow-mint").on("confirmed.bs.confirmation", function () {
//     alert("You confirmed action #1")
// })
// $(".yellow-mint").on("canceled.bs.confirmation", function () {
//     alert("You canceled action #1")
// })

// $(function () {
//     $('.yellow-mint').confirmation({
//         animation: true,
//         placement: "top",
//         title: "确定要删除吗？",
//         btnOkLabel: '确定',
//         btnCancelLabel: '取消',
//         onConfirm: function () {
//             alert("点击了确定");
//         },
//         onCancel: function () {
//             alert("点击了取消");

//         }
//     })
// });

$(function () {
    $.ajax({
        url: 'http://127.0.0.1:8082/preshine/api/user/getMenuData?PSESSIONID=' + sessionStorage.getItem('p_token'),
        type: 'get',
        dataType: 'json',
        success: function (res) {
            var data = res.obj;
            var options = '<optgroup label="Alaskan">';
            data.forEach(d => {
                options += '<option value="' + d.id + '">' + d.name + '</option>';
            })
            options += '</optgroup>';
            $('select[name=parentId]').html(options);
        }
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
    submitHandler: function (e) { i.show(), r.hide() }
})


function showAdd() {
    $('select[name=parentId]').val('');
    $('input[name=name]').val('');
    $('input[name=path]').val('');
    $('select[name=resType]').val('');
    $('input[name=var1]').val('');
    $('input[name=var2]').val();
    $('input[name=var3]').val();
    validator.resetForm();
    $('#addModal').modal();
}

$("#resourcesTree").on("submit", function () {
    var formData = {};
    formData.parentId = $('select[name=parentId]').val();
    formData.name = $('input[name=name]').val();
    formData.path = $('input[name=path]').val();
    formData.resType = $('select[name=resType]').val();
    formData.var1 = $('input[name=var1]').val();
    formData.var2 = $('input[name=var2]').val();
    formData.var3 = $('input[name=var3]').val();
    formData.PSESSIONID = sessionStorage.getItem('p_token');
    console.log(formData);
    // $.ajax({
    //     url: 'http://127.0.0.1:8082/preshine/api/resources/addOrEdit1',
    //     type: 'post',
    //     data: formData,
    //     // contentType: 'application/json; charset=utf-8',
    //     contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //     dataType: 'json',
    //     success: function (res) {
    //         if (res.success == true) {

    //         } else {

    //         }
    //     }
    // })
})
function submit() {
    $("#resourcesTree").submit();
}
// jQuery(document).ready(function () { FormValidation.init() });