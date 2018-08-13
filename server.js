// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/timestamp/:date_string?', (req, res) => {
  // {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
  let dateStr = '';
  let dateInt = 0;
  let resObj = {};
  // {"unix":  dateStr ,"utc": dateInt}
  if(!req.params.date_string) {
    dateStr = new Date().toUTCString();
    dateInt =  Date.parse(dateStr);
  } else if(Number.isInteger(+req.params.date_string)) {
     if(new Date(+req.params.date_string)) {
        dateStr = new Date(+req.params.date_string).toUTCString(); 
        dateInt =  Date.parse(dateStr);
     } else {
      res.json({"unix": null, "utc" : "Invalid Date" });
     }
    } else {
      if(new Date(req.params.date_string)) {
        dateStr = new Date(req.params.date_string).toUTCString();
        dateInt = Date.parse(dateStr);
      } else {
        res.json({"unix": null, "utc" : "Invalid Date" });
      }
    }
   res.json({"unix":  dateInt,"utc": dateStr });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});