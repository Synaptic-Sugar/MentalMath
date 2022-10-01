const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/leaderboardApi.js');
const userRouter = require('./routes/userApi.js');

// Code convention: production port is on 3000
const PORT = 3000;
app.use(express.json());

console.log('received request');
app.use('/leaderboardApi', apiRouter);
app.use('/userApi', userRouter);

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));
// Respond with index.html for inital webpage
// If index.html is in same folder as css VV
// app.use('/', express.static(path.join(__dirname, '../dist/build')));
// app.use(express.static(path.resolve(__dirname, '../client')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
app.get('/client/styles/main.scss', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/styles/main.scss'));
});

// Unknown route handler, if a request is sent to a url that doesn't exist this sends a 404
app.use((req, res) => res.sendStatus(404));

// Global error handler, will trigger if any errors occur when handling requests
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error occured during middleware execution',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
// Starts server listening on port 
app.listen(PORT, () => console.log(`Server started. Listening on PORT: ${PORT}`));