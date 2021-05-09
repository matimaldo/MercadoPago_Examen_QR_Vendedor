// import express from 'express'
const express = require('express');
const router = express.Router()
const schedule = require('node-schedule');
const fetch = require('node-fetch');

var sec = []

for (let index = 0; index < 60; index=index+10) {
  sec.push(index);
  // console.log(index);
}

const rule = new schedule.RecurrenceRule();
rule.second = 0;
rule.minute = [0,29,30,59];
rule.hour = [new schedule.Range(0, 23)];
rule.dayOfWeek = [new schedule.Range(0, 6)];

const job = schedule.scheduleJob(rule, function(){
  console.log('Ejecucion! ' + new Date);

  fetch('https://matimaldo-mercadopago-qr.herokuapp.com/uno/dos.jpg', {
    method: 'get'        
  })
})
  // exportar de router
  module.exports = router;