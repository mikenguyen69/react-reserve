export default function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        // The request was made and the server responsed with a status code that is not in the range of 2XX
        errorMsg = error.response.data;
        console.error("Error Response", errorMsg);
    }
    else if (error.request) {
        // The request was made but no response was received
        errorMsg = error.request;
        console.error("Error Request", errorMsg);
    }
    else {
        // Something esle happens!
        errorMsg = error.message;
        console.error("Error Message", errorMsg)
    }

    displayError(errorMsg);
}