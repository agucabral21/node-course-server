const request = require("postman-request");

const mapBoxId = "pk.eyJ1IjoiYWd1Y2FicmFsIiwiYSI6ImNrbDhlemlmbjFyNXMydmxhbHM5Z3IyNnYifQ.TqFP0K4lvt4GzDY_sHDlBQ"

const geoCode = (adress,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?'+
    'access_token='+mapBoxId+'&limit=1';    

         //llamo api que me devuelve ubicacion
    request({url,json:true},(error,{body}={}) => {    
        //low level error
        if(error){
           callback('Unable to connect to service',undefined)
        //external server message error
        }else if(body.error){
            callback(body.error,undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].text
            })           
        } 
        
    });

}

module.exports = {geoCode:geoCode}