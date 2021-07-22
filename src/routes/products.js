const express = require('express');

const router = express.Router();
const pool = require('../config/db-config');


router.post('/search/:query', (request, response) => {
  const { userId } =request.body;
  const { query } = request.params;
  pool.query('SELECT * FROM product WHERE user_id = ? AND reference LIKE ? OR name LIKE ?', [userId,`%${query}%`, `%${query}%`], (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).json(result);
    }
  })
})

router.post('/create', (request, response) => {
  const { reference, name, size, gender, quantity, userId } = request.body;
  pool.query(
    'INSERT INTO product (reference, name, size, gender, quantity, user_id) VALUES (?,?,?,?,?,?)',
    [reference, name, size, gender, quantity, userId],
    (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send(result);
      }
    }
  );
});

router.post('/:id', (request, response) => {
  const { userId } = request.body
  const { id } = request.params;
  pool.query('SELECT * FROM product WHERE id = ? AND user_id = ?', [id, userId], (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else if (result.length > 0) {
      response.send(result[0]);
    } else {
      response.status(404).send('No product Found');
    }
  });
});


router.post('/', (request, response) => {
  const { userId } = request.body
  pool.query('SELECT * FROM product WHERE user_id = ? ',[userId], (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).json(result);
    }
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params
  pool.query('DELETE FROM product WHERE id = ?', [id], (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else if (result.affectedRows > 0) {
      response.status(204).send(result);
    } else {
      response.status(404).send('product not Found');
    }
  });
});

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { reference, name, size, gender, quantity, userId } = request.body;
  pool.query(
    'UPDATE product SET reference = ? , name = ?, size = ?, gender = ?, quantity = ? WHERE id = ? AND user_id = ?',
    [reference, name, size, gender, quantity, id, userId],
    (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(204).send(result);
      }
    }
  );
});

module.exports = router;