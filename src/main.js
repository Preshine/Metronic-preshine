let {
    executeScript,
    loadJs,
    loadCss
} = preshine.daily.util.requireResources;
let {
    DAO
} = preshine.daily.util;

function first() {
    DAO.load({
        url: './logs/addLog.html',
        target: $('#rootLink'),
        callback: function () {
            loadJs('../assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js');
            loadJs('../assets/pages/scripts/components-bootstrap-select.min.js');
            loadCss('../assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css');
        }
    });
}

// function calendar () {
//     DAO.load({
//         url: './logs/calendar.html',
//         target: $('#rootLink'),
//         callback: function () {
//             loadJs('./logs/calendar.js');
//         }
//     });
// }


// 属性配置信息
let attributes = {
    id: 'id',
    parentId: 'parentId',
};



function buildMenu(menu) {
    if (menu.children.length > 0) {
        var node = '<ul class="sub-menu">';
        menu.children.forEach(m => {
            var childNode = '<li class="nav-item ' + (m.children.length > 0 ? 'hasChildren ' : '') + ' navId' + m.id + '">'
                + '<a ' + (!m.children.length > 0 ? 'onclick="router(this)" path="' + m.path + '?navId=' + m.id + '"' : 'class="nav-link nav-toggle"') + '">'
                + '<span class="title">' + m.name + '</span>'
                + '<span ' + (m.children.length > 0 ? 'class="arrow"' : '') + '></span>'
                + '</a>';
            if (m.children.length > 0) {
                childNode += buildMenu(m);
            }
            childNode += '</li>'
            node += childNode;
        });
        node += '</ul>'

        return node;
    }
    return '';
}

//获取地址栏的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var navId = GetQueryString('navId');


$.get('http://127.0.0.1:8082/preshine/api/user/getMenuData', { PSESSIONID: sessionStorage.getItem('p_token') }, function (data) {
    if (data.success) {
        var menus = data.obj;
        let treeData = toTreeData(menus, attributes);
        var node = '<li class="sidebar-toggler-wrapper hide"><div class="sidebar-toggler"> </div></li>';
        if (treeData && treeData[0] && treeData[0].children) {
            var navId = 17;
            treeData[0].children.forEach(m => {

                node += '<li class="nav-item hasChildren">' 
                                + '<a class="nav-link nav-toggle">' 
                                    +  '<i class="icon-home"></i>'
                                    +  '<span class="title">' + m.name + '</span>'
                                    // +  '<span class="selected"></span>'
                                    +  '<span class="arrow hasOpen"></span>'
                                + '</a>';
                var str = buildMenu(m);
                node += str
                node += '</li>';
            });
            console.log('node is :', node);
            $('#contentMenu').html(node);
            //设置当前选中的菜单的父级目录菜单选中
            $('.navId' + navId).parents('.hasChildren').addClass('active open');
            $('.navId' + navId).parents('.hasOpen').addClass('open');
            //选中当前的菜单
            $('.navId' + navId).addClass('active open');
        }
        console.log(treeData);
    }
});

function router(me) {
    $('#rootFrame').attr('src', '.' + me.attributes.path.nodeValue + '?time=' + new Date().getTime());
    // window.frames['root'].src = '.' + me.attributes.path.nodeValue + '?time=' + new Date().getTime();
}

$("#rootFrame").height($(window).height()-90);


//by函数接受一个成员名字符串做为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}

//by函数接受一个成员名字符串和一个可选的次要比较函数做为参数
//并返回一个可以用来包含该成员的对象数组进行排序的比较函数
//当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下
var by = function (name, minor) {
    return function (o, p) {
        var a, b;
        if (o && p && typeof o === 'object' && typeof p === 'object') {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            thro("error");
        }
    }
}

//    employees.sort(by('age',by('name')));