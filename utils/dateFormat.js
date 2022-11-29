const moment = require('moment');

function formatDate(timestamp) {
    return moment(timestamp).format('hh:mm a, D MMM YYYY');
}

module.exports = formatDate;