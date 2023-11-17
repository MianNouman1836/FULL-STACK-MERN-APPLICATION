const express = require('express');
const bodyParser = require('body-parser');

<<<<<<< HEAD
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
=======
const placesRoutes = require("./routes/places-routes");
>>>>>>> parent of d9f84c4 (Handling Errors for UnSupported Routes)

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // => /api/places...

<<<<<<< HEAD
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

=======
>>>>>>> parent of d9f84c4 (Handling Errors for UnSupported Routes)
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);