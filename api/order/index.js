const express = require('express');
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
 
router.post('/create', async(req, res)=>{

  const external_id = req.query.external_id
  const body = req.body.json;
  console.log(body);

  fetch('https://api.mercadopago.com/mpmobile/instore/qr/'+process.env.COLLECTOR_ID+'/'+external_id+'?access_token='+process.env.ACCESS_TOKEN, {
        method: 'post',
        body:    body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(json => res.status(200).json(json));
})

router.get('/status', async(req, res)=>{

    const external_reference = req.query.external_reference;
    console.log(external_reference)
    console.log('https://api.mercadopago.com/merchant_orders/search?external_reference='+external_reference+'&access_token='+process.env.ACCESS_TOKEN)
    fetch('https://api.mercadopago.com/merchant_orders/search?external_reference='+external_reference+'&access_token='+process.env.ACCESS_TOKEN)
      .then(r => r.json())
      .then(json => res.status(200).json(json));
  })

router.delete('/delete', async(req, res)=>{

    const external_id = req.query.external_id;
    console.log('https://api.mercadopago.com/mpmobile/instore/qr/'+process.env.COLLECTOR_ID+'/'+external_id+'?access_token='+process.env.ACCESS_TOKEN)
    fetch('https://api.mercadopago.com/mpmobile/instore/qr/'+process.env.COLLECTOR_ID+'/'+external_id+'?access_token='+process.env.ACCESS_TOKEN)
      .then(r => r.json())
      .then(json => res.status(200).json(json));
  })


  // exportar de router
  module.exports = router;