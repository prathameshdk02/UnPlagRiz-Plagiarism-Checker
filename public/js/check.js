// LOL
const webDomain = 'https://copyleakstest.cyclic.app';
// const webDomain = 'https://5a5e-182-48-235-230.in.ngrok.io';

const frm = document.getElementById('frm');
const toCheckArea = document.getElementById('toCheck');
const submitBtn = document.getElementById('checkSubmit');

const generateRandomId = () => {
    return (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)).toString() + '-' + Math.floor((Math.random() * (9999999 - 1000000) + 1000000)).toString();
}

const delay = ms => new Promise((resolve) =>{
    setTimeout(() => {
        resolve();
    },ms);
})

frm.addEventListener('submit',async (e) => {
    e.preventDefault();

    // Get Form details...
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

    fetch(`${webDomain}/scannow`,options).then(() => {
        console.log("Request to the Backend was successful! Scan Created!");
    });

    
    
    let resData,gotResults;
    do{
        await delay(15000);
        gotResults = false;
        // console.log("Requested Results just now.");
        await fetch(`${webDomain}/results/${frmId}`).then(data => data.json()).then((data)=>{
            resData = data;
        });

        if(resData.message){
            console.log("Error: ",resData);
            continue;
        }else{
            console.log("Response Arrived: ",resData);
            gotResults = true;
        }
    }while(!gotResults);

    console.log("Finished Execution!");
    // fetch(`${webDomain}/results/${frmId}`).then((data) => {
    //     return data.json();
    // }).then((data)=>{});
});

