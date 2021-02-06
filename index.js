// API 
//? KEY / APPID = 31178a358cc503dedc9537c15e8308e4
//? http://api.openweathermap.org/data/2.5/weather?q={city name}}&appid={APPID / KEY}
//? http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=31178a358cc503dedc9537c15e8308e4

const fs = require('fs');
var requests = require('requests');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const homeFile = fs.readFileSync("home.html", 'utf8');

const replaceValue = (tempValue , orgValue) => {
  // console.log(orgValue);
  if(orgValue.message != undefined) {
    let DataNotFound = tempValue.replace('{%tempVal%} °C',' ');
      DataNotFound = DataNotFound.replace('Min {%tempValMin%} °C | Max {%tempValMax%} °C',' ');
      DataNotFound = DataNotFound.replace('{%location%}','Data Not Found!');
      DataNotFound = DataNotFound.replace(', {%country%}',' ');
      DataNotFound = DataNotFound.replace('{%tempstatus%}',' ');
      DataNotFound = DataNotFound.replace('{%weathericoncode%}',' ');
      DataNotFound = DataNotFound.replace('{%weather-name%}',' ');
    return DataNotFound;
  }else{
    let tempreature = tempValue.replace('{%tempVal%}',orgValue.main.temp);
      tempreature = tempreature.replace('{%tempValMin%}',orgValue.main.temp_min);
      tempreature = tempreature.replace('{%tempValMax%}',orgValue.main.temp_max);
      tempreature = tempreature.replace('{%location%}',orgValue.name);
      tempreature = tempreature.replace('{%country%}',orgValue.sys.country);
      tempreature = tempreature.replace('{%tempstatus%}',orgValue.weather[0].main);
      tempreature = tempreature.replace('{%weathericoncode%}',orgValue.weather[0].icon);
      tempreature = tempreature.replace('{%weather-name%}',orgValue.weather[0].main);
    return tempreature;
  }
}
// const DataNotFound = (tempValue) => {
//   let notFound = tempValue.replace('{%tempVal%}','Data Not Found!');
//       notFound = notFound.replace('{%tempValMin%}','Data Not Found!');
//       notFound = notFound.replace('{%tempValMax%}','Data Not Found!');
//       notFound = notFound.replace('{%location%}','Data Not Found!');
//       notFound = notFound.replace('{%country%}','Data Not Found!');
//       notFound = notFound.replace('{%tempstatus%}','Data Not Found!');
//       notFound = notFound.replace('{%weathericoncode%}','Data Not Found!');
//       notFound = notFound.replace('{%weather-name%}','Data Not Found!');
//   return notFound;
// }
//${req.body.search}
// USING EXPRESS JS

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res) {
  requests(`http://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=31178a358cc503dedc9537c15e8308e4`)
        .on('data', function (chunk) {
          var arrayData = [JSON.parse(chunk)];
          console.log(arrayData[0].name);
          const realTimeData = arrayData.map((value) => replaceValue(homeFile,value)).join("");
          res.write(realTimeData);
          res.end();
        })
        .on('end', function (err) {
          if (err) {
            console.log('connection closed due to errors', err);
            res.end();
          }
        });
});

app.post('/',function(req,res){
  requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.search}&units=metric&appid=31178a358cc503dedc9537c15e8308e4`)
        .on('data', function (chunk) {
          var arrayData = [JSON.parse(chunk)];
          console.log(arrayData[0].name);
          const realTimeData = arrayData.map((value) => replaceValue(homeFile,value)).join("");
          res.write(realTimeData);
          res.end();
        })
        .on('end', function (err) {
          if (err) {
            console.log('connection closed due to errors', err);
            res.write('Data Not Found PLease Refresh The Page');
            // res.end();
          }
        });
});
app.listen(3000);


// USING Normal HTTP

// const http = require('http');
// const server = http.createServer((req , res) => {
//     if(req.url == '/'){
//         requests('http://api.openweathermap.org/data/2.5/weather?q=balrampur&units=metric&appid=31178a358cc503dedc9537c15e8308e4')
//         .on('data', function (chunk) {
//           var arrayData = [JSON.parse(chunk)];
//           console.log(arrayData[0].name);
//           const realTimeData = arrayData.map((value) => replaceValue(homeFile,value)).join("");
//           res.write(realTimeData);
//         })
//         .on('end', function (err) {
//           if (err) return console.log('connection closed due to errors', err);
//           // console.log(arrayData[0].name);
//           res.end();
          
//         });
//     }
// });

// server.listen(3000, "127.0.0.1");

