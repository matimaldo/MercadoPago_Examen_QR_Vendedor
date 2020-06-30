const express = require('express');
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
 
router.post('/create', async(req, res)=>{

  const external_id = req.query.external_id
  const body = req.body.json;

  fetch('https://api.mercadopago.com/mpmobile/instore/qr/'+process.env.COLLECTOR_ID+'/'+external_id+'?access_token='+process.env.ACCESS_TOKEN, {
        method: 'post',
        body:    body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(json => res.status(200).json(json));
})

router.get('/get', async(req, res)=>{

    // const body = req.query.external_reference;
  
    // fetch('https://api.mercadopago.com/pos?access_token='+process.env.ACCESS_TOKEN+'&external_id='+body)
    //   .then(r => r.json())
    //   .then(json => res.status(200).json(json));
    res.status(200)
  })

router.get('/status', async(req, res)=>{

    const body = req.query.external_reference;
  
    fetch('https://api.mercadopago.com/merchant_orders/search?external_reference='+body+'&access_token='+process.env.ACCESS_TOKEN)
      .then(r => r.json())
      .then(json => res.status(200).json(json));
  })

  // exportar de router
  module.exports = router;