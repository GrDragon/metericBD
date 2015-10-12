var later = require('later');
var moment = require('moment');
//"2015/09/04 13:40:23"
var onceRunStartTime = new Date("2015/09/04 13:40:23");
var s= moment(onceRunStartTime).format("mm");
console.log("s"+s);
var basicTime = {h: [11], m: [15,45]};
console.log("basicTime:"+basicTime.h+" "+basicTime.m);
var compositeTime = [
    basicTime,
    {h: [17], m: [30]}
];
console.log("compositeTime:"+compositeTime);
var exceptionTime = [
    {M: [1]},
    {dw: [1,6,7]}
];

var sched = {
    schedules:compositeTime,
    exceptions:exceptionTime
};
console.log("sched:"+sched);

later.date.localTime();

console.log("Now:"+(7/3).toFixed(3) );

