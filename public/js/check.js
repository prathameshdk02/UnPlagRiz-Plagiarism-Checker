
/* Domains */
const webDomain = 'https://copyleakstest.cyclic.app';
// const webDomain = 'https://854a-114-79-188-176.in.ngrok.io';

/* Generates Random IDs */
const generateRandomId = () => {
    return (Math.floor(Math.random() * (9999999 - 1000000) + 1000000)).toString() + '-' + Math.floor((Math.random() * (9999999 - 1000000) + 1000000)).toString();
}

/* Creates Delay */
const delay = ms => new Promise((resolve) =>{
    setTimeout(() => {
        resolve();
    },ms);
});

const toCheckArea = $('#check_area');

const clearResults = async () => {
    if($('.result').toArray().length > 0){
        $('#results_totalWords').text("0");
        $('#results_identicalWords').text("0");
        $('#results_minorChangeWords').text("0");
        $('#results_aggregatedScore').text("0");
        $('.checker-results').slideUp(700);
        await delay(800);
        $('.result').remove();
    }
}

const loadingScreen = $('.loading-screen');
const preloaderSplash = $('.load-splash');

/* Adding Click Listener to Scan Now Button */ 
$('#scan_btn').click(async () => {
    $(this).attr("disabled","disabled");
    $('html').css("overflow","hidden");
    loadingScreen.css("display","flex").hide().fadeIn(500);
    await delay(600);

    preloaderSplash.slideUp();
    preloaderSplash.text("Scanning...");
    preloaderSplash.slideDown();

    await clearResults();
    // Getting details from the form...
    const frmId = generateRandomId();
    const frmData = toCheckArea.val();

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
        preloaderSplash.slideUp();
        preloaderSplash.text("Analyzing...");
        preloaderSplash.slideDown();
    });

    // Making GET requests to fetch results from the backend, if arrived.
    let resData, gotResults;
    let maxRetries = 20;
    let errorOcc = false;
    do{
        await delay(10000);
        gotResults = false;
        preloaderSplash.slideUp();
        preloaderSplash.text(`Awaiting Response...(${maxRetries})`);
        preloaderSplash.slideDown();
        await fetch(`${webDomain}/results/${frmId}`).then(data => data.json()).then((data)=>{
            resData = data;
        });

        // If response is not yet available in the backend, resend request after 10 seconds...
        if(resData.message){
            if(maxRetries == 0){
                errorOcc = true;
                break;
            }else{
                maxRetries--;
            }
            continue;
        }
        preloaderSplash.slideUp();
        preloaderSplash.text("Almost Done!");
        preloaderSplash.slideDown();

        errorOcc = false;
        gotResults = true;
    }while(!gotResults);


    
    if(!errorOcc){
        $('html').css("overflow","auto");
        loadingScreen.fadeOut(500);
        await delay(500);
        
        const internetResults = resData.results.internet;
        const scoreResults = resData.results.score;
        
        $('.attribute-wrapper').slideUp();
        $('.checker-results').slideDown();
        
        await delay(200);
        
        if(scoreResults.aggregatedScore > 40){
            $('#result-splash').text("Ah! Found some similar results over the Internet!").fadeIn(400);
        }else{
            $('#result-splash').text("Great! Your Content looks Unique!").fadeIn(400);
        }
        
        $('.attribute-wrapper').slideDown(500);
        
        // Smooth Scroll
        let resultCoords = $('#result-heading').offset();

        $('#results_totalWords').text(resData.scannedDocument.totalWords);
        $('#results_identicalWords').text(scoreResults.identicalWords);
        $('#results_minorChangeWords').text(scoreResults.minorChangedWords);
        $('#results_aggregatedScore').text(scoreResults.aggregatedScore);
        
        $('html, body').animate({
            scrollTop: resultCoords.top
        },2000);
        
        internetResults.forEach((current) => {
            const url = current.url;
            const title = current.title;
            const matchedWords = current.matchedWords;
            const fileName = current.metadata.filename;
            $('#results-container').append(`<div class="result">
            <h3>${title}</h3>
            <span class="result-item">URL: <span class="result-item-url">${url}</span></span>
            <span class="result-item">Filename: <span>${fileName}</span></span>
            <span class="result-item">Matched Words: <span>${matchedWords}</span></span>
            <div class="visit-label"><a href="${url}" target="_blank">Visit</a></div>
            </div>`);
            
        });
        
        $('.result').css("display","block");

        await delay(800);
        
        $('.result').each(async function (index){
            await delay(index * 120);
            $(this).animate({
                left: '0%',
                opacity: '1'
            },1000);
        });
    }else{
        preloaderSplash.slideUp();
        preloaderSplash.text("Error Occured!");
        preloaderSplash.slideDown();

        await delay(1000);
        $('html').css("overflow","auto");
        loadingScreen.fadeOut(500);
    }

    preloaderSplash.text("Requesting...");
    $(this).removeAttr("disabled");
});