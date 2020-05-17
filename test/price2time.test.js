chrome = undefined
// time days
const days = require('../price2time.js').days;
test('days(12) to equal {"remainder":12, "unit":0}', () => {
    expect(days(12)).toStrictEqual({"remainder":12, "unit":0});
});

test('days(123.8) to equal {"remainder":123.8, "unit":0}', () => {
    expect(days(123.8)).toStrictEqual({"remainder":123.8, "unit":0});
});

test('days(0) to equal {"remainder":0, "unit":0}', () => {
    expect(days(0)).toStrictEqual({"remainder":0, "unit":0});
});

// time hours
const hours = require('../price2time.js').hours;
test('hours(12) to equal {"remainder":12, "unit":0}', () => {
    expect(hours(12)).toStrictEqual({"remainder":12, "unit":0});
});

test('hours(123.8) to equal {"remainder":123.8, "unit":0}', () => {
    expect(hours(123.8)).toStrictEqual({"remainder":123.8, "unit":0});
});

test('hours(0) to equal {"remainder":0, "unit":0}', () => {
    expect(hours(0)).toStrictEqual({"remainder":0, "unit":0});
});

// time minutes
const minutes = require('../price2time.js').minutes;
test('minutes(12) to equal {"remainder":12, "unit":0}', () => {
    expect(minutes(12)).toStrictEqual({"remainder":12, "unit":0});
});

test('minutes(59) to equal {"remainder":59, "unit":0}', () => {
    expect(minutes(59)).toStrictEqual({"remainder":59, "unit":0});
});

test('minutes(60) to equal {"remainder":0, "unit":1}', () => {
    expect(minutes(60)).toStrictEqual({"remainder":0, "unit":1});
});

test('minutes(61) to equal {"remainder":1, "unit":1}', () => {
    expect(minutes(61)).toStrictEqual({"remainder":1, "unit":1});
});

test('minutes(360.5) to equal {"remainder":0.5, "unit":6}', () => {
    expect(minutes(360.5)).toStrictEqual({"remainder":0.5, "unit":6});
});

test('minutes(0) to equal {"remainder":0, "unit":0}', () => {
    expect(minutes(0)).toStrictEqual({"remainder":0, "unit":0});
}); 

const unit_seconds = require('../price2time.js').unit_seconds; 
const days_work = require('../price2time.js').days_work;
const trim = require('../price2time.js').trim;
const is_number = require('../price2time.js').is_number;
const secs_dwhms = require('../price2time.js').secs_dwhms;
const seconds_currency = require('../price2time.js').seconds_currency;

// parser extract_prices
const extract_prices = require('../price2time.js').extract_prices;
test('extract_prices("213923.8923") to equal [213923892300]', () => {
    expect(extract_prices("213923.8923")).toStrictEqual([213923892300]);
}); 

test('extract_prices("213 923 8923") to equal [21300,92300,892300]', () => {
    expect(extract_prices("213 923 8923")).toStrictEqual([21300,92300,892300]);
}); 

// test('extract_prices("213,00 923.00 8923,20") to equal [21300,92300,892320]', () => {
//     expect(extract_prices(`<span class="a-offscreen">R$89,90</span><span aria-hidden="true"><span class="a-price-symbol">R$</span><span class="a-price-whole">89<span class="a-price-decimal">,</span></span><span class="a-price-fraction">90</span></span>`)).toStrictEqual([21300,92300,892320]);
// }); 

// parser parse_filter
const parse_filter = require('../price2time.js').parse_filter;
test('parse_filter("0") to equal ["0"]', () => {
    expect(parse_filter("0")).toStrictEqual(["0"]);
}); 

test('parse_filter("a,b") to equal ["a", "b"]', () => {
    expect(parse_filter("a,b")).toStrictEqual(["a", "b"]);
}); 

test('parse_filter("") to equal []', () => {
    expect(parse_filter("")).toStrictEqual([]);
}); 

// parser get_cents
const get_cents = require('../price2time.js').get_cents;
test('get_cents("0") to equal 0', () => {
    expect(get_cents("0")).toStrictEqual(0);
}); 

test('get_cents("100.0") to equal 100000', () => {
    expect(get_cents("100.0")).toStrictEqual(100000);
}); 

test('get_cents("10.00") to equal 1000', () => {
    expect(get_cents("10.00")).toStrictEqual(1000);
}); 

test('get_cents("10.10.00") to equal 101000', () => {
    expect(get_cents("10.10.00")).toStrictEqual(101000);
}); 

test('get_cents("10,010.00") to equal 1001000', () => {
    expect(get_cents("10,010.00")).toStrictEqual(1001000);
}); 

test('get_cents("010,010.00") to equal 1001000', () => {
    expect(get_cents("010,010.00")).toStrictEqual(1001000);
});

test('get_cents("010 010.00") to equal 1001000', () => {
    expect(get_cents("010 010.00")).toStrictEqual(1001000);
});

test('get_cents("010-010,00") to equal 1001000', () => {
    expect(get_cents("010-010,00")).toStrictEqual(1001000);
});