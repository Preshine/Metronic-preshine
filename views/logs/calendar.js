(function() {
    const {loadJs, loadCss} = preshine.daily.util.requireResources;
    loadJs('../assets/global/plugins/fullcalendar/fullcalendar.min.js');
    loadJs('../assets/global/plugins/fullcalendar/lang/zh-cn.js');
    loadCss('../assets/global/plugins/fullcalendar/fullcalendar.min.css');
    
    $('#calendar').fullCalendar({
        eventClick: function (event, jsEvent, view) {
            console.log(event);
            console.log(jsEvent);
            console.log(view);
        },
        locale: 'zh-cn',
        events: [
        {
            title: 'All Day Event',
            start: '2017-09-01'
        },
        {
            title: 'Long Event',
            start: '2017-09-07',
            end: '2017-09-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-09-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-09-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2017-09-11',
            end: '2017-09-13'
        },
        {
            title: 'Meeting',
            start: '2017-09-12T10:30:00',
            end: '2017-09-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2017-09-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: '2017-09-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: '2017-09-28'
        },
        {
            title: 'Dinner',
            start: '2017-09-28'
        },
        {
            title: 'Birthday Party',
            start: '2017-09-28'
        },{
            title: 'Birthday Party',
            start: '2017-09-28'
        },
        {
            title: 'Birthday Party',
            start: '2017-09-28'
        },
        {
            title: 'Birthday Party',
            start: '2017-09-28'
        },
        {
            title: 'Click for Google',
            // url: 'http://google.com/',
            start: '2017-09-28'
        }
    ]
        // put your options and callbacks here
    });
})();