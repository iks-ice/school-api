const { check } = require('express-validator');

const checkInput = (...values) => values.map((value) => check(value, `${value[0].toUpperCase() + value.slice(1)} is required`));

module.exports = {
  checkInput,
};
