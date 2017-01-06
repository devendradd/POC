var express = require('express');
var router = express.Router();
var urls = require('../models/urls')
var ARSSoapClient = require('../service/ars_soap_client')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: urls,title: 'Express' });
});

router.get('/getData', function(req, res, next){
  res.render('index', { data: urls });
})

router.post('/page', function(req, res){
  ARSSoapClient.getWSDL(req.body.serviceURL, (response, responseTime) => {
    if(response.statusCode == 200) res.end(JSON.stringify({ serviceStatus: 'green', responseTime : responseTime }));
  })
})



module.exports = router;
