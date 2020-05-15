function unit_seconds(a, secs_per_unit) {
    const unit = Math.floor(parseInt(a,10) / secs_per_unit);   
    const remainder = a - (unit * secs_per_unit);
    return {unit : unit, remainder : remainder };
}

function days_work(secs, hourOfWorkPerDay) {
    return unit_seconds(secs, 3600 * hourOfWorkPerDay);
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

var regex_cents = new RegExp(/[^0-9|,|.]/, "gm");

function get_cents(price) {
    return parseFloat(
        price.replace(regex_cents,'')
            .replace(',','')
            .replace('.',''));
}

var regex_percent = new RegExp(/(\(.*\)+)/,"gm");
var regex_prices = new RegExp(/(\d[\.,\d]+)/,"gm");

function has_p2t(node) {
    return (node.className.indexOf('p2t') !== -1);
}

function set_p2t(node) {
    node.className += " p2t"
}

function priceToTime(filter, time_currency, hourOfWorkPerDay) {
    const nodes = document.body.getElementsByClassName(filter);
    for (let n = 0; n < nodes.length; n++) {
        node = nodes[n]
        if (!has_p2t(node)) {
            const price_str = node.innerText;
            const prices = new Map(price_str.replace(regex_percent, '').matchAll(regex_prices));
            set_p2t(node)
            if (prices.size == 1) {
                prices.forEach(price => {
                    const price_currency = get_cents(price);
                    if (price_currency !== NaN && price_currency !== 0) {
                        node.innerText = `${price_str} ${secs_dwhms(price_currency / time_currency, hourOfWorkPerDay)}`;
                    }
                });
            }
            else {
                text = `${price_str} `;
                n = 0;
                prices.forEach(price => {
                    const price_currency = get_cents(price);
                    if (price_currency !== NaN && price_currency !== 0) {
                        if (n > 0) {
                            text += `-`
                        }
                        text += `${secs_dwhms(price_currency / time_currency, hourOfWorkPerDay)}`;
                        n++;
                    }
                });
                node.innerText = text
            }
        }
    }
}

// extension config
 
var default_settings = {
    salary : "450000",
    month_hours : "160",
    hour_work_per_day : "8"
  }

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
        "dealPriceText"]

    const time_currency = seconds_currency(salary, month_hours);
    for (let e = 0; e < filter.length; e++) {
        priceToTime(filter[e], time_currency, hour_work_per_day);
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
