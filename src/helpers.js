const sum = (numbers) => numbers.reduce((acc, curr) => acc + curr, 0);

const roundTwoDecimals = (num) => Math.round(num * 100) / 100;

const average = (numbers) => roundTwoDecimals(sum(numbers) / numbers.length);

module.exports = { average };
