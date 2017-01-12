"use strict"
var http = require('http')
var timestamp = require('timestamp')

 class SoapClient {
   static getWSDL(serviceURL, cb) {
     var url = serviceURL.split(",")
     var endTime = 0
     var startTime = timestamp()
     try {
       http.get({
           hostname: url[0],
           path: url[1],
           agent: false
         }, (response) => {
            endTime = timestamp()
            response.on('data', function (data) {
            cb(response, (endTime - startTime))
           })
       })
     } catch(e) {
       console.error(e);
     }
   }
 }

module.exports = SoapClient;
