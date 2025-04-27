/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-03-24 20:49:07
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-27 09:11:49
 * @FilePath: /rollup-starter-lib/test/test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const assert = require('assert');
const howLongTillLunch = require('..');

function MockDate () {
	this.date = 0;
	this.hours = 0;
	this.minutes = 0;
	this.seconds = 0;
	this.milliseconds = 0;
};

Object.assign(MockDate.prototype, {
	getDate () { return this.date; },
	setDate (date) { this.date = date; },
	setHours (h) { this.hours = h; },
	setMinutes (m) { this.minutes = m; },
	setSeconds (s) { this.seconds = s; },
	setMilliseconds (ms) { this.milliseconds = ms; },
	valueOf () {
		return (
			this.milliseconds +
			this.seconds * 1e3 +
			this.minutes * 1e3 * 60 +
			this.hours * 1e3 * 60 * 60 +
			this.date * 1e3 * 60 * 60 * 24
		);
	}
});

const now = new MockDate();
MockDate.now = () => now.valueOf();

global.Date = MockDate;

function test(hours, minutes, seconds, expected) {
	now.setHours(hours);
	now.setMinutes(minutes);
	now.setSeconds(seconds);

	assert.equal(howLongTillLunch(...lunchtime), expected);
	console.log(`\u001B[32m✓\u001B[39m ${expected}`);
}

let lunchtime = [ 12, 30 ];
test(11, 30, 0, '1 hour');
test(10, 30, 0, '2 hours');
test(12, 25, 0, '5 minutes');
test(12, 29, 15, '45 seconds');
test(13, 30, 0, '23 hours');

// some of us like an early lunch
lunchtime = [ 11, 0 ];
test(10, 30, 0, '30 minutes');