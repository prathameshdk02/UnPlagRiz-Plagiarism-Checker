// LOL
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

    fetch('https://1bec-182-48-235-239.in.ngrok.io/scannow',options).then(() => {
        console.log("Completed Form request!");
    });

    fetch(`https://1bec-182-48-235-239.in.ngrok.io/results/${frmId}`).then((data) => {
        console.log("From JS FIle!");
        return data.json();
    }).then((data)=>{
        console.log(data);
    });
});

