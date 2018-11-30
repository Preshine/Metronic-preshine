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
                }
            }, {
                text: '分配资源',
                handler: function (record) {
                    console.log('change res' + JSON.stringify(record));
                }
            }],
            target: '#cardlist'
        })
    })
})