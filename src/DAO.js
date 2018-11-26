(function ($, preshine) {
    if (!preshine) {
        console.info('System has not initialized ...');
        return;
    }
    if (preshine.daily.util.DAO) {
        return preshine.daily.util.DAO;
    }
    let ajax = ({
        url = '',
        async = true,
        data = {},
        dataType = 'json',
        contentType = 'application/json',
        success = new Function(),
        error = new Function(),
        statusCode = {
            '404': function () {
                console.log('page is not found ...');
            }
        }
    } = {}) => {
        $.ajax({
            url: url,
            async: async,
            data: data,
            dataType: dataType,
            contentType: contentType,
            success: success,
            error: error,
            statusCode: statusCode
        });
    }

    let get = ({
        url = '',
        data = {},
        callback = new Function(),
        type = 'json'
    } = {}) => {
        $.get({
            url: url,
            data: data,
            callback: callback,
            type: type
        })
    }

    let post = ({
        url = '',
        data = {},
        callback = new Function(),
        type = 'json'
    } = {}) => {
        $.post({
            url: url,
            data: data,
            callback: callback,
            type: type
        });
    }

    let getJSON = ({
        url = '',
        data = {},
        callback = new Function()
    } = {}) => {
        $.getJSON(url, data, callback);

    }

    let load = ({
        url = '',
        data = null,
        callback = new Function(),
        target = ''
    } = {}) => {
        target.load(url, data, callback);
    }

    let getScript = ({
        url = '',
        callback = new Function()
    } = {}) => {
        $.getScript(url, callback);
    }

    window.preshine.daily.util.DAO = {
        ajax,
        get,
        post,
        getJSON,
        getScript,
        load
    }

})($, window.preshine);