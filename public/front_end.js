



document.getElementById('submit-button').addEventListener("click", async () =>{
    //1. get the stations user selected
    let a  = document.getElementById("origin-select");
    let originAbbrev = a.options[a.selectedIndex].value;
    let b = document.getElementById("destination-select");
    let destinationAbbrev = b.options[b.selectedIndex].value;

    if(originAbbrev === destinationAbbrev){
        alert('Origin and destination must be different!');
    }
    else{
        //send this data to backend
        const data = {
            originAbbrev,
            destinationAbbrev,
        };
        //details of the post request
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        };
        //fetch feturns a response
        console.log('submit has been clicked');
        console.log(originAbbrev);
        console.log(destinationAbbrev);

        const response = await fetch('/api', options);
        console.log(response.body);
        //this is in a JSON string
        const jsonData = await response.json();
        //convert JSON string to a JSON object
        const objectJSONData = JSON.parse(jsonData);
        console.log(objectJSONData);


        document.getElementById('clipper-fare').textContent = objectJSONData.root.fares.fare[0]["@amount"];
        document.getElementById('cash-fare').textContent = objectJSONData.root.fares.fare[1]["@amount"];
        document.getElementById('senior-fare').textContent = objectJSONData.root.fares.fare[2]["@amount"];
        document.getElementById('youth-fare').textContent = objectJSONData.root.fares.fare[3]["@amount"];
    }
});