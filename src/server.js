const app = require('./app');

const server = app.listen(3001, () => {
  console.log('Express App Listening on Port 3001');
});

server.once('error', (err) => {
  console.error(`An error occurred: ${JSON.stringify(err)}`);
  process.exit(1);
});
