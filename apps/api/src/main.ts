// Imports
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';
import { environment } from './environments/environment';
import * as path from 'path';
import { MessegeModel } from '../../shared/messege.model';

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

  socket.on('event', (data: MessegeModel) => {
    console.log(data);

    socket.broadcast.emit('event', data);
  });
});

// API
app.get('/api', (req, res) => {
  res.send({message: `Welcome to api!`});
});

const chat: MessegeModel[] = [{ msg: `Hello there!` }, { msg: `What's up?` }];

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
