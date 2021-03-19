const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { dbConnect, Message } = require('./db/mongo');
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });

dbConnect();

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

wsServer.on('connection', (client) => {
  client.on('message', async (text) => {
    console.log('received: ===>', text);
    Message.create({ text });
    wsServer.clients.forEach((thisClient) => thisClient.send(text));
  });
});

app.route('/').get(async (req, res) => {
  const messages = await Message.find();
  res.render('index', { messages });
});
// .post(async (req, res) => {
//   console.log('  REQ.BODY ======>>>', req.body);
//   await Message.create(req.body);
//   res.redirect('/');
// });

app.listen(3000, async () => await Message.deleteMany());
