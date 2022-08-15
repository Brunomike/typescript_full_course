//console.log("Sending analytics data to the server...");
let logged;

function sendAnalytics(data: string) {
    console.log(data);
    logged = true;
    console.log(logged);
    
}

sendAnalytics('The data')
