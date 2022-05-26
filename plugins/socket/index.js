

module.exports = {
  socket: (httpServer) => {
    const io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    const mobilOlusturHandler = require("./mobilOlustur");

    const onConnection = (socket) => {
      mobilOlusturHandler(io, socket);
      console.log("Soket bağlandı.");
    }

    console.log("Soket hazır.");
    io.on("connection", onConnection);
  }
};