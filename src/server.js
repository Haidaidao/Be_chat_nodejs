require('dotenv').config()
const express = require('express');
const http = require('http');
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const apiRoutes = require('../src/routes/api')
const connection = require('../src/config/database')
const Chat = require('../src/models/chat');

const port = process.env.PORT


app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded( )); //Parse URL-encoded bodies

app.use('/v1/api', apiRoutes)


;(async () => {
  try{
    await connection()

    io.on('connection', (socket) => {
      console.log('New client connected');
    
      socket.on('send_message', async (data) => {
          const newMessage = new Chat({
              text: data.text,
              user: data.user 
          });
      
          newMessage.save()
              .then((savedMessage) => {
                  io.emit('new_message', savedMessage);
              })
              .catch(err => console.error(err));
      });

      Chat.find().sort({ _id: 1 })
        .then(messages => {

          socket.emit('history', messages);
        })
        .catch(err => console.error(err));
      
      socket.on('disconnect', () => {
          console.log('Client disconnected');
      });
    });

    server.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  } catch(error) {
    console.log(error)
  }
  
})()

