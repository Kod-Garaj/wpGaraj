const amqp = require("amqplib");
const fs = require("fs");
const { execSync } = require("child_process");

connectToRabbitMQ();

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("wpgaraj", { durable: true });
    channel.prefetch(1);
    channel.consume("wpgaraj", (msg) => {
      if (msg !== null) {
        const { url } = JSON.parse(msg.content.toString());
        console.log(`[O] ${url} işleme başladı.`);
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
          // return res.json({
          //   status: false,
          //   message: "Bu sitenin önceden çalıştırılması var.",
          // });
        }

        try {
          for (let i = 0; i < komutlar.length; i++) {
            console.log(i, komutlar[i]);
            execSync(komutlar[i]);
          }

          console.log(` [√] ${url} tamamlandı.`);
          channel.ack(msg);

        } catch (error) {
          console.log(JSON.stringify(error));
          console.log(`[x] ${url} işlenemedi`);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}
