// Imports
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';

// Server/App configuration
const port = process.env.port || 3333;

const app = express();
app.use(morgan('combined'));

const server = http.createServer(app);

// WebSocket
const io = require('socket.io')(http);
io.origins('*:*');

io.on('connection', function(socket){
  console.log('a user connected');
});

// API
app.get('/api', (req, res) => {
  res.send({message: `Welcome to api!`});
});

// Bootstrap
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${port}`);
});
