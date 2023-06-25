import { Request, Response } from 'express';
import db from '../../db/db';
import { type } from 'os';

const express = require('express');

const getCustomer = (req: any, res: any) => {
  const page = parseInt(req.params.page) < 1 ? 0 : parseInt(req.params.page);
  const itemPage = (page - 1) * 5;
  db.query(
    'SELECT orders.order_id, orders.done, orders.date, customer.*  FROM orders  INNER JOIN customer ON orders.customer_id = customer.id AND orders.done = $1 ORDER BY date DESC LIMIT 5 OFFSET $2',
    [req.params.done, itemPage],
    (err: Error, results: any) => {
      if (err) {
        res.status(401).json({ message: err });
      }
      res.status(200).json({ data: results.rows });
    }
  );
};

const finishOrder = (req: any, res: any) => {
  db.query(
    'UPDATE orders SET done = $1  WHERE order_id = $2 RETURNING *',
    [true, req.body.order_id],
    (err: Error, result: any) => {
      if (err) {
        res.status(401).json({ message: err });
      }
      res
        .status(200)
        .json({ data: result, message: 'success to finish order' });
    }
  );
};

const getTotalRows = (req: any, res: any) => {
  db.query(
    'SELECT COUNT(*) FROM orders INNER JOIN customer ON orders.customer_id = customer.id AND orders.done = $1',
    [req.params.done],
    (err: Error, results: any) => {
      if (err) {
        res.status(401).json({ message: err });
      } else {
        res.status(200).json({ data: results.rows[0] });
      }
    }
  );
};

const revokeFinishOrder = (req: Request, res: Response) => {
  db.query(
    'UPDATE orders SET done = $1  WHERE order_id = $2 RETURNING *',
    [false, req.body.order_id],
    (err: Error, result: any) => {
      if (err) {
        res.status(401).json({ message: err });
      }
      res
        .status(200)
        .json({ data: result, message: 'success to revoke finish order' });
    }
  );
};

const getDetail = (req: Request, res: Response) => {
  db.query(
    'SELECT orders.order_id, customer_id, product.product_id, quantity, note, name, price from orders INNER JOIN order_product on orders.order_id = order_product.order_id INNER JOIN product on order_product.product_id = product.product_id WHERE customer_id = $1',
    [req.params.id],
    (err: Error, results: any) => {
      if (err) {
        res.status(401).json({ message: err });
      }
      res.status(200).json({ data: results.rows });
    }
  );
};

const insertOrder = async (req: Request, res: Response, next: any) => {
  const dateNow = new Date();
  const date = dateNow.toISOString();
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO customer (name, number, adress) values ($1, $2, $3) RETURNING id',
      [req.body.name, req.body.number, req.body.adress]
    );

    const resultOrder = await client.query(
      `INSERT INTO orders(customer_id, date) VALUES ($1, $2) RETURNING order_id`,
      [result.rows[0].id, date]
    );

    for (let i = 0; i < req.body.order.length; i++) {
      let note: string = req.body.order[i].note
        ? req.body.order[i].note
        : 'tidak ada catatan';
      const resultOrderProduct = await client.query(
        'INSERT INTO order_product(order_id, product_id, quantity, note) VALUES ($1, $2, $3, $4);',
        [
          resultOrder.rows[0].order_id,
          req.body.order[i].product_id,
          req.body.order[i].quantity,
          note,
        ]
      );
    }
    res.status(200).json({ status: 'success' });
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      'DELETE FROM order_product WHERE order_id = $1 returning *',
      [req.params.id]
    );
  } catch (err) {
    console.log(err);
  }
};

export {
  getCustomer,
  deleteCustomer,
  insertOrder,
  getDetail,
  finishOrder,
  revokeFinishOrder,
  getTotalRows,
};
