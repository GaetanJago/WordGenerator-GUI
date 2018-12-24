let serverAdress = '92.135.241.49:12345';

const displayLanguages = async () => {
    console.log('allo');
    const request = 'http://' + serverAdress + '/languages';
    const response = await fetch(request);
    const languages = await response.json(); //extract JSON from the http response
    console.log('response');
    console.log(languages);


    languages.forEach(language => {
        insertLanguageDOM(language);
    });
}

const insertLanguageBDD = () => {
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


        let success = false;

        fetch('http://' + serverAdress + '/languages', { // the URI
            method: 'POST', // the method
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": languageLabel }) // the body
        })
            .then(response => {
                if(response.ok){
                    success = true;
                }
                // we received the response and print the status code
                console.log(response.status)
                // return response body as JSON
                return response.json()
            })
            .then(json => {
                // print the JSON
                if(success){
                    insertLanguageDOM(json);
                }
                console.log(json)
            })


    }
}

const insertLanguageDOM = (language) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'languageElement');
    div.setAttribute('id', language._id);

    let node = document.createElement('LI');                 // Create a <li> node
    let textnode = document.createTextNode(language.name);   // Create a text node
    node.setAttribute('data-key', language._id);             // Append key attribute to the <li> node 
    node.appendChild(textnode);                              // Append the text to <li>
    div.appendChild(node);                                   // Append <li> to <ul> with id="langList" 

    let delButton = document.createElement('button');
    let textButton = document.createTextNode('Supprimer');
    delButton.setAttribute('onclick', 'deleteLanguageBDD(\'' + language._id + '\')');
    delButton.appendChild(textButton);
    div.appendChild(delButton);
    document.getElementById("langList").appendChild(div);
}

const deleteLanguageBDD = (languageId) => {

    let success = false;

    fetch('http://' + serverAdress + '/languages/' + languageId, { // the URI
        method: 'DELETE', // the method
    }).then(response => {
        if(response.ok){
            success = true;
        }
        // we received the response and print the status code
        console.log(response.status)
        // return response body as JSON
        return response.json()
    })
        .then(json => {

            if(success){
                deleteLanguageDOM(json._id);
            }
            // print the JSON
            console.log(json)
        })
        
}

const deleteLanguageDOM = (languageId) => {
    let element = document.getElementById(languageId);
    element.parentNode.removeChild(element);
}