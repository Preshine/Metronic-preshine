$(function () {

    //1.初始化Table
    var oTable = TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = ButtonInit();
    oButtonInit.Init();

});


var TableInit = function (roleId) {
    var oTableInit = {};
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: 'http://127.0.0.1:8082/preshine/api/role/getUsersByrole1',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            // pageList: [10, 20, 30],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                title: 'ID'
            }, {
                field: 'userName',
                title: '用户名'
            }, {
                field: 'mobile',
                title: '手机号'
            }, {
                field: 'sex',
                title: '性别'
            },]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        console.log(params)
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            current: (params.offset / params.limit) + 1,  //页码
            roleId: 1,
            search: params.search
            // departmentname: $("#txt_search_departmentname").val(),
            // statu: $("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = {};
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};

$(function () {
    $.get('http://127.0.0.1:8082/preshine/api/role/list?PSESSIONID=' + sessionStorage.getItem('p_token'), function (res) {
        console.log(res);
        cardList({
            data: res,
            cardClick: function (record) {
                console.log('card click', record);
            },
            actions: [{
                text: '编辑',
                handler: function (record) {
                    console.log('edit' + JSON.stringify(record));
                    validator.resetForm();
                    i.hide(), r.hide();
                    $('input[name=roleId]').val(record.id);
                    $('input[name=name]').val(record.name);
                    $('#description').val(record.description);
                    $('#addOrEditModal').modal();
                }
            }, {
                text: '分配资源',
                handler: function (record) {
                    console.log('change res' + JSON.stringify(record));
                    $('#authRoleId').val(record.id);
                    $.ajax({
                        url: 'http://127.0.0.1:8082/preshine/api/role/getResByRoleId1?roleId=' + record.id,
                        type: 'get',
                        // contentType: 'application/json; charset=utf-8',
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        dataType: 'json',
                        success: function (res) {
                            var checked = res.checked;
                            setCheckedRes(checked);
                        }
                    })

                    $('#authModal').modal();

                }
            }, {
                renderer: function (record) {
                    if (record.status == 1) {
                        return "禁用";
                    }
                    return "启用";
                },
                handler: function (record) {
                    console.log('disable res' + JSON.stringify(record));
                    $.ajax({
                        url: 'http://127.0.0.1:8082/preshine/api/role/handleStatus1',
                        type: 'post',
                        data: { roleId: record.id, status: record.status == 1 ? 0 : 1 },
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
            }, {
                text: '删除',
                handler: function (record) {
                    console.log('delete res' + JSON.stringify(record));
                    $.ajax({
                        url: 'http://127.0.0.1:8082/preshine/api/role/delete1',
                        type: 'post',
                        data: { roleId: record.id },
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

var e = $("#editRole"),
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
        description: {
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
            url: 'http://127.0.0.1:8082/preshine/api/role/addOrEdit1',
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
    // var arr = ref.get_checked(true); //参数加一个true 返回整个节点对象
    var arr = ref.get_checked();//参数不加true返回id数组
    //设置不级联父子节点操作了 这里不用加上undetermined状态的节点
    // arr = arr.concat(ref.get_undetermined(true));
    return arr;
}

function setCheckedRes(arr) {
    var ref = $('#tree_2').jstree(true);
    ref.uncheck_all();
    var arr = ref.check_node(arr);
    return arr;
}

function addOrEditRoleRes() {
    var checked = getCheckedRes();
    if (!checked || checked.length == 0) {
        console.log('角色资源不能为空')
        return;
    }
    var postData = { roleId: $('#authRoleId').val(), res: checked.join() };
    console.log(postData);
    $.ajax({
        url: 'http://127.0.0.1:8082/preshine/api/role/addorEditRoleRes1',
        type: 'post',
        data: postData,
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

function showAdd() {
    validator.resetForm();
    i.hide(), r.hide()
    $('input[name=roleId]').val('');
    $('input[name=name]').val('');
    $('#description').val('');
    $('#addOrEditModal').modal();
}

function submit() {
    $("#editRole").submit();
}