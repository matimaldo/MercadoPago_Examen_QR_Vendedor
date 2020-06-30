const express = require('express');
const router = express.Router()
var dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

global.buscar = ''
 
router.get('/get', async(req, res)=>{

     if(global.buscar !=''){
       fetch(global.buscar+'?access_token='+process.env.ACCESS_TOKEN)
         .then(r => r.json())
         .then(json => res.status(200).json(json));
     }
    res.status(200).json('OK')
  })

  router.post('/notifications', async(req, res)=>{
  
    console.log('Notificacion'); 
    console.log(req.body);;
    const body = req.body;
    if(body.topic == 'payment'){
      global.buscar = body.resource
    }
    res.status(200).json('OK')
})

  // exportar de router
  module.exports = router;