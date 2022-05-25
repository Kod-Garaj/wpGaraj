# wpGaraj

## Projeyi Ayağa Kaldırmak

İlk önce sunucu üzerinde [NodeJS](https://nodejs.org/en/), [RabbitMQ Server](https://www.rabbitmq.com/download.html) ve [Redis](https://redis.io/docs/getting-started/) kurulumunu gerçekleştirin. Daha sonra aşağıdaki adımları izleyin:

- Uygulama klasörüne *(örn; /htdocs/wpGaraj/)* yönlendikten sonra `npm install` yapıp tüm paketlerin kurulumunu sağlıyoruz.
- `rabbitmq-server` diyerek rabbitmq sunucusunu başlatıyoruz (Windows'ta kurulum yaptıktan sonra otomatik başlar. Eğer başlamadıysa "Başlat" menüsünden "RabbitMQ Service - start" yazıp çalıştırabilirsiniz).
- `sudo service redis-server start` diyerek Redis sunusunu çalıştırıyoruz.
- `npm start` diyerek sunucuya bağlanıp projeyi çalıştırıyoruz.
- `npm run consumer` diyerek dilediğimiz kadar consumer oluşturarak istekler karşılanır.
