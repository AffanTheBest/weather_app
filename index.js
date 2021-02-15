// API
//? http://api.openweathermap.org/data/2.5/weather?q={city name}}&appid={APPID / KEY}
//? http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=

const fs = require("fs");
var requests = require("requests");
const express = require("express");
const atob = require("atob");
const app = express();

const homeFile = fs.readFileSync("home.html", "utf8");

const replaceValue = (tempValue, orgValue) => {
  // console.log(orgValue);
  if (orgValue.message != undefined) {
    let DataNotFound = tempValue.replace("{%tempVal%} °C", " ");
    DataNotFound = DataNotFound.replace(
      "Min {%tempValMin%} °C | Max {%tempValMax%} °C",
      " "
    );
    DataNotFound = DataNotFound.replace("{%location%}", "Data Not Found!");
    DataNotFound = DataNotFound.replace(", {%country%}", " ");
    DataNotFound = DataNotFound.replace("{%tempstatus%}", " ");
    DataNotFound = DataNotFound.replace("{%weathericoncode%}", " ");
    DataNotFound = DataNotFound.replace("{%weather-name%}", " ");
    return DataNotFound;
  } else {
    let tempreature = tempValue.replace("{%tempVal%}", orgValue.main.temp);
    tempreature = tempreature.replace("{%tempValMin%}", orgValue.main.temp_min);
    tempreature = tempreature.replace("{%tempValMax%}", orgValue.main.temp_max);
    tempreature = tempreature.replace("{%location%}", orgValue.name);
    tempreature = tempreature.replace("{%country%}", orgValue.sys.country);
    tempreature = tempreature.replace("{%tempstatus%}",orgValue.weather[0].main);
    tempreature = tempreature.replace("{%weathericoncode%}",orgValue.weather[0].icon);
    tempreature = tempreature.replace("{%weather-name%}",orgValue.weather[0].main);
    return tempreature;
  }
};

app.get("/", function (req, res) {
  const query = req.query.search ? req.query.search : "mumbai";
  requests(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${atob('MzExNzhhMzU4Y2M1MDNkZWRjOTUzN2MxNWU4MzA4ZTQ=')}`)
    .on("data", function (chunk) {
      var arrayData = [JSON.parse(chunk)];
      console.log(arrayData[0].name);
      const realTimeData = arrayData.map((value) => replaceValue(homeFile, value)).join("");
      res.write(realTimeData);
      res.end();
    })
    .on("end", function (err) {
      if (err) {
        console.log("connection closed due to errors", err);
        res.end();
      }
    });
});

app.listen(3000);

