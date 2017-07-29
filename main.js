function isNumber(obj) { return !isNaN(parseFloat(obj)) }
function toHHMMSS(a) {
    var sec_num = parseInt(a,10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}   
    
    return hours+'h '+minutes+'m '+seconds+'s';
}
function priceToTime(elementClass, salaryTime) {
    var nodes = document.body.getElementsByClassName(elementClass);
    for (var n = 0; n < nodes.length; n++) {
        var price = nodes[n].innerText;
        if (!price.endsWith("s")) {
            var valor = parseFloat(price.replace(new RegExp(/[^0-9|,|.]/, "gm"),'').replace(',','.'));
            if (valor !== NaN) {
                var priceTime = valor / salaryTime; 
                nodes[n].innerText = price + " / " + toHHMMSS(priceTime);
            }
        }
    }
}
function runChange() {
    var person = prompt("Please enter your name", "Harry Potter");
    var salary = localStorage["Salary"];
    var mountHours = localStorage["MonthHours"];
    var seconds = monthHours * 3600; 
    var salaryTime = salary / seconds; 
    var elementClass = ['a-color-price','offer-price','kfs-price','a-text-strike','price', 'new-price'];
    for (var e = 0; e < elementClass.length; e++) {
       priceToTime(elementClass[e], salaryTime);
    }
}
var salary = 3100; //change
var monthHours = 160; //change

ready(function(){
   runChange();
});
(function loop(i) {          
   setTimeout(function () {   
      runChange();
      if (--i) loop(i); 
   }, 5000) // delay
})(30);