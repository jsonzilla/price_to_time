function unit_seconds(a, secs_per_unit) {
    const unit = Math.floor(parseInt(a,10) / secs_per_unit);   
    const remainder = a - (unit * secs_per_unit);

    return {unit : unit, remainder : remainder };
}

function days_work(secs, hours_work_week) {
    return unit_seconds(secs, 3600 * hours_work_week);
}

function days(secs) {
    return unit_seconds(secs, 86400);
}

function hours(secs) {
    return unit_seconds(secs, 3600);
}

function minutes(secs) {
    return unit_seconds(secs, 60);
}

function trim(value, sufix){
    return value !== 0 ? `${value}${sufix} ` : ' ';
}

function is_number(obj) { 
    return !isNaN(parseFloat(obj)) 
}

function secs_dwhms(a, hour_work_day) {
    if (!is_number(a)) return "";
    const d = days_work(a, hour_work_day);
    const h = hours(d.remainder);
    const m = minutes(h.remainder);
    const s = Math.floor(m.remainder);

    return trim(d.unit,'d') + trim(h.unit,'h') + trim(m.unit,'m') + trim(s,'s') ;
}

function seconds_currency(salary, hours_work) {
    return salary / (hours_work * 3600.0);
}

function get_cents(price) {    
    const regex_cents = new RegExp(/[^0-9|,|.]/, "gm");
    const regex_separator = new RegExp(/[,|.]/, "gm");

    return parseFloat(price.replace(regex_cents,'').replace(regex_separator,''));
}

function has_p2t(node) {
    return (node.className.indexOf('p2t') !== -1);
}

function set_p2t(node) {
    node.className += " p2t"
}

function extract_prices(price_str) {
    const regex_percent = new RegExp(/(\(.*\)+)/,"gm");
    const regex_prices = new RegExp(/(\d[\.,\d]+)/,"gm");

    return Array.from(price_str.replace(regex_percent, '')
    	.matchAll(regex_prices), x => x[0])
     	.map(price => get_cents(price))
        .filter(price => price !== NaN && price !== 0)
}

function assembly_price_time(node, prices, time_currency, hours_work_week) {  
    node.innerText += prices.map(price => `${secs_dwhms(price / time_currency, hours_work_week)}`)
      .join("-")
}

function price_2_time(filter, time_currency, hours_work_week) {
    const nodes = Array.from(document.body.getElementsByClassName(filter));
  	nodes.filter(node => !has_p2t(node))  			
    	.map(node => {
      		set_p2t(node);
            const prices = extract_prices(node.innerText);
			assembly_price_time(node, prices, time_currency, hours_work_week);
        })
}

// extension config
function on_got(config) {
    salary = parseInt(config.salary, 10);
    month_hours = parseInt(config.month_hours, 10);
    hour_work_per_day = parseInt(config.hour_work_per_day, 10);

    const filter = [
        "a-color-price",
        "offer-price",
        "kfs-price",
        "a-text-strike",
        "price",
        "new-price'",
        "a-price",
        "dealPriceText",
        "price_inside_buybox"]

    const time_currency = seconds_currency(salary, month_hours);
    for (let e = 0; e < filter.length; e++) {
        price_2_time(filter[e], time_currency, hour_work_per_day);
    }
}
  
function on_error(error) {
    console.log(`Error: ${error}`);
}

function run_change() {    
    let config = browser.storage.local.get();
    config.then(on_got, on_error);
}

function save_default_config() {
    const default_settings = {
        salary : "450000",
        month_hours : "160",
        hour_work_per_day : "8"
    }

    browser.storage.local.set(default_settings);    
}

// loop

save_default_config();
run_change();

(function loop(i) {          
    setTimeout(function () { ;  
       run_change();
       if (--i) loop(i); 
    }, 5000)
})(30);
