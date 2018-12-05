'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors());

//location functions
app.get('/location', (request, response) => {
  searchToLatLong(request.query.data)
    .then(location => response.send(location))
    .catch(error => handleError(error, response));
});

function searchToLatLong(query) {
  const geoData = require('./data/location.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query;
  return location;
}

function Location(data) {
  this.latitude = res.body.results[0].geometry.location.lat;
  this.longitude = res.body.results[0].geometry.location.lng;
  this.formatted_query = res.body.results[0].formatted_address;
  this.search_query = query;
};

//Weather functions
app.get('/weather', (request, response) => {
  console.log('my request object:', request.body);
  const weaData = getWeatherData(request.query.data);
  response.send(weaData);
});

function Weather(data) {
  this.time = data.time;
  this.forcast = data.summary;
};

function getWeatherData(query) {
  const weatherData = require('./data/weather.json');
  const weather = new Weather(weatherData.daily);
  weather.search_query = query;
  return weather;
};


function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry - Something Broke');
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
