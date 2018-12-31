let serverAdress = 'Serveurgadjo:12345';
let nbCategory = 0;
let backupTR;
let editingCategory = false;


const displayCategories = async () => {
    const request = 'http://' + serverAdress + '/categories';
    const response = await fetch(request);
    const categories = await response.json(); //extract JSON from the http response


    categories.forEach(category => {
        insertCategoryDOM(category);
    });
}


const insertCategoryBDD = () => {

    let categoryLabel = document.getElementById('insertInput').value;

    if (categoryLabel == '') {
        alert('Il faut définir un nom pour la langue');
    } else {
        console.log(JSON.stringify({ "name": categoryLabel }));

        let success = false;

        fetch('http://' + serverAdress + '/categories', { // the URI
            method: 'POST', // the method
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": categoryLabel }) // the body
        })
            .then(response => {
                if (response.ok) {
                    success = true;
                }
                // we received the response and print the status code
                console.log(response.status)
                // return response body as JSON
                return response.json()
            })
            .then(json => {
                // print the JSON
                if (success) {
                    insertCategoryDOM(json);
                }
                console.log(json)
            })


    }
}



const insertCategoryDOM = (category) => {

    nbCategory++;
    document.getElementById('nbCategory').innerHTML = nbCategory;



    let tableRow = document.createElement('tr');
    tableRow.setAttribute('id', category._id);

    let columnNb = document.createElement('th');
    columnNb.innerHTML = nbCategory;
    tableRow.appendChild(columnNb);

    let columnName = document.createElement('td');
    columnName.innerHTML = category.name;
    columnName.setAttribute('class', 'categoryName w-50');
    tableRow.appendChild(columnName);


    let columnModif = document.createElement('td');
    let modifButton = document.createElement('button');
    modifButton.innerHTML = 'Modifier';
    modifButton.setAttribute('onclick', 'clickOnModif(\'' + category._id + '\')');
    modifButton.setAttribute('type', 'button');
    modifButton.setAttribute('class', 'btn btn-primary');
    columnModif.appendChild(modifButton);
    tableRow.appendChild(columnModif);


    let columnDelete = document.createElement('td');
    let delButton = document.createElement('button');
    delButton.innerHTML = 'Supprimer'
    delButton.setAttribute('onclick', 'deleteCategoryBDD(\'' + category._id + '\')');
    delButton.setAttribute('type', 'button');
    delButton.setAttribute('class', 'btn btn-danger');
    columnDelete.appendChild(delButton);
    tableRow.appendChild(columnDelete);



    document.getElementsByTagName('tbody')[0].appendChild(tableRow);
}


const deleteCategoryBDD = (categoryId) => {

    let success = false;

    fetch('http://' + serverAdress + '/categories/' + categoryId, { // the URI
        method: 'DELETE', // the method
    }).then(response => {
        if (response.ok) {
            success = true;
        }
        // we received the response and print the status code
        console.log(response.status)
        // return response body as JSON
        return response.json()
    })
        .then(json => {

            
            if (success) {
                
                deleteCategoryDOM(json._id);
            }
            // print the JSON
            console.log(json)
        })

}

const deleteCategoryDOM = (categoryId) => {

    
    nbCategory--;
    document.getElementById('nbCategory').innerHTML = nbCategory;

    let element = document.getElementById(categoryId);

    console.log(element);
    element.parentNode.removeChild(element);
}



const clickOnModif = (categoryId) => {

    if (editingCategory == false) {
        editingCategory = true;
        backupTR = document.getElementById(categoryId).innerHTML;

        let categoryTD = document.getElementById(categoryId).childNodes[1];
        let categoryName = categoryTD.innerHTML;

        categoryTD.innerHTML = '';

        let textField = document.createElement('input');
        textField.id = 'tfModif';
        textField.setAttribute('type', 'text');
        textField.setAttribute('class', 'w-50 form-control')
        textField.value = categoryName;

        categoryTD.appendChild(textField);

        let modifColumn = document.getElementById(categoryId).childNodes[2];
        modifColumn.removeChild(modifColumn.firstChild);

        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Sauvegarder';
        saveButton.setAttribute('onclick', 'updateCategoryBDD(\'' + categoryId + '\')');
        saveButton.setAttribute('type', 'button');
        saveButton.setAttribute('class', 'btn btn-success');

        modifColumn.appendChild(saveButton);

        let deleteColumn = document.getElementById(categoryId).childNodes[3];
        deleteColumn.removeChild(deleteColumn.firstChild);

        let cancelButton = document.createElement('button');
        cancelButton.innerHTML = 'Annuler';
        cancelButton.setAttribute('onclick', 'cancelChange(\'' + categoryId + '\')');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('class', 'btn btn-secondary');

        deleteColumn.appendChild(cancelButton);

        categoryTD.appendChild(textField);
    }

}


const updateCategoryBDD = (categoryId) => {

    let categoryLabel = document.getElementById('tfModif').value;
    console.log(categoryLabel);
    if (categoryLabel == '') {
        alert('Il faut définir un nom pour la langue');
    } else {

        let success = false;

        fetch('http://' + serverAdress + '/categories/' + categoryId, { // the URI
            method: 'PUT', // the method
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "name": categoryLabel }) // the body
        })
            .then(response => {
                if (response.ok) {
                    success = true;
                }
                // we received the response and print the status code
                console.log(response.status)
                // return response body as JSON
                return response.json()
            })
            .then(json => {
                // print the JSON
                if (success) {
                    updateCategoryDOM(json._id, categoryLabel);
                }
                console.log(json)
            })

    }


}


const updateCategoryDOM = (categoryId, newNameCategory) => {
    editingCategory = false;

    document.getElementById(categoryId).innerHTML = backupTR;
    document.getElementById(categoryId).childNodes[1].innerHTML = newNameCategory;
}

const cancelChange = (categoryId) => {
    editingCategory = false;

    document.getElementById(categoryId).innerHTML = backupTR;
}