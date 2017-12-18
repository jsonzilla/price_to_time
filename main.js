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

function isNumber(obj) { 
    return !isNaN(parseFloat(obj)) 
}

function secToTimeDWHMS(a, hourOfWorkPerDay) {
    if (!isNumber(a)) return "";
    const d = daysWork(a, hourOfWorkPerDay);
    const h = hours(d.remainder);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return concatNonZero(d.unit,'d') + concatNonZero(h.unit,'h') + concatNonZero(m.unit,'m') + concatNonZero(s,'s') ;
}

function secToTimeDHMS(a) {
    if (!isNumber(a)) return "";
    const d = days(a);
    const h = hours(d.remainder);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return concatNonZero(d.unit,'d') + concatNonZero(h.unit,'h') + concatNonZero(m.unit,'m') + concatNonZero(s,'s') ;
}

function secToTimeHMS(a) {
    if (!isNumber(a)) return "";
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
    let salary
    let mountHours
    let hourOfWorkPerDay

    // chrome.storage.sync.get(['salary', 'hour_work_day', 'hour_work_month'], function(items) {
    //     console.log('Settings retrieved');
    //     salary = items[0];
    //     hourOfWorkPerDay = items[1];
    //     mountHours = items[2];
        
    //     console.log(str = JSON.stringify(items, null, 4))
    // });

    chrome.storage.sync.get("salary", function (obj) {
        salary = obj;
    });

    const elementClass = ['a-color-price','offer-price','kfs-price','a-text-strike','price', 'new-price'];

    const timeCurrency = monthToSecondsPrice(salary, mountHours);
    for (let e = 0; e < elementClass.length; e++) {
       priceToTime(elementClass[e], timeCurrency, hourOfWorkPerDay);
    }
}

ready(function(){
   runChange();
});
(function loop(i) {          
   setTimeout(function () { ;  
      runChange();
      if (--i) loop(i); 
   }, 5000)
})(30);