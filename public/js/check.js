// LOL
const webDomain = 'https://1bec-182-48-235-239.in.ngrok.io';

const frm = document.getElementById('frm');
const toCheckArea = document.getElementById('toCheck');
const submitBtn = document.getElementById('checkSubmit');

const generateRandomId = () => {
    return (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)).toString() + '-' + Math.floor((Math.random() * (9999999 - 1000000) + 1000000)).toString();
}

frm.addEventListener('submit',(e) => {
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
        console.log("Request to the Backend was successful!");
    });

    fetch(`${webDomain}/results/${frmId}`).then((data) => {
        return data.json();
    }).then((data)=>{
        console.log(data);
    });
});

