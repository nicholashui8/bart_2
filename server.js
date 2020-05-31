const express = require('express');
const req = require('request');

const app = express();

//can listen through heroku or locally
app.listen(process.env.PORT || 3000, () =>{
    console.log('Listening at 3000!');
});

app.use(express.static('public'));
//needed to understand incoming JSON 
app.use(express.json({limit: '1mb'}));

app.post('/api',  (request, response) => {
    console.log('Recieved request');
    let origin = request.body.originAbbrev;
    let destination = request.body.destinationAbbrev;
    
    console.log(origin);
    console.log(destination);

    //make api call using data from user
    const begin ='https://api.bart.gov/api/sched.aspx?cmd=fare&orig=';
    //let orig = originAbbrev;
    //let destin = desinationAbbrev;
    let middle = '&dest=';
    let end = '&key=MW9S-E7SL-26DU-VV8V&json=y';
    let apiURL = begin + origin + middle + destination + end;
    console.log(apiURL);
    //cant use fetch!
    
    
    let options = {
        'method': 'GET',
        'url': apiURL,
        'headers': {
        }
    };
    req(options, function (error, responseFromAPI) { 
    if (error) throw new Error(error);
    console.log(responseFromAPI.body);
    //sends data back to frontend
    response.json(responseFromAPI.body);
    });
});

