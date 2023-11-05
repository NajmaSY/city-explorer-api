const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

const data = require("./data/weather.json");

app.get("/", (_, response) => response.json("Root route."));

app.get("/weather", async (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  //  `http://localhost:8080/weather?lat=${lat}&lon=${lon}&searchQuery=${searchQuery}`;

  // filter cities based on searchQuery, lat, lon
  const filteredCity = data.find((city) => {
    return city.city_name === searchQuery;
    // && city.lat == lat && city.lon == lon;
  });

  const wrangledData = filteredCity.data.map((day) => {
    return {
      description: day.weather.description,
      date: day.datetime,
    };
  });

  response.json(wrangledData);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
