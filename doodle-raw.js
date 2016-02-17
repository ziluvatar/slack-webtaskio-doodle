"use latest";

var request = require('request');

const randomDoodleUrl = 'https://webtask.it.auth0.com/api/run/wt-eduardo_ds-gmail_com-0/doodle?webtask_no_cache=1';

module.exports = function (ctx, req, res) {
  request({ url: randomDoodleUrl, json: true}, function(err, doodleRes, body) {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(buildTitle(body.text) + buildHtmlImg(body.attachments[0].image_url));
    } catch(e) {
      console.error(e);
      res.end('Douh! Something bad happened :( try again');
    }
  });
};

function buildHtmlImg(url) {
  return `<img src ="${url}"/>`;
}

function buildTitle(text) {
  return `<h3>${text}</h3>`;
}
