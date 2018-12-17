$(function () {

    //1.初始化Table
    var oTable = TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = ButtonInit();
    oButtonInit.Init();

    getRoleDetail();
    loadTreeView();


});

function getRoleDetail() {
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:8082/preshine/api/role/getRoleDetail?roleId=1',
        dataType: 'json',
        success: function (data) {
            $('.profile-usertitle-name').html(data.role.name);
            $('.profile-usertitle-job').html(data.role.description);
            $('#roleResSize').html(data.roleResSize);
            $('#userRolesSize').html(data.userRolesSize);
        }
    })
}


var TableInit = function (roleId) {
    var oTableInit = {};
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: 'http://127.0.0.1:8082/preshine/api/role/getUsersByrole1',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            // toolbar: '#toolbar',                //工具按钮用哪个容器
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
            search: true,                       //是否显示表格搜索
            formatSearch: function () { return '搜索用户名或手机号...' },
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
            columns: [
                // {
                //     checkbox: true
                // },
                {
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
            mobileOrUserName: params.search
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


function loadTreeView() {
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:8082/preshine/api/role/getResTreeList1?roleId=1',
        dataType: 'json',
        success: function (data) {
            var table = ' <table id="treeTable" class="table table-striped table-bordered table-hover order-column">'
                + '<thead>'
                + '<tr>'
                + '<th style="text-align:center;line-height: 35px;background:#F9F9F9;border: 1px solid #e7ecf1">名字</th>'
                + '<th style="text-align:left;line-height: 35px;background:#F9F9F9;border: 1px solid #e7ecf1">URL</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody></tbody>'
                + '</table>';

            $('#portlet_tab1 .scroller').html(table);
            // 属性配置信息
            var attributes = {
                id: 'id',
                parentId: 'parentId',
            };
            var data = toTreeData(data, attributes);
            var list = [];
            treeToList(data[0], list);
            $.each(list, function (index, obj) {
                var rowCls = index % 2 > 0 ? 'odd' : 'even';
                $("#treeTable tbody").append("<tr class=\"" + rowCls + "\" data-tt-id=\"" + obj.id + "\" data-tt-parent-id=\"" + obj.parentId + "\">"
                    + "<td class=\"center\" style='text-align:center;vertical-align:middle;' >" + obj.name + "</td>"
                    + "<td class=\"center\" style='text-align:left;vertical-align:middle;'>" + obj.path + "</td>"
                    + "</tr>");
            });
            $("#treeTable").treetable({
                expandable: true,
                initialState: "expanded",
                expandable: true,
                clickableNodeNames: true,//点击节点名称也打开子节点.                
                indent: 80//每个分支缩进的像素数。
            });
        }

    });
}