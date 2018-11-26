(function (preshine) {
    if (!preshine) {
        console.info('System has not initialized ...');
        return;
    }
    if (preshine.daily.util.requireResources) {
        return preshine.daily.util.requireResources;
    }

    let head = document.getElementsByTagName('head')[0];
    const executeScript = scriptText => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        var text = document.createTextNode(scriptText);
        script.appendChild(text);
        head.appendChild(script);
    }
    preshine.daily.util.requireResources = {
        executeScript,
        loadCss(url) {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            head.appendChild(link);
        },
        loadJs(url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }
})(window.preshine);