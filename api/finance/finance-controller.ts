import db from '../../db/db';

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

const getTotalSumRevenue = (req: any, res: any) => {
  db.query(
    'SELECT SUM (quantity*price) as total_price from order_product INNER JOIN product on order_product.product_id = product.product_id INNER JOIN orders on order_product.order_id = orders.order_id where done = true',
    (err: Error, result: any) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ data: result.rows });
    }
  );
};

const getTotalOrderedProduct = (req: any, res: any) => {
  db.query(
    'SELECT SUM (quantity) as total_order from order_product INNER JOIN product on order_product.product_id = product.product_id INNER JOIN orders on order_product.order_id = orders.order_id where done = true',
    (err: Error, result: any) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ data: result.rows });
    }
  );
};

export { getProductStatSum, getTotalSumRevenue, getTotalOrderedProduct };
