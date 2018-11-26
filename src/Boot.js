(function () {
    let init = () => {
        window.preshine = {
            daily: {
                util: {},
                viewJs: new Map()
            }
        }
    }
    init();
    
})();

function ns(str, target) {
    var target = target || window,
        arr = str.split('.'),
        step = target,
        key;

    while (key = ar.shift()) {
        step[key] = step[key] || {};
        step = step[key];
    }
}