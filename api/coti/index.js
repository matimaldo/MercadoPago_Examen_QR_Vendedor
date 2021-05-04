const express = require('express');
const router = express.Router()
const cherrio = require('cheerio')
const request = require('request-promise')

async function init(fecha) {

    var date = fecha.replace(/\//g, "%2F");

    const $ = await request({
    uri: 'https://www.bna.com.ar/Cotizador/HistoricoPrincipales?id=billetes&fecha='+date+'&filtroEuro=0&filtroDolar=1',
        transform: body => cherrio.load(body)
    });
    var valores = []
    const data = $('tr').each((i,el) => {
        const tags = [] 
        if($(el).find('th').length == 0){
            $(el).find('td').each((i,e)=> tags.push($(e).text()))
        }
        valores.push(tags)
    }) 
    var dato = []
    for (let index = 0; index < valores.length; index++) {
        if(valores[index].length > 0){
            var reg = {}
            reg.moneda = valores[index][0]
            reg.valCompra = valores[index][1]
            reg.valVenta = valores[index][2]
            var div = (valores[index][3]).split('/')
            reg.fecha = (div[0].length == 1 ? '0'+ div[0] : div[0] ) + '/' + ( div[1].length == 1 ? '0'+ div[1] : div[1] ) + '/' + div[2]
            dato.push(reg);
        }
    }
    return dato
}


router.get('/dolar', async(req, res)=>{
    console.log(req.query.fecha);
    var rdo = await init(req.query.fecha)
    console.log(rdo);
    res.status(200).json(rdo)
})


    // exportar de router
    module.exports = router;