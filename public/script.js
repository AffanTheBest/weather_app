const date = document.querySelector('.date');
const weathercon = document.querySelector('#weathercon');
const temp = document.querySelector('#temp');

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    let d = new Date();
    let currentDay = d.getDay();
    return weekday[currentDay];
}
getCurrentDay();

const getCurrentTime = () => {
    let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    let d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();

    let hours = d.getHours();
    let minutes = d.getMinutes();

    let period = 'AM';
    if(hours > 11) {
        period = 'PM';
        if(hours > 12) hours -= 12;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    // console.log(hours + " : " + minutes + " " + period)
    // console.log(months[month] + " / " + day);

    return `${month} ${day} | ${hours}:${minutes}${period}`;
}

date.innerHTML = getCurrentDay() + " | " + getCurrentTime();