const { redisClient } = require("../redis");
const sirayaEkle = require("../rabbitmq");

module.exports = (io, socket) => {
  const odayaGir = async (data) => {
    const kullaniciId = data.kullanici.id;

    const islemler = await redisClient.get(kullaniciId + ":*");

    socket.join(kullaniciId);
    socket.emit("mobil:odaya-girildi", {
      status: true,
      message: "Odaya giriş yapıldı.",
      islemler,
    });

    console.log("Odaya giren kullanıcı bilgileri:", data.kullanici);
  };

  const uygulamaOlustur = async (data) => {
    try {
      const kullaniciId = data.kullanici.id;
      const redisId = kullaniciId + ":" + data.url;

      sirayaEkle(data);

      await redisClient.set(redisId, "SIRAYA_ALINDI");

      io.to(kullaniciId).emit("mobil:oda-bildirim", {
        status: true,
        message: "Uygulama oluşturma sıraya eklendi.",
        durum: "SIRAYA_ALINDI",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const uygulamaIsleniyor = async (data) => {
    try {
      const kullaniciId = data.kullanici.id;
      const redisId = kullaniciId + ":" + data.url;

      await redisClient.set(redisId, "ISLENIYOR");

      io.to(kullaniciId).emit("mobil:oda-bildirim", {
        status: true,
        message: "Uygulama işleniyor.",
        durum: "ISLENIYOR",
      });

      console.log(data.url + " uygulaması işleniyor.");
    } catch (error) {
      console.error(error);
    }
  };

  const uygulamaSilindi = async (data) => {
    try {
      console.log("Uygulama silindi bilgisi:", data);
      // await redisClient.set(data.url, null);
    } catch (error) {
      console.error(error);
    }
  };

  const uygulamaTamamlandi = async (data) => {
    const kullaniciId = data.kullanici.id;
    const redisId = kullaniciId + ":" + data.url;

    await redisClient.set(redisId, "TAMAMLANDI");

    io.to(kullaniciId).emit("mobil:oda-bildirim", {
      status: true,
      data: data,
      message: "Uygulamanız hazır!",
      durum: "TAMAMLANDI",
    });

    console.log("Uygulama tamamlandı bilgisi:", data);
  };

  socket.on("mobil:odaya-gir", odayaGir);
  socket.on("mobil:uygulama-olustur", uygulamaOlustur);
  socket.on("mobil:uygulama-isleniyor", uygulamaIsleniyor);
  socket.on("mobil:uygulama-tamamlandi", uygulamaTamamlandi);
  socket.on("mobil:uygulama-silindi", uygulamaSilindi);
};
