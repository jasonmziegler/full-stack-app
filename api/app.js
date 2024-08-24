'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { User, Course, sequelize } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// A /api/users GET route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
app.get('/api/users', authenticateUser, (async (req, res) => {
  try {
    const user = req.currentUser;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ "message": error });
  }
  
}));

// A /api/users POST route that will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.
app.post('/api/users', (async (req, res) => {
  console.log(req.body);
  try {
    await User.create(req.body);
    res.setHeader('Location', `/`);
    res.status(201).send();
  } catch (error) {
    console.log('Error: ', error.name);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error });
    } else {
      throw error;
    }
  }
  
}));

// A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
app.get('/api/courses', (async (req, res) => {
  //res.status(200).json({ "message": "This GET route should return all courses and User Associateed" });
  try {
    let courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ "message": error });
  }
}));
// A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
app.get('/api/courses/:id', (async (req, res) => {
  try {
    let course = await Course.findOne({ 'id': req.params.id });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ "message": error });
  }
}));

// A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
app.post('/api/courses', authenticateUser, (async (req, res) => {
  try {
    let course = await Course.create(req.body);
    res.setHeader('Location', `/api/course/${course.id}`);
    res.status(201).send();
  } catch (error) {
    //console.log ("Message: ", error.name);
    // Return 400 if validation error
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ "message": error });
    } else {
      res.status(500).json({ "message": error });
    }
    
  } 
}));

// A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
app.put('/api/courses/:id', authenticateUser, (async (req, res) => {
  try {
    const id  = req.params.id;
    console.log("ID: ", id);
    const { title, description, estimatedTime, materialsNeeded, userId } = req.body;

    const course = await Course.findOne({ where: { id: id }});
    console.log(course);
    await course.update({
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    });

    res.status(204).send();
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ "message": error });
    } else {
      res.status(500).json({ "message": error });
    }
  }                            
  
}));
// A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
app.delete('/api/courses/:id', authenticateUser, (async (req, res) => {
  try {
    const id = req.params.id;
  const course = await Course.findByPk(id);
  
  await course.destroy();
  res.status(204).send();
  } catch (error) {
    res.status(500).json({ "message": error });
  }
  
}));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Test DB Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Synchronizing the models with the database...');
    // let courses = await Course.findAll();
    // console.log(courses);
    // let users = await User.findAll();
    // console.log(users);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

})();

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
