const express = require('express'); // KRÄV express
const app = express(); // SKAPA en express-applikation
const http = require('http'); // KRÄV http (node)
const server = http.createServer(app); // SKAPA server av typen Express

const { Server } = require("socket.io"); // KRÄV Socket.io-biblioteket och klassen Server
//      ^----^ Klass

const io = new Server(server); // INKLUDERA Socket.io
//         ^--------^ Ny instans av Server-klassen
// ANVÄND middleware för statiska filer
app.use(express.static('public'));

// DEFINIERA portnummer
const PORT = 3000;

// LYSSNA på port
server.listen(PORT, () => {
    console.log('Listening on port*:' + PORT);
});

// HANTERA GET-request
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html'); // SKICKA fil
});

app.get('/all', (req, res) => {

    res.sendFile(__dirname + '/all.html'); // SKICKA fil
});

app.get('/chat', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/chat.html'); // SKICKA fil
});

app.get('/search', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/search.html'); // SKICKA fil
});

app.get('/api-test', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/api-test.html'); // SKICKA fil
});

app.get('/create', (req, res) => { // HANTERA GET-request

    res.sendFile(__dirname + '/create.html'); // SKICKA fil
  });


  const mainRoom = "main room";
  const waitingRoom = "waiting room";
  let peopleInMainRoom = 0;

  io.on('connection', (socket) => { // PÅ händelsen connection | NIVÅ: I/O (input/output)

    peopleInMainRoom++; // ÖKA antalet personer i main room med 1

    if(peopleInMainRoom <= 2) { // OM antalet personer i main room är mindre eller lika med 2, gör följande

      socket.join(mainRoom);

      socket.emit('server message', 'Welcome to the chat room! Feel free to ask us anything.')

      console.log("People in main room: " + peopleInMainRoom);
    }
    else {
      socket.join(waitingRoom);
      socket.emit('server message', 'Welcome to the waiting room! ')
      socket.emit('server message', 'You are placed in line... Please hold!')
    }

    socket.on('disconnect', () => { // PÅ händelsen disconnect | NIVÅ: SOCKET (anslutning)
      console.log('A user disconnected');
      peopleInMainRoom--;
    });

    socket.on('chat message', (message) => {

      io.to(mainRoom).emit('chat message', message); // YTTRA (skicka) händelsen chat message till main room
    })
  });
