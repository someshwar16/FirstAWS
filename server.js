const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res)
{
    const apiKey = "01082ac8ff2ae9ba9a748675aa71fafb";
    const unit = "metric";
    const q = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=01082ac8ff2ae9ba9a748675aa71fafb&q="+q+"&units=metric";
    https.get(url , function(response)
    {
        console.log(response.statusCode);
        response.on("data" , function(data)
        {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const weatherDesc = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p> The weather is "+ weatherDesc+ "</p>");
            res.write("<h1> The temparature is " +  temp + "</h1>");
            res.write("<img src =" + iconUrl + ">");
            res.send();
            
        });
    });    
});


app.listen(3000 , function()
{
    console.log('Listening on Port 3000');
})