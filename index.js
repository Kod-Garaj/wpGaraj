const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { execAsync } = require("./utils");
const { execSync } = require("child_process");
const fs = require('fs');
const port = 3000;

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/calistir", async (req, res) => {
  const { url } = req.body;

  const repoUrl = "https://github.com/Kod-Garaj/react-native-ref.git";
  const basePath = `${__dirname}/siteler/${url}/`;
  const komutlar = [
    `git clone ${repoUrl} ${basePath}`,
    `npm install --prefix ${basePath}`,
    `cd ${basePath} && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug`,
    // `cd ${basePath} && react-native run-android --variant=release`,
  ];

  if (fs.existsSync(`${basePath}`)) {
    execSync(`rm -rf ${basePath}`);
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

    return res.json({
      status: true,
      message: "Başarılı",
    });
  }
  catch (error) {
    console.log(JSON.stringify(error));
    return res.json({
      ...error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
