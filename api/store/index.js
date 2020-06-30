var express = require("express");
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();
 
router.post('/create', async(req, res)=>{

  const body = req.body.json;

  console.log(body)

  fetch('https://api.mercadopago.com/users/'+process.env.COLLECTOR_ID+'/stores?access_token='+process.env.ACCESS_TOKEN, {
        method: 'post',
        body:    body,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(r => r.json())
    .then(json => res.status(200).json(json));
})

  // exportar de router
  module.exports = router;