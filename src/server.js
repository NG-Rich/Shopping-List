const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "3000");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("port", port);
server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if(isNaN(port)) {
    return val;
  }

  if(port >= 0) {
    return port;
  }

  return false;
}

var clients = 0;
io.on("connection", (socket) => {
  console.log("A user connected");
  clients++;

  socket.on('item message', (msg) => {
    
    io.emit('item message', msg);
  });

  socket.on("disconnect", () => {
    clients--;
    console.log("A user disconnected");
  })
});

server.on("listening", () => {
  console.log(`Server is listening to requests on port ${server.address().port}`);
});
