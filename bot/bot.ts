const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
let sessionData;
const client = new Client({
  authStrategy: new LocalAuth(),
});
const fs = require('fs');
const qrcode = require('qrcode-terminal');

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message: any) => {
  console.log(message.body);
});
client.on('message', (message: any) => {
  if (message.body === '!ping') {
    message.reply('Halo ini pesan otomatis');
  }
});

client.on('authenticated', (session: any) => {
  console.log('WHATSAPP WEB => Authenticated');
});
client.initialize();
