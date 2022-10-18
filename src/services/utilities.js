const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
function formatDate(date) {

    var dt = new Date();
    dt = date;

    var returnString = dt.getFullYear() + "-" + dayOfTheMonth(dt.getMonth() + 1) + "-" + dateOfTheMonth(dt.getDate())

    return returnString;
}

function formatDateForHtml(date) {

    var dt = new Date(date);


    // @ts-ignore
    var returnString = dt.getDate() + ' ' + monthNames[dt.getMonth() + 1].substr(0, 3) + " " + days[dt.getDay()].substr(0, 3) + " " + dt.getFullYear()

    return returnString;
}
function getTimeFormat(time) {
    if (time != undefined) {
        let tm = parseInt(time.split(':')[0]);

        return (tm > 12 ? time + ' PM' : time + ' AM');
    }
    return '';

}
function dayOfTheMonth(month) {
    return (month < 10 ? '0' + month : '' + month);
}

function dateOfTheMonth(date) {
    return (date < 10 ? '0' + date : '' + date);
}



export { formatDate, formatDateForHtml, getTimeFormat }; 
