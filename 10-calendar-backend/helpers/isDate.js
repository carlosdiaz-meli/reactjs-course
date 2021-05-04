const moment = require('moment');

const isDate = ( value, { req, location, path } ) => moment(value).isValid();

module.exports = {
    isDate,
};