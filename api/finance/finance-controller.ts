import db from '../../db';

const getProductStatSum = (req: any, res: any) => {
  db.query(
    'SELECT product.name, order_product.product_id, COUNT(order_product.product_id) FROM order_product INNER JOIN product ON order_product.product_id = product.product_id GROUP BY product.name, order_product.product_id',
    (err: Error, result: any) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ data: result.rows });
    }
  );
};

export { getProductStatSum };
