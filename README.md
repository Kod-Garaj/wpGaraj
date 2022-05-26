# wpGaraj

## Projeyi Ayağa Kaldırmak

İlk önce sunucu üzerinde [NodeJS](https://nodejs.org/en/), [RabbitMQ Server](https://www.rabbitmq.com/download.html) ve [Redis](https://redis.io/docs/getting-started/) kurulumunu gerçekleştirin. Daha sonra aşağıdaki adımları izleyin:

- Uygulamayı `git clone https://github.com/Kod-Garaj/wpGaraj.git` komutunu çalıştırarak klonlayın.
- Uygulama klasörüne yönlendikten sonra `npm install` yapıp tüm paketlerin kurulumunu sağlıyoruz. *(Klonlamayı yaptığınız klasörün altında yer alan **wpGaraj** klasörüne yönlenerek komutu çalıştırın. Örn: **/htdocs/wpGaraj/**)*
- `rabbitmq-server` komutunu çalıştırarak RabbitMQ sunucusunu başlatıyoruz (Windows'ta kurulum yaptıktan sonra otomatik başlar. Eğer başlamadıysa "**Başlat**" menüsünden "**RabbitMQ Service - start**" olarak arayıp çalıştırabilirsiniz).
- `sudo service redis-server start` komutunu çalıştırarak Redis sunucumuzu çalıştırıyoruz.
- `npm start` komutunu çalıştırarak NodeJS sunucumuzu çalıştırıyoruz.
- `npm run consumer` komutunu çalıştırarak dilediğimiz kadar consumer oluşturarak istekleri karşılayabilirsiniz.
