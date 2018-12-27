let serverAdress = 'Serveurgadjo:12345';
let nbLanguage = 0;
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

    nbLanguage++;
    document.getElementById('nbLanguage').innerHTML = nbLanguage;



    let tableRow = document.createElement('tr');
    tableRow.setAttribute('id', language._id);

    let columnNb = document.createElement('th');
    columnNb.innerHTML = nbLanguage;
    columnNb.setAttribute('class', 'w-10');
    tableRow.appendChild(columnNb);

    let columnName = document.createElement('td');
    columnName.innerHTML = language.name;
    columnName.setAttribute('class', 'languageName w-50');
    tableRow.appendChild(columnName);


    let columnModif = document.createElement('td');
    columnModif.setAttribute('class', 'w-20');
    let modifButton = document.createElement('button');
    modifButton.innerHTML = 'Modifier';
    modifButton.setAttribute('onclick', 'clickOnModif(\'' + language._id + '\')');
    modifButton.setAttribute('type', 'button');
    modifButton.setAttribute('class', 'btn btn-primary');
    columnModif.appendChild(modifButton);
    tableRow.appendChild(columnModif);


    let columnDelete = document.createElement('td');
    columnDelete.setAttribute('class', 'w-20');
    let delButton = document.createElement('button');
    delButton.innerHTML = 'Supprimer'
    delButton.setAttribute('onclick', 'deleteLanguageBDD(\'' + language._id + '\')');
    delButton.setAttribute('type', 'button');
    delButton.setAttribute('class', 'btn btn-danger');
    columnDelete.appendChild(delButton);
    tableRow.appendChild(columnDelete);

    

    document.getElementsByTagName('tbody')[0].appendChild(tableRow);
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

    nbLanguage--;
    document.getElementById('nbLanguage').innerHTML = nbLanguage;

    let element = document.getElementById(languageId);
    element.parentNode.removeChild(element);
}


const clickOnModif = (languageId) => {
    let languageTD = document.getElementById(languageId).childNodes[1];
    let languageName = languageTD.innerHTML;

    languageTD.innerHTML = '';

    let textField = document.createElement('input');
    textField.setAttribute('type', 'text');
    textField.setAttribute('class', 'w-50 form-control')
    textField.value = languageName;

    languageTD.appendChild(textField);

    let modifColumn = document.getElementById(languageId).childNodes[2];
    modifColumn.removeChild(modifColumn.firstChild);

    let saveButton = document.createElement('button');
    saveButton.innerHTML = 'Sauvegarder';
    saveButton.setAttribute('onclick', 'saveChangeBDD(\'' + languageId + '\')');
    saveButton.setAttribute('type', 'button');
    saveButton.setAttribute('class', 'btn btn-success');
    
    modifColumn.appendChild(saveButton);

    let deleteColumn = document.getElementById(languageId).childNodes[3];
    deleteColumn.removeChild(deleteColumn.firstChild);

    let cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Annuler';
    cancelButton.setAttribute('onclick', 'cancelChange(\'' + languageId + '\')');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('class', 'btn btn-secondary');

    deleteColumn.appendChild(cancelButton);

    languageTD.appendChild(textField);
    
}

const saveChangeBDD = (languageId) => {

}

const cancelChange = (languageId) => {

}