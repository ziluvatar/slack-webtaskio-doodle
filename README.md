# slack-webtaskio-doodle
Is a webtask for http://webtask.io to integrate random doodles from Google in Slack.
It is already uploaded.

How to use it?
--------------
I haven't created a Slack App, so if you want to use you will need to create a Slack Command.
https://slack.com/apps/build/custom-integration

Just configure a command name like `/doodle`

Add this URL with GET method:

`https://webtask.it.auth0.com/api/run/wt-eduardo_ds-gmail_com-0/doodle?webtask_no_cache=1`

Or create your own webtask (https://webtask.io/docs/101):

`wt create https://raw.githubusercontent.com/ziluvatar/slack-webtaskio-doodle/master/doodle.js`

Otherwise you can always hit this other link directly to get a new Doodle every time.

https://webtask.it.auth0.com/api/run/wt-eduardo_ds-gmail_com-0/doodle-raw?webtask_no_cache=1

