// Javascript file for making requests to the backend!

// DomainName to request...
const webDomain = 'https://copyleakstest.cyclic.app';
// const webDomain = 'https://5a5e-182-48-235-230.in.ngrok.io';

const frm = document.getElementById('frm');
const toCheckArea = document.getElementById('toCheck');
const submitBtn = document.getElementById('checkSubmit');

// Generates Random Id...
const generateRandomId = () => {
    return (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)).toString() + '-' + Math.floor((Math.random() * (9999999 - 1000000) + 1000000)).toString();
}

// Function to create delay...
const delay = ms => new Promise((resolve) =>{
    setTimeout(() => {
        resolve();
    },ms);
})

// Adding Event Listener to Form...
frm.addEventListener('submit',async (e) => {
    e.preventDefault();

    // Getting details from the form...
    const frmId = generateRandomId();
    const frmData = toCheckArea.value;

    const data = {
        toCheck: frmData,
        reqId: frmId
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Submitting data to the backend via POST request...
    await fetch(`${webDomain}/scannow`,options).then(() => {
        console.log("Request to the Backend was successful! Scan Created!");
    });

    // Making GET requests to fetch results from the backend, if arrived.
    let resData, gotResults;
    do{
        await delay(10000);
        gotResults = false;
        await fetch(`${webDomain}/results/${frmId}`).then(data => data.json()).then((data)=>{
            resData = data;
        });

        // If response is not yet available in the backend, resend request after 10 seconds...
        if(resData.message){
            // console.log("Error: ",resData);
            continue;
        }

        console.log("Response Arrived: ",resData);
        gotResults = true;
    }while(!gotResults);

});

