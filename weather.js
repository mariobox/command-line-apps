
const http = require('http');

function printWeather(query) {
  const request = http.get(`http://api.wunderground.com/api/yourapikeygoeshere/conditions/q/${query}.json`, response => {
    if (response.statusCode === 200) {
      var body = "";
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        try {
          const weather = JSON.parse(body);
          if (weather.current_observation) {
            const message = `Temperature in ${weather.current_observation.display_location.full} ${query} is ${weather.current_observation.temp_f}F and it is currently ${weather.current_observation.weather}.`;
            console.log(message);
          } else { console.log(`Zip code ${query} does not exist. Try another one.`) };

        }

        catch (error) {
          console.error(error.message);
        }
      });

    } else {
      console.log(`There has been a ${response.statusCode} error.`);
    }

  });
}
const query = process.argv.slice(2);
query.forEach(printWeather);




