displayLanguages = async () => {
    console.log('allo');
    const request = 'http://127.0.0.1:4000/languages';
    const response = await fetch(request);
    const myJson = await response.json(); //extract JSON from the http response
    console.log('response');
    console.log(myJson);
}

insertLanguage = () => {
    let languageLabel = document.getElementById('languageLabel').value;
    console.log(languageLabel);
    if (languageLabel == '') {
        alert('Il faut définir un nom pour la langue');
    } else {
        console.log(JSON.stringify({ "name": languageLabel }));

        /*let xhttp = new XMLHttpRequest();

        xhttp.open("POST", "http://127.0.0.1:4000/languages", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name="+ languageLabel);*/






        fetch('http://127.0.0.1:4000/languages', { // the URI
            method: 'POST', // the method
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"name": languageLabel}) // the body
        })
            .then(response => {
                // we received the response and print the status code
                console.log(response.status)
                // return response body as JSON
                return response.json()
            })
            .then(json => {
                // print the JSON
                console.log(json)
            })


    }
}