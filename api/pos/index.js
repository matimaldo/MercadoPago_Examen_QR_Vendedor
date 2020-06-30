const express = require('express');
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
 
router.post('/create', async(req, res)=>{

  const body = req.body.json;

  console.log(body)
  console.log('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN)

  fetch('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN, {
        method: 'post',
        body:    body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(json => res.status(200).json(json));
})

router.get('/get', async(req, res)=>{

    const body = req.query.external_id;
  
    console.log(body)
  
    fetch('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN+'&external_id='+body)
      .then(r => r.json())
      .then(json => res.status(200).json(json));
  })

  // exportar de router
  module.exports = router;