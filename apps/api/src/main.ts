// Imports
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';
import { environment } from './environments/environment';
import * as path from 'path';

// Server/App configuration
const port = process.env.port || 3333;

const app = express();
app.use(morgan('combined'));

const server = http.createServer(app);

if (environment.production) {
  app.use(express.static(path.join(__dirname , '../client')));
}

// WebSocket
const io = require('socket.io')(server);
io.origins('*:*');

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('event', data => {
    console.log(data);

    socket.broadcast.emit(data);
  });
});

// API
app.get('/api', (req, res) => {
  res.send({message: `Welcome to api!`});
});

const chat = [`Hello there!`, `What's up?`];

app.get('/api/chat', (req, res) => {
  res.send(chat);
});

// Bootstrap
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${port}`);
});
