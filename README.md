# wpGaraj

## Projeyi Ayağa Kaldırmak

Sunucuya [RabbitMQ Server](https://www.rabbitmq.com/download.html) ve [Redis](https://redis.io/docs/getting-started/) kurulumu yapılacak. Bu repoyu klonladıktan sonra `npm install` yapılıp;

- `rabbitmq-server` diyerek rabbitmq sunucusunu başlatıyoruz (Windows'ta kurulum yaptıktan sonra otomatik başlar. Eğer başlamadıysa "Başlat" menüsünden "RabbitMQ Service - start" yazıp çalıştırabilirsiniz).
- `sudo service redis-server start` diyerek Redis sunusunu çalıştırıyoruz.
- `npm start` diyerek sunucuya bağlanıp projeyi çalıştırıyoruz.
- `npm run consumer` diyerek dilediğimiz kadar consumer oluşturarak istekler karşılanır.
