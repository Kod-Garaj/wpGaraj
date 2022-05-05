const { exec } = require("child_process");

function execAsync(komut) {
  return new Promise((resolve, reject) => {
    exec(komut, (err, stdout, stderr) => {
      if (err) {
        return reject({
          error: err,
          errorType: "error",
        });
      }

      // if (stderr) {
      //   return reject({
      //     error: stderr,
      //     errorType: "stderr",
      //   });
      // }

      resolve({ stdout });
    });
  });
}

module.exports = {
  execAsync,
};
