// API
//? http://api.openweathermap.org/data/2.5/weather?q={city name}}&appid={APPID / KEY}
//? http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=

const fs = require("fs");
var requests = require("requests");
const express = require("express");
const atob = require("atob");
const path = require("path");
const { error } = require("console");
const app = express();

app.set('views', path.join(__dirname, 'Templates/views'));
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname, 'public')))
app.get("/", function (req, res) {
  const query = req.query.search ? req.query.search : "mumbai";
  requests(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${atob('MzExNzhhMzU4Y2M1MDNkZWRjOTUzN2MxNWU4MzA4ZTQ=')}`)
    .on("data", function (chunk) {
      var Data = [JSON.parse(chunk)];
      console.log(Data[0].name);
      if(Data[0].name != undefined){
      res.render('index',{
        weather_name : Data[0].weather[0].main,
        weatherIconCode : Data[0].weather[0].icon,
        location: Data[0].name + ' , ' + Data[0].sys.country,
        tempVal : Data[0].main.temp + ' °C',
        MinMax : 'Min ' + Data[0].main.temp_min + ' °C | Max ' + Data[0].main.temp_max + ' °C'
      })}
      else {
        res.render('index',{
          weather_name : "",
          weatherIconCode : "",
          location: "City Not Found!!",
          country : "",
          tempVal : "",
          tempValMin : "",
          tempValMax : ""
        })
      }
    })
    .on("end", function (err) {
      if (err) {
        console.log("connection closed due to errors", err);
        res.end();
      }
    });


});

const port =  process.env.PORT || 3000;

app.listen(port);

