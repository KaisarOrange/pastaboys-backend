import { Request, Response } from 'express';
import db from '../db';

const express = require('express');

const getCustomer = (req: Request, res: Response) => {
  db.query('SELECT * FROM customer', (err: Error, results: any) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ data: results.rows });
  });
};

const insertOrder = async (req: Request, res: Response) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO customer (name, number, adress) values ($1, $2, $3) RETURNING id',
      [req.body.name, req.body.number, req.body.adress]
    );
    //console.log('Customer ID ', result.rows[0].id);

    const resultOrder = await client.query(
      'INSERT INTO orders(customer_id) VALUES ($1) RETURNING id',
      [result.rows[0].id]
    );

    for (let i = 0; i < req.body.order.length; i++) {
      let note: string = req.body.order[i].note
        ? req.body.order[i].note
        : 'tidak ada catatan';

      const resultOrderProduct = await client.query(
        'INSERT INTO order_product(order_id, product_id, quantity, note) VALUES ($1, $2, $3, $4);',
        [
          resultOrder.rows[0].id,
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

export { getCustomer, deleteCustomer, insertOrder };
