const expect = require('chai').expect
const SoapClient = require('../../service/ars_soap_client')
const sinon = require('sinon')
var http = require('http')

describe('SOAP client', () => {
    describe('.getWSDL', () => {
        it('ping the url and gets the WSDL downloaded and returns the response', () => {
            const serviceURL = "arswsint.igslb.allstate.com,/MobileBMWRSPConsumerWS/BMWBrokerService/WEB-INF/wsdl/BMWBrokerService.wsdl"
            const replacementMethod = () => {console.log("I am in Callback")}
            const stub = sinon.stub(http, "get", replacementMethod)
            
            SoapClient.getWSDL(serviceURL, () => {
                console.log('CB called')
            })
            http.get.restore()
        })

        it('ping the url and gets the WSDL downloaded and returns the response using mock', () => {
            const serviceURL = "arswsint.igslb.allstate.com,/MobileBMWRSPConsumerWS/BMWBrokerService/WEB-INF/wsdl/BMWBrokerService.wsdl"
            const doc = {
                         hostname: "arswsint.igslb.allstate.com",
                         path: "/MobileBMWRSPConsumerWS/BMWBrokerService/WEB-INF/wsdl/BMWBrokerService.wsdl",
                         agent: false
                        }
            const callback = () =>{console.log('CB called 2')}
            const mock = sinon.mock(http)
            mock.expects("get").
            once().
            withArgs(sinon.match.object , sinon.match.func )

            SoapClient.getWSDL(serviceURL, () => {
                console.log('CB called 1')
            })
            mock.verify()
            //http.get.restore()
        })
    })
})