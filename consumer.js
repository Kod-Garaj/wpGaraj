const amqp = require("amqplib");
const fs = require("fs");
const { execSync } = require("child_process");
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000", {
  autoConnect: false,
  reconnectionAttempts: 10,
  reconnectionDelay: 6000,
  // timeout: 10 * (60 * 1000),
});

socket.connect();

socket.on("connect", () => {
  console.log("Soket bağlandı.");
  consumerCalistir();
  pingPongCalistir();
});

socket.on("disconnect", () => {
  console.log("Soket bağlantısı kesildi.");
});

socket.on("connect_error", (error) => {
  console.error("HATA: Soket bağlantısı kesildi.");
  console.error(error);
});

async function consumerCalistir() {
  try {
    console.log("RabbitMQ bağlantısı kuruluyor... Consumer çalışıyor.");

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("wpgaraj", { durable: true });
    channel.prefetch(1);

    channel.consume("wpgaraj", async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        const { url } = data;

        console.log(`RMQ: [O] ${url} işleme başladı.`);

        const isWin = process.platform === "win32";

        const repoUrl = "https://github.com/Kod-Garaj/react-native-ref.git";
        let basePath = `${__dirname}/siteler/${url}/`;
        basePath = isWin ? basePath.replaceAll("/", "\\") : basePath;
        const komutlar = [
          `git clone ${repoUrl} ${basePath}`,
          `npm install --prefix ${basePath}`,
          // `cd ${basePath} && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ${
          //   isWin ? "gradlew" : "./gradlew"
          // } assembleDebug`,
          // `cd ${basePath} && react-native run-android --variant=release`,
        ];

        if (fs.existsSync(`${basePath}`)) {
          if (isWin) {
            execSync(`rmdir /Q /S ${basePath}`);
          } else {
            execSync(`rm -rf ${basePath}`);
          }

          // socket.emit("mobil:uygulama-silindi", { ...data });
        }

        socket.emit("mobil:uygulama-isleniyor", { ...data, durum: "ISLENIYOR" });

        for (let i = 0; i < komutlar.length; i++) {
          console.log(i, komutlar[i]);
          execSync(komutlar[i]);
        }

        channel.ack(msg);
        socket.emit("mobil:uygulama-tamamlandi", { ...data, durum: "TAMAMLANDI" });

        console.log(`RMQ: [√] ${url} tamamlandı.`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function pingPongCalistir() {
  socket.on("ping", () => {
    socket.emit("pong");
  });

  setInterval(() => {
    socket.emit("ping");
  }, 5000);
}
