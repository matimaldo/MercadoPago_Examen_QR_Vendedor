const express = require('express');
const router = express.Router()
const cherrio = require('cheerio')
const request = require('request-promise')
const puppeteer = require('puppeteer')

const Tesseract = require('tesseract.js')
const Jimp = require("jimp");

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

router.get('/test', async(req, res) =>{

    let url = 'http://www8.arba.gov.ar/AvisoDeudas/?imp=0'

    // let browser = await puppeteer.launch();
    let browser = await puppeteer.launch({headless: false });
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2'});

    await page.type('#inmoPrefijo', '121')
    await page.type('#inmoClave', '007480')
    await page.type('#captcha-respuesta', '8uxjw')
    // await page.type('#captcha-token', '32ec00ff6f87893c6e5dfc145e280f17379a73ab0279e7de1128fa886c73c5a7')

    await page.evaluate(()=>{
        document.getElementById("captcha-token").type = Text
        document.getElementById("captcha-token").value = "705f995de5e124f8c369414094527914c2969afd5ed28877bf1e20ff1cd8ad78"
        console.log(document.getElementById("captcha-token").value);
    })

    // captcha = 'https://miro.medium.com/max/302/1*y3o_TIul7Kshk_AHBlE2pw.jpeg'

    // var file = __dirname + "/imagenGenerada.jpg";
    // console.log(__dirname);

    // let captcha_rta = ''

    // Jimp.read({url: captcha}, function (err, image) {
    //     if (err) throw err;
    //     image.brightness(-.45).contrast(1).write(file, function(err,image){ //Type1
    //         if (err) throw err; 
    //         Tesseract.recognize(file)
    //         .then(function(result){
    //             console.log(result.text);
    //             captcha_rta = result.text
    //         })      
    //         // console.log(image);
    //     });
        
    // });
    
    // await page.type('#captcha-respuesta', captcha_rta)
    await page.click('#btnConsultarDeuda')
    await page.waitForNavigation()
    // await page.screenshot({ path: screenshot })
    // console.log('See screenshot: ' + screenshot)
    
    let data = await page.evaluate(()=>{
        let asf = document.getElementsByClassName("panel-body")[0].children[1].children[0].children[0].children[3].children[1].innerText
        return asf
    })
    
    // debugger
    console.log(data);
    // browser.close()
    await browser.close()

    res.status(200).json(data)

})


    // exportar de router
    module.exports = router;