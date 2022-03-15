const moment = require('moment');
//import 'moment/locale/ja'

moment.locale('ja');

const thistime = moment().format("YYYY-MM-DD HH:mm:SS");
const thistime2 = moment().format('llll');
console.log(thistime);
console.log(thistime2);
