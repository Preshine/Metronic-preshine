function cardList(props) {
    var data = props.data;
    var actions = props.actions;
    var target = props.target;

    var html = '<div style="display: flex;flex-wrap: wrap">';

    data.forEach((d, di) => {
        var str = '<div class="card" style="width:200px">'
            + '<img class="card-img-top" src="http://static.runoob.com/images/mix/img_avatar.png" alt="Card image" style="width:100%">'
            + '<div class="card-body">'
            + '<h4 class="card-title">' + d.name + '</h4>'
            + '<p class="card-text">' + d.description + '</p>';
        actions.forEach((action, ai) => {
            str += '<button class="btn btn-primary" id="card_' + di + ai + '" onclick="handler()">' + action.text + '</button>';

            $('#card_' + di + ai).on('click', function () {
                action.handler(d);
            });
        })
            + '</div>'
            + '</div>';
        html += str;
    });

    html += "</div>";

    $(target).html(html);
}