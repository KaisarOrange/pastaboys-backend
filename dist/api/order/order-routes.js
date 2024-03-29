"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("./order-controller");
// // const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: {
//     args: ['--no-sandbox'],
//   },
// });
const qrcode = require('qrcode-terminal');
const express = require('express');
const router = express.Router();
const passport = require('passport');
// client.on('qr', (qr: any) => {
//   qrcode.generate(qr, { small: true });
// });
// client.on('ready', () => {
//   console.log('Client is ready!');
// });
// client.on('message', (message: any) => {
//   if (message.body === '!ping') {
//     message.reply('Halo ini pesan otomatis');
//   }
// });
// client.on('authenticated', (session: any) => {
//   console.log('WHATSAPP WEB => Authenticated');
// });
// const sendMessagetoPasya = (req: any, res: any) => {
//   const ordera = req.body.order.map((e: any) => {
//     switch (e.product_id) {
//       case 1:
//         return `Carbonara ${e.quantity} `;
//       case 2:
//         return `Chicken Mushroom ${e.quantity} `;
//       case 5:
//         return `Fettuccine Mushroom ${e.quantity} `;
//     }
//   });
//   client.getChats().then((chat: any) => {
//     const myGroup = chat.find((e: any) => e.name === 'URUSAN DAGANG');
//     client.sendMessage(
//       myGroup.id._serialized,
//       `*New Order*\nNama: ${req.body.name}\nNo.Hp: ${req.body.number}\nPesanan: ${ordera}`
//     );
//     console.log('Order message sent to Group!');
//   });
// };
// client.initialize();
router.get('/getOrder/:done/:page', order_controller_1.getCustomer);
router.get('/detail/:id', order_controller_1.getDetail);
router.get('/totalrows/:done', order_controller_1.getTotalRows);
router.get('/test', (req, res) => {
    res.status(200).json({ data: req.user });
});
router.put('/finishOrder', order_controller_1.finishOrder);
router.put('/revokeFinishOrder', order_controller_1.revokeFinishOrder);
router.post('/pesan', order_controller_1.insertOrder);
// router.post('/pesan', insertOrder, sendMessagetoPasya);
router.delete('/delete/:id', order_controller_1.deleteCustomer);
module.exports = router;
