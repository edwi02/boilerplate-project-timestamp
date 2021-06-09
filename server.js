// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res)=> {
  
  const date = req.params.date;
  
  let unix;
  let utcDate;
  let result = false;
  
  try{
    
    let numberRegex = /\d{13}/ig;
    let isNumber = numberRegex.test(date);
    
    let dateRegex = /\d{4}[-]\d{2}[-]\d{1,2}/ig; 
    let isDate = dateRegex.test(date);

    
    if( isNumber  ) {
      unix = date;
      utcDate = new Date(parseInt(date));
      console.log('Number', date);
    } else if( isDate ) {
      unix = Date.parse(date);
      utcDate = new Date(date)
      console.log('Date', date.length);

    } else {
      return res.json({
       error : "Invalid Date"
      })
    }
    
    const utc = utcDate.toUTCString();
    return res.json({
      unix,
      utc
    })
  } catch(err) {
    console.log("err", err);
    res.json({
     error : "Invalid Date"
    })
  }
  
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

