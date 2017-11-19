function unitTimeToSeconds(a, secsPerUnit) {
    const secs = parseInt(a,10);
    const unit = Math.floor(secs / secsPerUnit);   
    const remainder = a - (unit * secsPerUnit);
    return {unit : unit, remainder : remainder };
}

function daysWork(secs, hourOfWorkPerDay) {
    return unitTimeToSeconds(secs, 3600 * hourOfWorkPerDay);
}

function days(secs) {
    return unitTimeToSeconds(secs, 86400);
}

function hours(secs) {
    return unitTimeToSeconds(secs, 3600);
}

function minutes(secs) {
    return unitTimeToSeconds(secs, 60);
}

function concatNonZero(value, sufix){
    return value !== 0 ? `${value}${sufix} ` : ' ';
}

function secToTimeDWHMS(a, hourOfWorkPerDay) {
    const d = daysWork(a, hourOfWorkPerDay);
    const h = hours(d.remainder);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return concatNonZero(d.unit,'d') + concatNonZero(h.unit,'h') + concatNonZero(m.unit,'m') + concatNonZero(s,'s') ;
}

function secToTimeDHMS(a) {
    const d = days(a);
    const h = hours(d.remainder);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return concatNonZero(d.unit,'d') + concatNonZero(h.unit,'h') + concatNonZero(m.unit,'m') + concatNonZero(s,'s') ;
}

function secToTimeHMS(a) {
    const h = hours(a);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return concatNonZero(h.unit,'h') + concatNonZero(m.unit,'m') + concatNonZero(s,'s') ;
}

function monthToSecondsPrice(salary, hoursOfWork) {
    const secondsOneHour = 3600.0;
    return salary / (hoursOfWork * secondsOneHour);
}

function getCentsValue(str) {
    return parseFloat(str.replace(new RegExp(/[^0-9|,|.]/, "gm"),'').
                            replace(',','').
                            replace('.',''));
}

function hasClassTagP2T(node) {
    return (node.className.indexOf('p2t') !== -1);
}

function setClassTagP2T(node) {
    node.className += " p2t"
}

function priceToTime(elementClasses, timeCurrency, hourOfWorkPerDay) {
    const nodes = document.body.getElementsByClassName(elementClasses);
    for (let n = 0; n < nodes.length; n++) {
        const priceStr = nodes[n].innerText;
        if (!hasClassTagP2T(nodes[n])) {
            const price = getCentsValue(priceStr);
            if (price !== NaN) {
                setClassTagP2T(nodes[n])
                nodes[n].innerText = `${priceStr} / ${secToTimeDWHMS(price / timeCurrency, hourOfWorkPerDay)}`;
            }
        }
    }
}

function runChange() {
    const salary = localStorage["Salary"];
    const mountHours = localStorage["MonthHours"];
    const elementClass = ['a-color-price','offer-price','kfs-price','a-text-strike','price', 'new-price'];

    const hourOfWorkPerDay = 8;
    const timeCurrency = monthToSecondsPrice(salary ? salary : 358000, mountHours ? mountHours : 200);
    for (let e = 0; e < elementClass.length; e++) {
       priceToTime(elementClass[e], timeCurrency, hourOfWorkPerDay);
    }
}

ready(function(){
   runChange();
});
(function loop(i) {          
   setTimeout(function () {   
      runChange();
      if (--i) loop(i); 
   }, 5000)
})(30);

// chrome.browserAction.onClicked.addListener(function(tab){
//     chrome.tabs.create({ url: chrome.extension.getUrl('hello.html') })
// })