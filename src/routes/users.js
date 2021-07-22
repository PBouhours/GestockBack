const express = require('express');
const cors = require('cors')

const router = express.Router();
const pool = require('../config/db-config');

router.post('/create', (request, response) => {
  const { username, password } = request.body;
  pool.query(
    'INSERT INTO user (username, password) VALUES (?,?)',
    [username, password],
    (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send(result);
      }
    }
  );
});

router.post('/login', cors(),  (request, response) => {
  const { username, password } = request.body;
  pool.query('Select * FROM user WHERE username = ? AND password = ?', [username, password], (error, result) => {
    
    if (error) {
      response.status(500).send(error);
    } else if (result <= 0 ) {
      response.status(404).json({
        acces:false,
        message: 'username or password invalid'
      })
    } else {
      response.status(200).json({
        acces:true,
        result,
      })
    }
  })
})
 

module.exports = router;