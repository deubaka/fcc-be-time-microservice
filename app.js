var express = require('express');
var app = express();

var moment = require('moment');
moment().format();

app.get('/:time', function(req, res) {  
  if (req.params.hasOwnProperty('time')) {    
    var time = req.params.time;
    
    var parsedDate = null;
    var unix = null, natural = null;
    if (/[0-9]{10}/.test(time)) {
    console.log("unix");
      parsedDate = moment.unix(time);
    } else {
    console.log("string");
      parsedDate = moment(time);
    }
      
    if (parsedDate && parsedDate.isValid()) {   
      res.json({
        unix : parsedDate.unix(),
        natural : parsedDate.format('MMMM D, YYYY')
      })
    } else {
      return res.end('Invalid date');
    }
  } else {
    res.json({
      unix : null,
      natural : null
    })
  }
})
app.listen(process.env.PORT);