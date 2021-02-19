const request = require("postman-request");

const weatherStackId = "26f9062cfe2cfef5f6518440fc70515d"

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key='+weatherStackId+'&query='+latitude+','+longitude;
   
    //llamo api que me devuelve clima
    request({url,json:true},(error,{body}={}) => {    
        //low level error
        if(error){
            callback('Unable to connect to service',undefined)
         //external server message error
         }else if(body.error){
             callback(body.error,undefined)
         }else if(body.current === 0){
             callback("Unable to find location",undefined)
         }else{
             callback(undefined, {
                temperature: body.current.temperature,
                location: body.location.region, 
                feels:body.current.feelslike,
                humidity: body.current.humidity,
                description: body.current.weather_descriptions[0]
             })           
         } 
    });
   
}



module.exports = {forecast:forecast}