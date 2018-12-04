'use strict'

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

function Location(data) {
this.formatted_query = data.formated_address;
this.latitude = data.geometry.location.lat;
this.longitude = data.geometry.location.lng;
};

app.get('/location', (request, response) => {
  console.log('my request object:', request.body);
  const locData = searchToLatLong(request.query.data);
  response.send(locData);
});

function searchToLatLong(query) {
  const geodata = require('./location.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query;
  return location;
}


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
