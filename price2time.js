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

function get_cents(price_str) {    
    const regex_cents = new RegExp(/[^0-9,.]/, "gm");
    const regex_separator = new RegExp(/[,.]/, "gm");
    const regex_have_cents = new RegExp(/[,|.]([0-9]{2})$/, "gm")

    let price = parseFloat(price_str.replace(regex_cents,'').replace(regex_separator,''))
    return (price_str.match(regex_have_cents) == undefined ? price * 100.0 : price);
}

function has_p2t(node) {
    const regex_end_seconds = new RegExp(/[0-9][dhms]/,"gi")
    return node.className.indexOf('p2t') !== -1 && node.innerText.match(regex_end_seconds) != undefined;
}

function set_p2t(node) {
    node.className += " p2t"
}

function extract_prices(price_str) {
    const regex_percent = new RegExp(/(\(.*\)+)|(\d[\.,\d]+)%/,"gm");
    const regex_prices = new RegExp(/(\d[\.,\d]+)/,"gm");

    return Array.from(price_str.replace(regex_percent, '')
    	.matchAll(regex_prices), x => x[0])
     	.map(price => get_cents(price))
        .filter(price => price != undefined && price !== 0)
}

function assembly_price_time(node, prices, time_currency, hours_work_week) {  
    node.innerText += " " + prices.map(price => `${secs_dwhms(price / time_currency, hours_work_week)}`)
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

function parse_filter(filter_str) {
    return filter_str.split(',')
        .map(x => x.trim())
        .filter(x => x !== "")
}

// extension config
function run_convert(config) {
    if (Object.keys(config).length === 0) {
        save_default_config(config);
    }
    else {    
        const salary = parseInt(extract_prices(config.salary)[0], 10);
        const month_hours = parseFloat(config.month_hours);
        const hour_work_per_day = parseFloat(config.hour_work_per_day);
        let filter = parse_filter(config.filter)

        const time_currency = seconds_currency(salary, month_hours);
        filter.map(x => { price_2_time(x, time_currency, hour_work_per_day) });
    }
}
  
function run_change() {   
    if (chrome != undefined) {
        chrome.storage.local.get().then(run_convert, save_default_config);
    }
}

function save_default_config(config) {
    if (Object.keys(config).length === 0) {
        const default_settings = {
            salary : "2.500,00",
            month_hours : "160",
            hour_work_per_day : "8.5",
            filter : `a-color-price, offer-price, 
                    kfs-price, a-text-strike, price, new-price, a-price, 
                    dealPriceText, price_inside_buybox, hl-item__displayPrice,
                    sales-price, price-tag-fraction, price__fraction`
        }
        if (chrome != undefined) {
            chrome.storage.local.set(default_settings)
        }
    }
}

run_change();
(function loop(i) {          
    setTimeout(function () { ;  
       run_change();
       if (--i) loop(i); 
    }, 2500)
})(30);

module.exports = { 
    unit_seconds: unit_seconds, 
    days_work: days_work,
    days: days,
    hours: hours,
    minutes: minutes,
    trim: trim,
    is_number: is_number,
    secs_dwhms: secs_dwhms,
    seconds_currency: seconds_currency,
    get_cents: get_cents,
    extract_prices: extract_prices,
    parse_filter: parse_filter
}