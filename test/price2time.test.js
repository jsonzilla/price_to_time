jest.useFakeTimers();

chrome = undefined
    // check is_number
const is_number = require('../price2time.js').is_number;
test('is_number("") to equal falsy', () => {
    expect(is_number("")).toBeFalsy();
});

test('is_number(NaN) to equal falsy', () => {
    expect(is_number(NaN)).toBeFalsy();
});

test('is_number(0) to equal truthy', () => {
    expect(is_number(0)).toBeTruthy();
});

// time days
const days = require('../price2time.js').days;
test('days(12) to equal {"remainder":12, "unit":0}', () => {
    expect(days(12)).toStrictEqual({ "remainder": 12, "unit": 0 });
});

test('days(123.8) to equal {"remainder":123.8, "unit":0}', () => {
    expect(days(123.8)).toStrictEqual({ "remainder": 123.8, "unit": 0 });
});

test('days(0) to equal {"remainder":0, "unit":0}', () => {
    expect(days(0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

// time hours
const hours = require('../price2time.js').hours;
test('hours(12) to equal {"remainder":12, "unit":0}', () => {
    expect(hours(12)).toStrictEqual({ "remainder": 12, "unit": 0 });
});

test('hours(123.8) to equal {"remainder":123.8, "unit":0}', () => {
    expect(hours(123.8)).toStrictEqual({ "remainder": 123.8, "unit": 0 });
});

test('hours(0) to equal {"remainder":0, "unit":0}', () => {
    expect(hours(0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

// time minutes
const minutes = require('../price2time.js').minutes;
test('minutes(12) to equal {"remainder":12, "unit":0}', () => {
    expect(minutes(12)).toStrictEqual({ "remainder": 12, "unit": 0 });
});

test('minutes(59) to equal {"remainder":59, "unit":0}', () => {
    expect(minutes(59)).toStrictEqual({ "remainder": 59, "unit": 0 });
});

test('minutes(60) to equal {"remainder":0, "unit":1}', () => {
    expect(minutes(60)).toStrictEqual({ "remainder": 0, "unit": 1 });
});

test('minutes(61) to equal {"remainder":1, "unit":1}', () => {
    expect(minutes(61)).toStrictEqual({ "remainder": 1, "unit": 1 });
});

test('minutes(360.5) to equal {"remainder":0.5, "unit":6}', () => {
    expect(minutes(360.5)).toStrictEqual({ "remainder": 0.5, "unit": 6 });
});

test('minutes(0) to equal {"remainder":0, "unit":0}', () => {
    expect(minutes(0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

// calc
const unit_seconds = require('../price2time.js').unit_seconds;
test('unit_seconds(0, 0) to equal 0', () => {
    expect(unit_seconds(0, 0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

test('unit_seconds(10, 0) to equal 0', () => {
    expect(unit_seconds(10, 0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

test('unit_seconds(0, 10) to equal 0', () => {
    expect(unit_seconds(0, 10)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

test('unit_seconds(10, 10) to equal 0', () => {
    expect(unit_seconds(10, 10)).toStrictEqual({ "remainder": 0, "unit": 1 });
});

test('unit_seconds(1534685130, 86400) to equal 0', () => {
    expect(unit_seconds(1534685130, 86400)).toStrictEqual({ "remainder": 48330, "unit": 17762 });
});

// calc
const days_work = require('../price2time.js').days_work;
test('days_work(0, 0) to equal 0', () => {
    expect(days_work(0, 0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

test('days_work(20, 0) to equal 0', () => {
    expect(days_work(20, 0)).toStrictEqual({ "remainder": 0, "unit": 0 });
});

test('days_work(15, 1) to equal 0', () => {
    expect(days_work(15, 1)).toStrictEqual({ "remainder": 15, "unit": 0 });
});

// calc seconds_currency
const seconds_currency = require('../price2time.js').seconds_currency;
test('seconds_currency(0, 0) to equal 0', () => {
    expect(seconds_currency(0, 0)).toStrictEqual(0);
});

test('seconds_currency(0.0, 0.0) to equal 0', () => {
    expect(seconds_currency(0.0, 0.0)).toStrictEqual(0);
});

test('seconds_currency(2500.5, 220.5) to equal 0.003150037792894936', () => {
    expect(seconds_currency(2500.5, 220.5)).toStrictEqual(0.003150037792894936);
});

// concat
const concat = require('../price2time.js').concat;
test('concat(0, "") to equal " "', () => {
    expect(concat(0, "")).toStrictEqual(" ");
});

test('concat(10, "") to equal "10 "', () => {
    expect(concat(10, "")).toStrictEqual("10 ");
});

test('concat(10, "s") to equal "10s "', () => {
    expect(concat(10, "s")).toStrictEqual("10s ");
});

// filter has_p2t
class NodeMock {
    constructor(text, class_name_list) {
        this.text = text;
        this.class_name_list = class_name_list;
    }

    get innerText() { return this.text };
    get className() { return this.class_name_list };
}

const has_p2t = require('../price2time.js').has_p2t;
test('has_p2t(empty node) to equal falsy', () => {
    const node = new NodeMock("", []);
    expect(has_p2t(node)).toBeFalsy();
});

test('has_p2t(parcial node with tag p2t) to equal falsy', () => {
    const node = new NodeMock(String("10s"), ["eto"]);
    expect(has_p2t(node)).toBeFalsy();
});

test('has_p2t(parcial node) to equal falsy', () => {
    const node = new NodeMock(String(""), ["p2t"]);
    expect(has_p2t(node)).toBeFalsy();
});

test('has_p2t(valid node) to equal truthy', () => {
    const node = new NodeMock(String("10s"), ["p2t"]);
    expect(has_p2t(node)).toBeTruthy();
});

// string builder secs_dwhms
const assembly_price_time = require('../price2time.js').assembly_price_time;
test('assembly_price_time(empty) to equal ""', () => {
    expect(assembly_price_time([], 0, 0)).toStrictEqual("");
});

test('assembly_price_time(20, empty) to equal ""', () => {
    expect(assembly_price_time([20], 0, 0)).toStrictEqual("");
});

// string builder secs_dwhms
const secs_dwhms = require('../price2time.js').secs_dwhms;
test('secs_dwhms("2139,8") to equal "35m 39s"', () => {
    expect(secs_dwhms(2139, 8)).toStrictEqual("35m 39s");
});

test('secs_dwhms("1000000,10") to equal "27d 7h 46m 40s"', () => {
    expect(secs_dwhms(1000000, 10)).toStrictEqual("27d 7h 46m 40s");
});

// parser extract_prices
const extract_prices = require('../price2time.js').extract_prices;
test('extract_prices("213923.8923") to equal [213923892300]', () => {
    expect(extract_prices("213923.8923")).toStrictEqual([213923892300]);
});

test('extract_prices("213 923 8923") to equal [21300,92300,892300]', () => {
    expect(extract_prices("213 923 8923")).toStrictEqual([21300, 92300, 892300]);
});

test('extract_prices("R$ 2.89") to equal [280]', () => {
    expect(extract_prices("R$ 2.89")).toStrictEqual([289]);
});

test('extract_prices("2.89 DK") to equal [280]', () => {
    expect(extract_prices("2.89 DK")).toStrictEqual([289]);
});

test('extract_prices("2 DK") to equal [200]', () => {
    expect(extract_prices("2 DK")).toStrictEqual([]);
});

test('amazon price to equal []', () => {
    expect(extract_prices(`<span class="a-offscreen">R$89,90</span><span aria-hidden="true"><span class="a-price-symbol">R$</span><span class="a-price-whole">89<span class="a-price-decimal">,</span></span><span class="a-price-fraction">90</span></span>`)).toStrictEqual([]);
});

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

test('get_cents("0.00") to equal 0', () => {
    expect(get_cents("0.00")).toStrictEqual(0);
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