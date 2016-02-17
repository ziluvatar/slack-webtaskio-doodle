var request = require('request');

const MIN_YEAR = 2000;
const MIN_MONTH = 0;
const MAX_MONTH = 11;
const LANGUAGE = "en";
const DOODLE_API = "http://www.google.com/doodles/json/";

module.exports = function (ctx, req, res) {
  var doodleUri = DOODLE_API + randomPathForDoodle();
  console.log('Url generated: ' + doodleUri);

  request({ url: doodleUri, json: true}, function(err, doodleRes, body) {
    try {
      var randomIndexDay = randomNumber(0, body.length - 1);
      console.log('Day index: ' + randomIndexDay);

      var doodle = body[randomIndexDay];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(buildSlackResponse(buildTitle(doodle), builImagedUrl(doodle))));
    } catch(e) {
      console.error(e);
      res.end('Douh! Something bad happened :( try again');
    }

  });
};

function randomPathForDoodle() {
  var year = randomYear();
  var month = randomMonth();
  if (isDateInFuture(year, month)) {
    month = getCurrentMonth();
  }
  return year + "/" + (month + 1) + "?hl=" + LANGUAGE;
}

function randomYear() {
  return randomNumber(MIN_YEAR, getCurrentYear());
}

function randomMonth() {
  return randomNumber(MIN_MONTH, MAX_MONTH);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isDateInFuture(year, month) {
  return year == getCurrentYear() && month > getCurrentMonth();
}

function getCurrentMonth() {
  return new Date().getMonth();
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function buildTitle(doodle) {
  return doodle.title + ' (' + formatDate(doodle.run_date_array) + ')';
}
function formatDate(date_array) {
  return date_array[2] + '-' + date_array[1] + '-' + date_array[0];
}
function builImagedUrl(doodle) {
  return 'https:' + doodle.url;
}

function buildSlackResponse(title, url) {
  return {
    response_type: "in_channel",
    text: title,
    attachments: [{
        fallback: title,
        image_url: url
    }]
  }
}



