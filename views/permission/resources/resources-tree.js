$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:8082/preshine/api/user/getMenuData?PSESSIONID=2b73f7fef96b42eb9a7370733cf408c4',
        dataType: 'json',
        success: function (data) {
            data = data.obj;

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
                    + "<th rowspan=\"1\" colspan=\"1\" >"
                    +'<div class="checker"><span><input type="checkbox" class="group-checkable" data-set="#sample_2 .checkboxes"></span></div></th>'
                    + "<td class=\"center\" style='text-align:center;vertical-align:middle;' >" + obj.name + "</td><td class=\"center\" style='text-align:left;vertical-align:middle;'>"
                    + obj.path + "</td><td class=\"center\" style='text-align:center;vertical-align:middle;' ><button class='btn btn-success' id=\"" + obj.id + "\">编辑</button><button class='btn btn-danger' id=\"" + obj.id + "\">删除</button></td></tr>");
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
});