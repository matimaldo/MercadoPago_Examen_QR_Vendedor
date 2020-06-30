const express = require('express');
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
 
router.post('/create', async(req, res)=>{

  const body = req.body.json;

  fetch('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN, {
        method: 'post',
        body:    body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(json => res.status(200).json(json));
})

router.get('/get', async(req, res)=>{

    const external_id = req.query.external_id;
   
    fetch('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN+'&external_id='+external_id)
      .then(r => r.json())
      .then(json => {
        console.log(json);
        res.status(200).json(json)
      });
  })

  // exportar de router
  module.exports = router;