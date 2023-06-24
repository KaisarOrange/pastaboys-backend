import { authToken } from '../../middleware/authMiddle';
import {
  deleteCustomer,
  getCustomer,
  insertOrder,
  getDetail,
  finishOrder,
  revokeFinishOrder,
  getTotalRows,
} from './order-controller';
import { authCheck } from '../../middleware/authCheck';
const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
});
const qrcode = require('qrcode-terminal');
const express = require('express');
const router = express.Router();
const passport = require('passport');

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

const sendMessagetoPasya = (req: any, res: any) => {
  const ordera = req.body.order.map((e: any) => {
    switch (e.product_id) {
      case 1:
        return `Carbonara ${e.quantity} `;
      case 2:
        return `Chicken Mushroom ${e.quantity} `;
      case 3:
        return `Fettuccine Mushroom ${e.quantity} `;
    }
  });
  client.getChats().then((chat: any) => {
    const myGroup = chat.find((e: any) => e.name === 'URUSAN DAGANG');
    client.sendMessage(
      myGroup.id._serialized,
      `*New Order*\nNama: ${req.body.name}\nNo.Hp: ${req.body.number}\nPesanan: ${ordera}`
    );
    console.log('Order message sent to Group!');
  });
};

client.initialize();

router.get('/getOrder/:done/:page', getCustomer);
router.get('/detail/:id', getDetail);
router.get('/totalrows/:done', getTotalRows);

router.get('/test', (req: any, res: any) => {
  res.status(200).json({ data: req.user });
});

router.put('/finishOrder', finishOrder);
router.put('/revokeFinishOrder', revokeFinishOrder);

router.post('/pesan', insertOrder, sendMessagetoPasya);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;
