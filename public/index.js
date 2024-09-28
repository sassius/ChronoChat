function sendMessage() {
    console.log("sendMessage function called");
    const number = document.getElementById('number').value;
    const message = document.getElementById('message').value;
    const scheduleTime = document.getElementById('scheduleTime').value;

    const requestBody = {
        number: number,
        message: message
    };

    if (scheduleTime) {
        requestBody.scheduleTime = scheduleTime;
    }

    console.log("Sending request with:", requestBody);

    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response received:", data);
        alert(data.message);
    })
    .catch(error => {
        console.error("Error occurred:", error);
        alert('Error: ' + error);
    });
}