// API 
//? KEY / APPID = 31178a358cc503dedc9537c15e8308e4
//? http://api.openweathermap.org/data/2.5/weather?q={city name}}&appid={APPID / KEY}
//? http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=31178a358cc503dedc9537c15e8308e4

const http = require('http');
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync("home.html", 'utf8');

const replaceValue = (tempValue , orgValue) => {
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
const server = http.createServer((req , res) => {
    if(req.url == '/'){
        requests('http://api.openweathermap.org/data/2.5/weather?q=balrampur&units=metric&appid=31178a358cc503dedc9537c15e8308e4')
        .on('data', function (chunk) {
          var arrayData = [JSON.parse(chunk)];
          console.log(arrayData[0].name);
          const realTimeData = arrayData.map((value) => replaceValue(homeFile,value)).join("");
          res.write(realTimeData);
        })
        .on('end', function (err) {
          if (err) return console.log('connection closed due to errors', err);
          // console.log(arrayData[0].name);
          res.end();
          
        });
    }
});

server.listen(3000, "127.0.0.1");

// yeah so what u want to do about that bruh ?
// I want to learn android bilding.
// Ohh really
